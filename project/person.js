const person = {
    create: (
        mother, father, 
        species, crossbreed, nationality, dualCitizen, 
        birthplace, locationCountry, locationCity,
        race, gender, 
        name, surname, title, age, lifeStage,
        newSiblings
    ) => {
        let newPerson = person.init();

        person.setParents(newPerson, mother, father);
        person.setSpecies(newPerson, species, crossbreed);
        person.setNationality(newPerson, nationality, dualCitizen);

        person.setBirthplace(newPerson, birthplace);
        person.setLocation(newPerson, locationCountry, locationCity);

        person.setRace(newPerson, race);
        person.setGender(newPerson, gender);
        person.setPhysiology(newPerson);
        person.setAge(newPerson, age);
        person.setLifeStage(newPerson, lifeStage);

        person.setTitle(newPerson, title);
        person.setName(newPerson, name, surname);

        person.setSiblings(newPerson, newSiblings);

        person.initRelationships(newPerson);

        props.people.push(newPerson);
        props.peopleCount++;

        return newPerson
    },

    random: () => {
        let newParents
        let newPerson;
        let parentsMarried;
        let newSurname;
        let mothersKids;
        let fathersKids;
        let newSiblings;

        let cFlip = coinFlip();

        if(cFlip){
            parentsMarried = true;
        } else {
            parentsMarried = false;
        };

        newParents = parents.create(parentsMarried);

        if(parentsMarried){
            newSurname = newParents.father.surname;
        } else {
            newSurname = newParents.mother.surname;
        };

        mothersKids = Object.keys(newParents.mother.relationships.offspring);
        fathersKids = Object.keys(newParents.father.relationships.offspring);

        newSiblings = {};

        for(sib in mothersKids){
            let found = false; 
            let motherKid = newParents.mother.relationships.offspring[mothersKids[sib]];
            for(sib2 in fathersKids){
                let fatherKid = newParents.father.relationships.offspring[fathersKids[sib2]];
                if(motherKid == fatherKid){
                    found = true;
                };
            };

            if(found){
                newSiblings[motherKid.name+'_'+motherKid.surname] = motherKid;
            };
        };
                
        newPerson = person.create(
            newParents.mother, newParents.father, 
            newParents.mother.species, newParents.father.species, 
            newParents.mother.nationality, newParents.father.nationality, 
            null, null, null,
            null, null, 
            null, newSurname, null, 0, null,
            newSiblings
        );

        person.initStats(newPerson);

        return newPerson
    },

    init: () => {

        let thisPerson = {
            alive: true,
            species: null,
            crossbreed: null,

            nationality: null,
            dual_citizen: null,
            birthplace: null,

            race: null,
            gender: null,
            age: null,

            relationships: {
                mother: null,
                father: null,

                siblings: {},
                extended: {},
                friends: {},
                enemies: {},
                lovers: {},
                offspring: {},

                ex_lovers: {},
                classmates: {},
                teachers: {},
                coworkers: {},
                business_associates: {},
                business_partners: {},
                late_relations: {},

                vals: {}
            },

            // playerRelationship: 0,

            title: null,
            name: null,
            surname: null,
            location_country: null,
            location_city: null,
            social_class: null,
            religion: null,

            life_stage: null,
            married: null,

            school: null,
            job: {},

            roles: {}, //boyfriend, husband, son, brother, father, grandfather etc

            stats: {
                health: 0,

                beauty: 0,
                fitness: 0,
                happiness: 0,
                fertility: 0,
                discipline: 0,

                intelligence: 0,
                strength: 0,
                charisma: 0,
                marksmanship: 0,

                fame: 0,
                criminality: 0,
                intimidation: 0,

                karma: 0,
            },

            vitals: {
                organs: {},
                limbs: {},

                systems: {
                    consciousness: 0,
                    movement: 0,
                    manipulation: 0,
                    cardio: 0,
                    talking: 0,
                    eating: 0,
                    sight: 0,
                    hearing: 0,
                    breathing: 0,
                    metabolism: 0,
                },
            },

            traits: {},
            languages: {},
            skills: {},
            ailments: {},

            wealth: {
                balance: null,
                income: null, //do monthly and calc up
                outgoing: null, //do monthly and calc up
                net_value: null,
            },

            assets: {
                houses: [],
                cars: [],
                motorbikes: [],
                bicycles: [], //bike maintenance/ enhancement update?
                aircrafts: [],
                marinecrafts: [],
                jewellery: [],
                stolen_goods: [],
                businesses: [],
                unique: [], //keys to cities etc
            },

            inventory: {
                general: {},
                organs: {},
                cybernetic_enhancements: {},
                weapons: {},
            },

            charms: {},
            curses: {},

            lifeLog_entries: [],
            causeOfDeath: null,
        };

        return thisPerson
    },

    setAge: (thisPerson, age) => {
        thisPerson.age = age;
    },

    ageUp: (thisPerson) => {
        //update player age
        person.setAge(thisPerson.age++);
        person.setLifeStage(thisPerson);

        // degrade organs
        if(thisPerson.age < 18){
            // pseudo - mature e.g strength grows, fertility grows
        } else if(thisPerson.age > 30){
            organs.degrade(thisPerson);
        };

        //TODO - update/degrade stats

        // update/degrade stats
        stats.refresh(thisPerson);

        //check random death if approaching/exceeding life expectancy
        if(person.deathFromOldAge(thisPerson)){
            person.killPerson(thisPerson, 'complications from old age.');
            return
        };

        //update controls/ available options. new func really
        //if age > 6 activate primary school
        //if age > 13 activate high school
        //if age > 18 activate jobs
    },

    deathFromOldAge: (thisPerson) => {
        let ageOfDecline = weightedRandom(props.species[thisPerson.species].ageOfDecline, props.species[thisPerson.species].ageOfDecline + (10 * (thisPerson.stats.fitness)), 1);
        let pointOfDeclineReached = thisPerson.age >= ageOfDecline;

        let deathChanceUpper = props.species[thisPerson.species].average_lifespan - 
            (thisPerson.age - props.species[thisPerson.species].average_lifespan);
        let healthModifier = (thisPerson.stats.health + thisPerson.stats.fitness) / 2;

        let deathRoll = randomFromRange(1, deathChanceUpper) >= deathChanceUpper - (deathChanceUpper * (1 - healthModifier));
        
        if(coinFlip() && deathRoll){
            deathRoll = !deathRoll;
        };

        return pointOfDeclineReached && deathRoll
    },

    setParents: (thisPerson, mother, father) => {
        thisPerson.relationships.mother = mother;
        thisPerson.relationships.father = father;
    },

    setSpecies: (thisPerson, species, crossbreed) => {
        if(species || crossbreed){
            if(!crossbreed || (species == crossbreed)){
                thisPerson.species = species;
                thisPerson.crossbreed = false;
            } else {
                if(species){
                    thisPerson.species = species;
                    thisPerson.crossbreed = crossbreed
                } else {
                    thisPerson.species = crossbreed;
                    thisPerson.crossbreed = false;
                };
            };
        } else {
            let speciesArray = [];
            for(let i = 0; i <= props.speciesCount - 1; i++){
                speciesArray.push(i);
            };

            let newSpecies = randomFromArray(speciesArray);

            switch(newSpecies){
                case 0:
                    newSpecies = 'human';
                    break;
                case 1:
                    newSpecies = 'alien';
                    break;
                case 2:
                    newSpecies = 'cyborg';
                    break;
            };

            thisPerson.species = newSpecies;
        };
    },

    setPhysiology: (thisPerson) => {
        limbs[thisPerson.species].default(thisPerson);
        organs[thisPerson.species].default(thisPerson);
        healthSystems[thisPerson.species].default(thisPerson);    
    },

    setNationality: (thisPerson, nationality, dualCitizen) => {
        if(nationality || dualCitizen){
            if(!dualCitizen || (nationality == dualCitizen)){
                thisPerson.nationality = nationality;
                thisPerson.dual_citizen = false;
            } else {
                if(!nationality){
                    thisPerson.nationality = dualCitizen;
                    thisPerson.dual_citizen = false;
                } else {
                    thisPerson.nationality = nationality;
                    thisPerson.dual_citizen = dualCitizen;
                }
            };
        } else {
            thisPerson.nationality = randomFromArray(props.species[thisPerson.species].nationality);
        };
    },

    setBirthplace: (thisPerson, birthplace) => {
        if(birthplace){
            thisPerson.birthplace = birthplace;
        } else {
            let parents = (thisPerson.relationships.father && thisPerson.relationships.mother)

            if(parents){
                thisPerson.birthplace = thisPerson.relationships.mother.location_city + ', ' + thisPerson.relationships.mother.location_country;
            } else {
                let newCountry = randomFromArray(props.countries);
                let regionPicker = randomProperty(props.locations[newCountry])
                let newBirthplace = randomFromArray(regionPicker);

                thisPerson.birthplace = newBirthplace + ', ' + newCountry;
            };
        };
    },

    setRace: (thisPerson, race) => {
        if(race){
            thisPerson.race = race;
        } else {
            let parents = (thisPerson.relationships.father && thisPerson.relationships.mother)

            if(parents){
                if(thisPerson.relationships.father.race != thisPerson.relationships.mother.race){
                    //TODO - make this more nuanced
                    let mixedRace = thisPerson.relationships.father.race + ':' + thisPerson.relationships.mother.race;
                    thisPerson.race = mixedRace;
                } else {
                    thisPerson.race = thisPerson.relationships.father.race
                };
            } else {
                thisPerson.race = randomFromArray(props.species[thisPerson.species].race);
            };
        };
    },

    setGender: (thisPerson, gender) => {
        if(gender){
            thisPerson.gender = gender;
        } else {
            let cFlip = coinFlip();

            if(cFlip){
                thisPerson.gender = 'male';
            } else {
                thisPerson.gender = 'female';
            };
        };
    },

    setAge: (thisPerson, age) => {
        thisPerson.age = age;
    },

    setLifeStage: (thisPerson, newStage) => {
        if(newStage){
            thisPerson.life_stage = newStage;
        } else {
            // TODO - start here - if statements arent working as cases, need to make a load of is statements :(
            let lifeStageAges = props.species[thisPerson.species].lifeStageAges;
            let lifeStages = props.species[thisPerson.species].lifeStages;

            if(thisPerson.age < lifeStageAges[1]){
                thisPerson.life_stage = lifeStages[0]; //infant
            } else if(thisPerson.age >= lifeStageAges[1] && thisPerson.age < lifeStageAges[2]){
                thisPerson.life_stage = lifeStages[1]; //child
            } else if(thisPerson.age >= lifeStageAges[2] && thisPerson.age < lifeStageAges[3]){
                thisPerson.life_stage = lifeStages[2]; //teenager
            } else if(thisPerson.age >= lifeStageAges[3] && thisPerson.age < lifeStageAges[4]){
                thisPerson.life_stage = lifeStages[3]; //adult
            } else if(thisPerson.age >= lifeStageAges[4]){
                thisPerson.life_stage = lifeStages[4]; //senior
            };
        };
    },

    setTitle: (thisPerson, title) => {
        if(title){
            thisPerson.title = title;
        } else {
            if(thisPerson.age < 18){
                thisPerson.title = props.species[thisPerson.species].gender[thisPerson.gender].title[0];
            } else {
                if(thisPerson.divorced && thisPerson.gender == 'female'){
                    thisPerson.title = props.species[thisPerson.species].gender[thisPerson.gender].title[2];
                } else if(thisPerson.gender == 'male'){
                    thisPerson.title = props.species[thisPerson.species].gender[thisPerson.gender].title[1]
                };
            };
        };
    },

    setLocation: (thisPerson, locationCountry, locationCity) => {
        if(locationCountry && locationCity){
            thisPerson.location_country = locationCountry;
            thisPerson.location_city = locationCity;
        } else {
            let birthplaceArray = thisPerson.birthplace.split(', ')
            let birthCity = birthplaceArray[0];
            let birthCountry = birthplaceArray[1];

            thisPerson.location_country = birthCountry;
            thisPerson.location_city = birthCity;
        };
    },

    setSiblings: (thisPerson, newSiblings) => {
        let personMother;
        let personFather;
        let sibMother;
        let sibFather;

        thisPerson.relationships.siblings = newSiblings;

        if(newSiblings != null){
            let sibKeys = Object.keys(thisPerson.relationships.siblings);

            for(sib in sibKeys){
                thisPerson.relationships.siblings[sibKeys[sib]].relationships.siblings = {};
                thisPerson.relationships.siblings[sibKeys[sib]].relationships.siblings[thisPerson.name+' '+thisPerson.surname] = thisPerson;
            };
        };
        
        if(thisPerson.relationships.siblings){
            personMother = thisPerson.relationships.mother;
            personFather = thisPerson.relationships.father;

            let keys = Object.keys(thisPerson.relationships.siblings);

            for(key in keys){
                let sib = thisPerson.relationships.siblings[keys[key]];
                sibMother = thisPerson.relationships.mother;
                sibFather = thisPerson.relationships.father;

                switch (sib.gender) {
                    case 'male':
                        if((personMother && personFather) === (sibMother && sibFather)){
                            sib.sibType = 'brother';
                        } else if((personMother && personFather) != (sibMother && sibFather)){
                            sib.sibType = 'step-brother';
                        } else {
                            sib.sibType = 'half-brother';
                        };
                        break;

                    case 'female':
                        if((personMother && personFather) === (sibMother && sibFather)){
                            sib.sibType = 'sister';
                        } else if((personMother && personFather) != (sibMother && sibFather)){
                            sib.sibType = 'step-sister';
                        } else {
                            sib.sibType = 'half-sister';
                        };
                        break;
                
                    default:
                        break;
                };
            }
        };
    },

    initRelationships: (thisPerson) => {
        if(thisPerson.relationships.mother != null){
            person.initRelationship(thisPerson, thisPerson.relationships.mother, randomFromRange(.6, 1));
        };

        if(thisPerson.relationships.father != null){
            person.initRelationship(thisPerson, thisPerson.relationships.father, randomFromRange(.6, 1));
        };

        let relEntries = Object.keys(thisPerson.relationships);
        let theseEntries;

        for(ent in relEntries){
            if(relEntries[ent] != 'mother' && relEntries[ent] != 'father' && relEntries[ent] != 'vals'){
                if(thisPerson.relationships[relEntries[ent]] != null){
                    theseEntries = Object.keys(thisPerson.relationships[relEntries[ent]]);
                    if(theseEntries.length > 0){
                        for(ent2 in theseEntries){
                            person.initRelationship(thisPerson, thisPerson.relationships[relEntries[ent]][theseEntries[ent2]], randomFromRange(.2, .9));
                        };
                    };
                };
            };
        };
    },
    initRelationship: (thisPerson, participant, health) => {
        let newRelationship = {
            member1: thisPerson,
            member2: participant,
            health: health,

            updateRelationship: (newHealth) => {
                newRelationship.health = newHealth;
            }
        };

        thisPerson.relationships.vals[participant.name+'_'+participant.surname] = newRelationship;
        participant.relationships.vals[thisPerson.name+'_'+thisPerson.surname] = newRelationship;
    },

    setRelationship: (thisPerson, thatPerson, newHealth) => {
        if(newHealth){
            thisPerson.relationships.vals[thatPerson.name+'_'+thatPerson.surname].health = newHealth;
        };
    },
    
    setWealth: (thisPerson, wealth) => {
        //TODO
        // balance: null,
        // income: null, //do monthly and calc up
        // outgoing: null, //do monthly and calc up
    },

    setSocialClass: (thisPerson, socialClass) => {
        if(socialClass){
            //TODO - use this to calc starting wealth and access to areas later on
            thisPerson.social_class = socialClass;
        } else {
            thisPerson.social_class = props.species[thisPerson.species].social_class[0];
        };
    },

    addRole: (thisPerson, role) => {
        thisPerson.roles.push(role);
    },

    setRoles: (thisPerson, roles) => {
        thisPerson.roles = roles;
    },

    setJob: (thisPerson, job) => {
        thisPerson.job = job;
    },

    addTrait: (thisPerson, trait) => {
        thisPerson.traits.push(trait);
    },

    setTraits: (thisPerson, traits) => {
        thisPerson.traits = traits;
    },

    setName: (thisPerson, name, surname) => {
        let newName;
        let newSurname;
        let nameNationality;
        let nameRace;

        let parents = (thisPerson.relationships.father && thisPerson.relationships.mother)
        if(parents){
            if(thisPerson.relationships.father.nationality != thisPerson.relationships.mother.nationality){
                let cFlip = coinFlip();

                if(cFlip){
                    nameNationality = thisPerson.relationships.father.nationality;
                } else {
                    nameNationality = thisPerson.relationships.mother.nationality;
                };

                if(cFlip){
                    nameRace = thisPerson.relationships.father.race;
                } else {
                    nameRace = thisPerson.relationships.mother.race;
                };
            } else {
                nameNationality = thisPerson.relationships.father.nationality;
                nameRace = thisPerson.relationships.father.race;
            };
        } else {
            nameNationality = thisPerson.nationality;
            nameRace = thisPerson.race;
        };

        if(name){
            newName = name;
        } else {
            newName = randomFromArray(props.species[thisPerson.species].gender[thisPerson.gender].name[nameNationality][nameRace]);
        };

        if(surname){
            newSurname = surname;
        } else {
            newSurname = randomFromArray(props.species[thisPerson.species].surname[nameNationality]);
        };

        thisPerson.name = newName;
        thisPerson.surname = newSurname;
    },
    
    initStats: (thisPerson) => {
        //TODO - store these vals instead, then have the player mature towards them?
        // just work out if you are going to mature up OR just have a random amount of degradation on each stat...
        // need to work out how to fix the stat multiplication issue that is causing it to drop by fixed amount each year... 

        // health, beauty, fitness, fertility, discipline, 
        // intelligence, happiness, strength, charisma
        // marksmanship, fame, criminality, intimidation,
        // karma

        let mother = thisPerson.relationships.mother;
        let father = thisPerson.relationships.father;

        let newHealth = parents.calcInheritedStat(mother, father, 'health');
        let newBeauty = parents.calcInheritedStat(mother, father, 'beauty');
        let newFitness = parents.calcInheritedStat(mother, father, 'fitness');
        let newFertility = parents.calcInheritedStat(mother, father, 'fertility');
        let newDiscipline = parents.calcInheritedStat(mother, father, 'discipline');
        let newIntelligence = parents.calcInheritedStat(mother, father, 'intelligence');
        let newHappiness = parents.calcInheritedStat(mother, father, 'happiness');
        let newStrength = parents.calcInheritedStat(mother, father, 'strength');
        let newCharisma = parents.calcInheritedStat(mother, father, 'charisma');

        person.setStats(
            thisPerson, 
                newHealth, newBeauty, newFitness, newFertility, newDiscipline, 
                newIntelligence, newHappiness, newStrength, newCharisma,
                0, 0, 0, 0,
                randomFromRange(0.4, 1)
            );
        stats.refresh(thisPerson);
    },

    setStats: (
        thisPerson,
        health, beauty, fitness, fertility, discipline, intelligence, happiness, 
        strength, charisma, marksmanship, fame, criminality, intimidation, karma,
        ) => {

            person.setStat(thisPerson, 'health', health);

            person.setStat(thisPerson, 'beauty', beauty);
            person.setStat(thisPerson, 'fitness', fitness);
            person.setStat(thisPerson, 'fertility', fertility);
            person.setStat(thisPerson, 'discipline', discipline);
            person.setStat(thisPerson, 'intelligence', intelligence);
            person.setStat(thisPerson, 'happiness', happiness);


            person.setStat(thisPerson, 'strength', strength);
            person.setStat(thisPerson, 'charisma', charisma);
            person.setStat(thisPerson, 'marksmanship', marksmanship);
            person.setStat(thisPerson, 'fame', fame);
            person.setStat(thisPerson, 'criminality', criminality);
            person.setStat(thisPerson, 'intimidation', intimidation);
            person.setStat(thisPerson, 'karma', karma);

    },

    setStat: (thisPerson, thisStat, value) => {
        thisPerson.stats[thisStat] = value;
    },

    nilStats: (thisPerson) => {
        let keys = Object.keys(thisPerson.stats);

        for(keyNum in keys){
            person.setStat(thisPerson, keys[keyNum], 0);
        };
    },

    killPerson: (thisPerson, cause) => {
        thisPerson.causeOfDeath = cause;
        person.nilStats(thisPerson);
        lifeLog.addEntry(lifeEvents.general.died);
        thisPerson.alive = false;
    },
};