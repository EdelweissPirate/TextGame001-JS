const limbs = {
    initLimb: (owner, limbName, health, max_health, critical, bionic, infected, failed) => {
        let newLimb = {
            type: 'limb',
            owner: owner,
            name: limbName,
            health: health,
            max_health: max_health,
            critical: critical,
            bionic: bionic,
            infected: infected,
            failed: failed,
            dependants: [],
            system: null,

            assignSystem: (system) => {
                switch (newLimb.name) {
                    case 'head':
                        newLimb.system = newLimb.owner.vitals.systems.consciousness;
                        break;
                    
                    case 'left_ear':
                        newLimb.system = newLimb.owner.vitals.systems.hearing;
                        break;
                    
                    case 'right_ear':
                        newLimb.system = newLimb.owner.vitals.systems.hearing;
                        break;

                    case 'left_shoulder':
                        newLimb.system = newLimb.owner.vitals.systems.manipulation;
                        break;
    
                    case 'right_shoulder':
                        newLimb.system = newLimb.owner.vitals.systems.manipulation;
                        break;

                    case 'left_forearm':
                        newLimb.system = newLimb.owner.vitals.systems.manipulation;
                        break;
        
                    case 'right_forearm':
                        newLimb.system = newLimb.owner.vitals.systems.manipulation;
                        break;

                    case 'left_hand':
                        newLimb.system = newLimb.owner.vitals.systems.manipulation;
                        break;

                    case 'right_hand':
                        newLimb.system = newLimb.owner.vitals.systems.manipulation;
                        break;

                    case 'left_thigh':
                        newLimb.system = newLimb.owner.vitals.systems.movement;
                        break;

                    case 'right_thigh':
                        newLimb.system = newLimb.owner.vitals.systems.movement;
                        break;

                    case 'left_knee':
                        newLimb.system = newLimb.owner.vitals.systems.movement;
                        break;

                    case 'right_knee':
                        newLimb.system = newLimb.owner.vitals.systems.movement;
                        break;

                    case 'left_calf':
                        newLimb.system = newLimb.owner.vitals.systems.movement;
                        break;

                    case 'right_calf':
                        newLimb.system = newLimb.owner.vitals.systems.movement;
                        break;

                    case 'left_foot':
                        newLimb.system = newLimb.owner.vitals.systems.movement;
                        break;

                    case 'right_foot':
                        newLimb.system = newLimb.owner.vitals.systems.movement;
                        break;

                    default:
                        if(system){
                            newLimb.system = system;
                        } else {
                            newLimb.system = 'none';
                        };
                        break;
                };
            },

            setLimbHealth: (newHealth) => {
                newLimb.health = newHealth;
                // if(newHealth == 0){
                //     console.log(newLimb.name + ' destroyed as child!');
                // };
                viewBox.limbs.updateEntry(newLimb.name, newLimb.health);
            },

            damageLimb: (damageAmount, chanceToInfect) => {
                newLimb.health -= damageAmount;

                if(newLimb.health < 0){
                    newLimb.health = 0;
                };

                newLimb.checkInfected(chanceToInfect);
                newLimb.checkHealth();
            },

            checkHealth: () => {
                switch (newLimb.health) {
                    case newLimb.health > newLimb.max_health:
                        newLimb.health = newLimb.max_health
                        if(newLimb.health == 0 && newLimb.critical){
                            organs.killAll(newLimb.owner);
                        } else {
                            healthSystems.checkSystem(newLimb.system);
                        };
                        break;

                    case 0:
                        newLimb.destroy(true);
                        break;
                
                    default:
                        // healthSystems.checkSystem(newLimb.system);
                        healthSystems.refresh(newLimb.owner);
                        break;
                };

                viewBox.limbs.updateEntry(newLimb.name, newLimb.health);
            },

            destroy: (failed) => {
                newLimb.failed = failed;
                console.log(newLimb.name + ' destroyed!');

                if(newLimb.critical){
                    organs.killAll(newOrgan.owner);
                } else {
                    newLimb.killDependants();
                    healthSystems.checkSystem(newLimb.system);
                };
            },

            killDependants: () => {
                for(dependants in newLimb.dependants){
                    newLimb.dependants[dependants].setLimbHealth(0);
                };
            },

            checkInfected: (chanceToInfect) => {
                
            },
            
            makeBionic: (bionicLevel) => {
                newLimb.bionic = bionicLevel;
        
                switch (newLimb.bionic) {
                    case 'level1':
                        newLimb.max_health = 1.2;
                        newLimb.health = 1.2;
                        break;
    
                    case 'level2':
                        newLimb.max_health = 1.4;
                        newLimb.health = 1.4;
                        break;
    
                    case 'level3':
                        newLimb.max_health = 1.6;
                        newLimb.health = 1.6;
                        break;
    
                    case 'level4':
                        newLimb.max_health = 1.8;
                        newLimb.health = 1.8;
                        break;
    
                    case 'level5':
                        newLimb.max_health = 2;
                        newLimb.health = 2;
                        break;
                
                    default:
                        newLimb.max_health = 1;
                        newLimb.health = 1;
                        break;
                };

                newLimb.checkHealth();
            },
    
            makeInfected: (infectionLevel) => {
                newLimb.infected = infectionLevel;
        
                switch (newLimb.infected) {
                    case 'level1':
                        newLimb.max_health = .8;
                        break;
                    case 'level2':
                        newLimb.max_health = .6;
                        break;
                    case 'level3':
                        newLimb.max_health = .4;
                        break;
                    case 'level4':
                        newLimb.max_health = .2;
                        break;
                    case 'level5':
                        newLimb.max_health = 0;
                        break;
                    default:
                        newLimb.max_health = 1;
                        break;
                };

                newLimb.checkHealth();
            }
        };

        return newLimb
    },

    assignSystems: (thisPerson) => {
        for(lmb in thisPerson.vitals.limbs){
            thisPerson.vitals.limbs[lmb].assignSystem();
        };
    },

    refreshLimbs: () => {
        //TODO - check if thigh has been destroyed for example, 
        // the calf and foot will also be gone (have i already done this with dependants??)
        healthSystems.refresh();
    },

    human: {
        default: (thisPerson) => {
            let limbMap = props.species[thisPerson.species].limbMap;

            // for(lmb in limbMap){
            //     let newLimb = limbs.initLimb(thisPerson, limbMap[lmb], 1, 1, false, false, false, false);
            //     thisPerson.vitals.limbs[limbMap[lmb]] = newLimb;
            // };

            limbMap.map(lmb => {
                let newLimb = limbs.initLimb(thisPerson, lmb, 1, 1, false, false, false, false);
                thisPerson.vitals.limbs[lmb] = newLimb;
            });

            thisPerson.vitals.limbs.head.critical = true;

            //arms
            thisPerson.vitals.limbs.left_shoulder.dependants[0] = thisPerson.vitals.limbs.left_forearm;
            thisPerson.vitals.limbs.left_shoulder.dependants[1] = thisPerson.vitals.limbs.left_hand;
            thisPerson.vitals.limbs.left_forearm.dependants[0] = thisPerson.vitals.limbs.left_hand;

            thisPerson.vitals.limbs.right_shoulder.dependants[0] = thisPerson.vitals.limbs.right_forearm;
            thisPerson.vitals.limbs.right_shoulder.dependants[1] = thisPerson.vitals.limbs.right_hand;
            thisPerson.vitals.limbs.right_forearm.dependants[0] = thisPerson.vitals.limbs.right_hand;

            //legs
            thisPerson.vitals.limbs.left_thigh.dependants[0] = thisPerson.vitals.limbs.left_knee;
            thisPerson.vitals.limbs.left_thigh.dependants[1] = thisPerson.vitals.limbs.left_calf;
            thisPerson.vitals.limbs.left_thigh.dependants[2] = thisPerson.vitals.limbs.left_foot;
            thisPerson.vitals.limbs.left_knee.dependants[0] = thisPerson.vitals.limbs.left_calf;
            thisPerson.vitals.limbs.left_knee.dependants[1] = thisPerson.vitals.limbs.left_foot;
            thisPerson.vitals.limbs.left_calf.dependants[0] = thisPerson.vitals.limbs.left_foot;

            thisPerson.vitals.limbs.right_thigh.dependants[0] = thisPerson.vitals.limbs.right_knee;
            thisPerson.vitals.limbs.right_thigh.dependants[1] = thisPerson.vitals.limbs.right_calf;
            thisPerson.vitals.limbs.right_thigh.dependants[2] = thisPerson.vitals.limbs.right_foot;
            thisPerson.vitals.limbs.right_knee.dependants[0] = thisPerson.vitals.limbs.right_calf;
            thisPerson.vitals.limbs.right_knee.dependants[1] = thisPerson.vitals.limbs.right_foot;
            thisPerson.vitals.limbs.right_calf.dependants[0] = thisPerson.vitals.limbs.right_foot;

        },
    },

    alien: {
        default: (thisPerson) => {
            // let keys = Object.keys(thisPerson.vitals.limbs);

            // for(keyNum in keys){
            //     thisPerson.vitals.limbs[keys[keyNum]] = limbs.initLimb(keys[keyNum], 1, false, false);
            //     console.log(thisPerson.vitals.limbs[keys[keyNum]]);
            // };
        },
    },

    cyborg: {
        default: (thisPerson) => {
            // let keys = Object.keys(thisPerson.vitals.limbs);

            // for(keyNum in keys){
            //     thisPerson.vitals.limbs[keys[keyNum]] = limbs.initLimb(keys[keyNum], 1, false, false);
            //     console.log(thisPerson.vitals.limbs[keys[keyNum]]);
            // };
        },
    },
};