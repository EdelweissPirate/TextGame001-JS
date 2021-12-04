const organs = {
    initOrgan: (owner, organName, health, max_health, critical, bionic, infected, failed) => {
        let newOrgan = {
            type: 'organ',
            owner: owner,
            name: organName,
            health: health,
            max_health: max_health,
            critical: critical,
            bionic: bionic,
            infected: infected,
            failed: failed,
            system: null,

            assignSystem: (system) => {
                switch (newOrgan.name) {
                    case 'brain':
                        newOrgan.system = newOrgan.owner.vitals.systems.consciousness;
                        break;
                    case 'left_eye':
                        newOrgan.system = newOrgan.owner.vitals.systems.sight;
                        break;
                    case 'right_eye':
                        newOrgan.system = newOrgan.owner.vitals.systems.sight;
                        break;
                    case 'lips':
                        newOrgan.system = newOrgan.owner.vitals.systems.talking;
                        break;
                    case 'tongue':
                        newOrgan.system = newOrgan.owner.vitals.systems.talking;
                        break;
                    case 'teeth':
                        newOrgan.system = newOrgan.owner.vitals.systems.eating;
                        break;
                    case 'heart':
                        newOrgan.system = newOrgan.owner.vitals.systems.cardio;
                        break;
                    case 'left_lung':
                        newOrgan.system = newOrgan.owner.vitals.systems.breathing;
                        break;
                    case 'right_lung':
                        newOrgan.system = newOrgan.owner.vitals.systems.breathing;
                        break;
                    case 'stomach':
                        newOrgan.system = newOrgan.owner.vitals.systems.metabolism;
                        break;
                    case 'liver':
                        newOrgan.system = newOrgan.owner.vitals.systems.metabolism;
                        break;
                    case 'left_kidney':
                        newOrgan.system = newOrgan.owner.vitals.systems.metabolism;
                        break;
                    case 'right_kidney':
                        newOrgan.system = newOrgan.owner.vitals.systems.metabolism;
                        break;
                
                    default:
                        if(system){
                            newOrgan.system = system;
                        } else {
                            newOrgan.system = 'none';
                        };
                        break;
                };
            },

            setOrganHealth: (newHealth) => {
                newOrgan.health = newHealth;
                // newOrgan.checkHealth();
            },

            damageOrgan: (damageAmount, chanceToInfect) => {
                newOrgan.health -= roundTo(damageAmount, 2);

                if(newOrgan.health < 0){
                    newOrgan.health = 0;
                };

                newOrgan.checkInfected(chanceToInfect);
                newOrgan.checkHealth();
            },

            checkHealth: () => {
                // switch (newOrgan.health) {
                //     case newOrgan.health > newOrgan.max_health:
                //         newOrgan.health = newOrgan.max_health
                //         if(newOrgan.health == 0 && newOrgan.critical){
                //             organs.killAll(newOrgan.owner);
                //         } else {
                //             healthSystems.checkSystem(newOrgan.system);
                //         };
                //         break;

                //     case 0:
                //         newOrgan.organFailure(true);
                //         break;
                
                //     default:
                //         // healthSystems.checkSystem(newOrgan.system);
                //         healthSystems.refresh(newOrgan.owner);
                //         break;
                // };

                if(newOrgan.health > newOrgan.max_health){
                    newOrgan.health = newOrgan.max_health
                    if(newOrgan.health == 0 && newOrgan.critical){
                        organs.killAll(newOrgan.owner);
                    } else {
                        healthSystems.checkSystem(newOrgan.system);
                    };
                } else if(newOrgan.health == 0){
                    newOrgan.organFailure(true);
                } else {
                    // healthSystems.checkSystem(newOrgan.system);
                    healthSystems.refresh(newOrgan.owner);
                }

                if(newOrgan.owner == props.player){
                    viewBox.organs.updateEntry(newOrgan.name, newOrgan.health);
                };
            },

            checkInfected: (chanceToInfect) => {
                // do check if infection was successful with weighted random
                // also, make check for if bionic level is >= than infection level it instantly negates
            },

            healInfection: () => {
                // newOrgan.makeBionic(newOrgan.bionic);
            },

            organFailure: (failed) => {
                newOrgan.failed = failed;
                console.log(newOrgan.owner.name + "'s " + newOrgan.name + ' destroyed!');

                if(newOrgan.critical){
                    organs.killAll(newOrgan.owner);
                    person.killPerson(newOrgan.owner, newOrgan.name + ' failure.');
                } else {
                    healthSystems.checkSystem(newOrgan.system);
                };
            },
            
            makeBionic: (bionicLevel) => {
                newOrgan.bionic = bionicLevel;
        
                switch (newOrgan.bionic) {
                    case 1:
                        newOrgan.max_health = 1.2;
                        newOrgan.health = 1.2;
                        break;
    
                    case 2:
                        newOrgan.max_health = 1.4;
                        newOrgan.health = 1.4;
                        break;
    
                    case 3:
                        newOrgan.max_health = 1.6;
                        newOrgan.health = 1.6;
                        break;
    
                    case 4:
                        newOrgan.max_health = 1.8;
                        newOrgan.health = 1.8;
                        break;
    
                    case 5: //synorganic
                        newOrgan.max_health = 2;
                        newOrgan.health = 2;
                        break;
                
                    default:
                        newOrgan.max_health = 1;
                        newOrgan.health = 1;
                        break;
                };

                if(newOrgan.system != null){
                    newOrgan.checkHealth();
                };
            },
    
            makeInfected: (infectionLevel) => {
                newOrgan.infected = infectionLevel;
        
                switch (newOrgan.infected) {
                    case 1:
                        newOrgan.max_health = .8;
                        break;
                    case 2:
                        newOrgan.max_health = .6;
                        break;
                    case 3:
                        newOrgan.max_health = .4;
                        break;
                    case 4:
                        newOrgan.max_health = .2;
                        break;
                    case 5:
                        newOrgan.max_health = 0;
                        break;
                    default:
                        newOrgan.max_health = 1;
                        break;
                };

                newOrgan.checkHealth();
            }
        };

        if(newOrgan.bionic){
            newOrgan.makeBionic(bionic);
        };

        return newOrgan
    },

    killAll: (thisPerson) => {
        for(orgs in thisPerson.vitals.organs){
            thisPerson.vitals.organs[orgs].setOrganHealth(0);
            if(thisPerson == props.player){
                viewBox.organs.updateEntry(thisPerson.vitals.organs[orgs].name, thisPerson.vitals.organs[orgs].health);
            };
        };

        for(lmbs in thisPerson.vitals.limbs){
            thisPerson.vitals.limbs[lmbs].setLimbHealth(0);
        };

        healthSystems.refresh(thisPerson);
    },

    assignSystems: (thisPerson) => {
        for(orgs in thisPerson.vitals.organs){
            thisPerson.vitals.organs[orgs].assignSystem();
        };
    },

    degrade: (thisPerson) => {
        let org;
        let damageAmount;
        let theseOrgans = thisPerson.vitals.organs;

        let organCount = floor((Math.random() * 5) + 2);

        for(let i = 0; i <= organCount; i++){
            org = randomProperty(theseOrgans).name;
            damageAmount;

            if(org != 'heart'){
                if(thisPerson.age > 30){
                    damageAmount = randomFromRange(0, 0.01);
                } if(thisPerson.age > 42){
                    damageAmount = randomFromRange(0.01, 0.05);
                } else if(thisPerson.age > 55){
                    damageAmount = randomFromRange(0.05, 0.1);
                } else if(thisPerson.age > 65){
                    damageAmount = randomFromRange(0.1, 0.15);
                } else if(thisPerson.age > 72){
                    damageAmount = randomFromRange(0.15, 0.2);
                };
    
                let healthModifier = (thisPerson.stats.health + thisPerson.stats.fitness) / 2;
    
                damageAmount *= 1 - (0.9 * (healthModifier));
    
                if(!theseOrgans[org].bionic){
                    theseOrgans[org].damageOrgan(damageAmount);
                };
            };

            org = 'heart';
            damageAmount;

            if(thisPerson.age > 30){
                damageAmount = randomFromRange(0, 0.01);
            } if(thisPerson.age > 42){
                damageAmount = randomFromRange(0.01, 0.05);
            } else if(thisPerson.age > 55){
                damageAmount = randomFromRange(0.02, 0.1);
            } else if(thisPerson.age > 65){
                damageAmount = randomFromRange(0.5, 0.15);
            } else if(thisPerson.age > 72){
                damageAmount = randomFromRange(0.15, 0.2);
            };

            let healthModifier = (thisPerson.stats.health + thisPerson.stats.fitness) / 2;

            damageAmount *= 1 - (0.8 * (healthModifier));

            if(!theseOrgans[org].bionic && coinFlip()){
                theseOrgans[org].damageOrgan(damageAmount);
            };
        };
    },

    human: {
        default: (thisPerson) => {
            let organMap = props.species[thisPerson.species].organMap;
            let newOrgan;

            // for(orgs in organMap){
            //     let skipMale = (thisPerson.gender == 'male' && (organMap[orgs] == 'left_breast' || organMap[orgs] == 'right_breast'));
            //     let skipFemale = (thisPerson.gender == 'female' && organMap[orgs] == 'beard'); 
                
            //     if(!skipMale && !skipFemale){
            //         newOrgan = organs.initOrgan(thisPerson, organMap[orgs], 1, 1, false, false, false, false);
            //         thisPerson.vitals.organs[organMap[orgs]] = newOrgan;
            //     };

            //     if(newOrgan.name == 'brain' || newOrgan.name == 'heart' || 
            //         newOrgan.name == 'stomach' || newOrgan.name == 'liver'){  
            //             newOrgan.critical = true;
            //     };
            // };

            organMap.map(org => {
                let skipMale = (thisPerson.gender == 'male' && (org == 'left_breast' || org == 'right_breast'));
                let skipFemale = (thisPerson.gender == 'female' && org == 'beard'); 
                
                if(!skipMale && !skipFemale){
                    newOrgan = organs.initOrgan(thisPerson, org, 1, 1, false, false, false, false);
                    thisPerson.vitals.organs[org] = newOrgan;
                };

                if(newOrgan.name == 'brain' || newOrgan.name == 'heart' || 
                    newOrgan.name == 'stomach' || newOrgan.name == 'liver'){  
                        newOrgan.critical = true;
                };
            });
        },
    },

    alien: {
        default: (thisPerson) => {
            // let keys = Object.keys(thisPerson.vitals.organs);

            // for(keyNum in keys){
            //     thisPerson.vitals.organs[keys[keyNum]] = organs.initorgan(keys[keyNum], 1, false, false);
            //     console.log(thisPerson.vitals.organs[keys[keyNum]]);
            // };
        },
    },

    cyborg: {
        default: (thisPerson) => {
            // let keys = Object.keys(thisPerson.vitals.organs);

            // for(keyNum in keys){
            //     thisPerson.vitals.organs[keys[keyNum]] = organs.initorgan(keys[keyNum], 1, true, false);
            //     console.log(thisPerson.vitals.organs[keys[keyNum]]);
            // };
        },
    },
};