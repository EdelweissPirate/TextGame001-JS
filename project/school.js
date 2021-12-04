const school = {
    init: () => {
        let thisSchool = {
            type: null,
            country: null,
            name: null,
            head: {},
            faculty: {},
            playersTeacher: {},
            classmates: {},
            bully: {},
            actions: {},
            activities: {},
            performance: null,
            popularity: null,
        };

        return thisSchool
    },

    create: () => {
        let newSchool = school.init();

        school.setType(newSchool);
        school.setCountry(newSchool);
        school.setName(newSchool);
        school.setHead(newSchool);
        school.setFaculty(newSchool);
        school.setClassmates(newSchool);
        school.setBully(newSchool);
        school.setActions(newSchool);
        
        
        // viewBox.school.addEntries();
        return newSchool
    },

    setType: (thisSchool, type) => {
        if(type){
            thisSchool.type = thisType;
        } else {
            if(props.player.age < 11){
                thisSchool.type = 'primary';
            } else if(props.player.age < 14){
                thisSchool.type = 'junior';
            } else if(props.player.age < 18){
                thisSchool.type = 'secondary';
            };
        };
    },

    setCountry: (thisSchool) => {
        thisSchool.country = props.player.location_country;
    },

    setName: (thisSchool, schoolName) => {
        generateSchoolName = () => {
            let thisName = 'Owain Glyndwr';
            return thisName
        };

        if(schoolName){
            thisSchool.name = schoolName;
        } else {
            thisSchool.name = generateSchoolName();
        };

        thisSchool.name += ' ' + thisSchool.type + ' school'; 
    },

    setHead: (thisSchool) => {
        createPrinciple = () => {
            let thisMember = person.random();
            person.setNationality(thisMember, props.player.nationality);
            person.setLocation(thisMember, props.player.location_country, props.player.location_city);
            
            while(thisMember.age < randomFromRange(46, 68)){
                person.ageUp(thisMember);
            };
            
            person.setLifeStage(thisMember);

            thisMember.actions = actionMaps.teachers;

            if(thisMember.alive){
                return thisMember
            };
        };

        thisSchool.head = createPrinciple();
    },

    setFaculty: (thisSchool) => {
        createFacultyMember = () => {
            let thisMember = person.random();
            person.setLocation(thisMember, props.player.location_country, props.player.location_city);
            
            let thisAge = floor(randomFromRange(24, 68));

            while(thisMember.age < thisAge){
                person.ageUp(thisMember);
            };
            
            person.setLifeStage(thisMember);

            thisMember.actions = actionMaps.teachers;

            if(thisMember.alive && thisMember.stats.health){
                return thisMember
            };
        };

        let fmCount = floor(randomFromRange(3, 8));

        for(let i = 0; i <= fmCount; i++){
            let thisFm = createFacultyMember();
            if(thisFm){
                props.player.relationships.teachers[thisFm.name + '_' + thisFm.surname] = thisFm;
                thisSchool.faculty[thisFm.name + '_' + thisFm.surname] = thisFm;
            };
        };

        let teacherNames = Object.keys(thisSchool.faculty);
        let chosenTeacher = floor(Math.random() * (fmCount - 1));  

        thisSchool.playersTeacher = thisSchool.faculty[teacherNames[chosenTeacher]];
    },

    setClassmates: (thisSchool) => {
        createClassmate = () => {
            let thisClassmate = person.random();
            person.setLocation(thisClassmate, props.player.location_country, props.player.location_city);
            
            while(thisClassmate.age < props.player.age){
                person.ageUp(thisClassmate);
            };
            
            person.setLifeStage(thisClassmate);

            thisClassmate.actions = actionMaps.classmates;

            return thisClassmate
        };

        let classmateCount = floor(randomFromRange(6, 12));

        for(let i = 0; i <= classmateCount; i++){
            let thisCm = createClassmate();
            props.player.relationships.classmates[thisCm.name + '_' + thisCm.surname] = thisCm;
            thisSchool.classmates[thisCm.name + '_' + thisCm.surname] = thisCm;
        };
    },

    setBully: (thisSchool) => {
        let highestStrength = 0;
        let thisBully;
        let keys = Object.keys(thisSchool.classmates);

        for(cm in keys){
            if(thisSchool.classmates[keys[cm]].stats.strength > highestStrength){
                highestStrength = thisSchool.classmates[keys[cm]].stats.strength;
                thisBully = thisSchool.classmates[keys[cm]];
            };
        };

        thisSchool.bully = thisBully;
    },

    setActions: (thisSchool) => {
        switch (thisSchool.type) {
            case 'primary':
                
                break;
        
            default:
                break;
        }
    },

    setPerformance: () => {
        
    },

    updatePerformance: () => {
        
    },

    setPopularity: () => {
        
    },

    updatePopularity: () => {
        
    },

    actions: {
        seeFaculty: () => {
            
        },
        seeClassmates: () => {
            
        },
        seeExtracurricular: () => {
            
        },
        skipSchool: () => {
            
        },
        doHomework: () => {
            
        },
        dropOut: () => {
            
        },
    }
};