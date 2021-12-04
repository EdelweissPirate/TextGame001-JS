const viewBox = {
    init: () => {
        viewBox.bio.init();
        viewBox.organs.init();
        viewBox.limbs.init();
        viewBox.healthSystems.init();
        viewBox.family.init();
        viewBox.school.init();

        viewBox.stats.init();
    },

    defaultEntries: () => {
        viewBox.bio.addEntries(props.player);
        viewBox.organs.addEntries(props.player);
        viewBox.limbs.addEntries(props.player);
        viewBox.healthSystems.addEntries(props.player);
        viewBox.family.addEntries(props.player);
        viewBox.stats.addEntries(props.player);
    },

    stats: {
        entries: {},

        init: () => {
            let lib = props.library;

            props.stats_box = new lib.stats_frameSmall();
            _.holder_stats.addChild(props.stats_box);

            props.stats_box.x = 465;
            props.stats_box.y = 150;
        },

        addEntries: (thisPerson) => {
            let keys = Object.keys(thisPerson.stats);
            let values = Object.values(thisPerson.stats);

            props.stats_box.removeAllChildren();
            viewBox.stats.entries = {};

            viewBox.stats.addHeader('stats');
            for(keyNum in keys){
                if((values[keyNum] != null)){
                    viewBox.stats.addEntry(keys[keyNum], values[keyNum]);
                };
            };
        },

        addHeader: (label) => {
            let lib = props.library;

            let newEntry = new lib.stats_headerSmall();
            props.stats_box.holder_values.addChild(newEntry);

            newEntry.data = label;

            newEntry.label.text = label.toUpperCase();

            let keys = Object.keys(viewBox.stats.entries);

            newEntry.x = 0;
            newEntry.y = -(288 - (38 * keys.length));

            viewBox.stats.entries[label] = newEntry;
        },

        addEntry: (label, value) => {
            let lib = props.library;

            let newEntry = new lib.stats_entrySmall();
            props.stats_box.holder_values.addChild(newEntry);

            newEntry.data = label;

            newEntry.label.text = capitaliseWord(label) + ':';

            value = roundTo(value, 2);
            newEntry.value.text = ceil(value * 100) + '%';

            let keys = Object.keys(viewBox.stats.entries);

            newEntry.x = 0;
            newEntry.y = -(288 - (38 * keys.length));
            viewBox.stats.entries[label] = newEntry;
        },

        updateEntries: () => {
            let keys = Object.keys(viewBox.stats.entries);
            for(key in keys){
                if(key > 0){
                    viewBox.stats.updateEntry(keys[key], props.player.stats[keys[key]]);
                };
            };
        },

        updateEntry: (thisEntry, value) => {
            value = roundTo(value, 2);
            viewBox.stats.entries[thisEntry].value.text = ceil(value * 100) + '%';
        },
    },

    bio: {
        entries: {},

        init: () => {
            let lib = props.library;

            props.bio_box = new lib.stats_frame();
            _.holder_stats.addChild(props.bio_box);

            props.bio_box.x = 225;
            props.bio_box.y = 270;

            props.info_boxes.push(props.bio_box);
        },

        addEntries: (thisPerson) => {
            let keys = Object.keys(thisPerson);
            let values = Object.values(thisPerson);

            props.bio_box.removeAllChildren();
            viewBox.bio.entries = {};

            for(keyNum in keys){
                if((values[keyNum] != null && !Array.isArray(values[keyNum]) && typeof values[keyNum] != 'object')){
                    viewBox.bio.addEntry(keys[keyNum], values[keyNum])
                };
            };
        },

        addEntry: (label, value) => {
            let lib = props.library;

            let newEntry = new lib.stats_entry();
            props.bio_box.holder_values.addChild(newEntry);

            newEntry.data = label;

            newEntry.label.text = capitaliseWord(label) + ':';

            if(label == 'birthplace'){
                value = String(value).split(', ');
                newEntry.value.text = capitaliseWord(value[0]) + ', ' + capitaliseWord(value[1]);
            } else{
                newEntry.value.text = capitaliseWord(String(value));
            };

            let keys = Object.keys(viewBox.bio.entries);

            newEntry.x = 0;
            newEntry.y = -(288 - (26 * keys.length));
            viewBox.bio.entries[label] = newEntry;
        },

        updateEntry: (thisEntry, value) => {
            viewBox.bio.entries[thisEntry].value.text = capitaliseWord(String(value));
        },
    },

    person: {
        entries: {},

        generate: (thisPerson) => {
            let lib = props.library;

            props.person_box = new lib.stats_frame();
            _.holder_stats.addChild(props.person_box);
            props.info_boxes.push(props.person_box);

            props.person_box.x = 225;
            props.person_box.y = 270;

            viewBox.person.addEntries(thisPerson)

            props.person_box.tween_in = Tween(props.person_box, 'y', 'out', 270, .5);
        },

        destroy: () => {
            props.person_box.tween_out = Tween(props.person_box, 'y', 'out', 1200, 1, function(){
                props.info_boxes.splice(props.info_boxes.length - 1);
                _.holder_stats.removeChild(props.person_box);
                props.person_box = null;
                viewBox.person.entries = {};
            });
        },

        addEntries: (thisPerson) => {
            viewBox.person.addHeader(thisPerson.name + ' ' + thisPerson.surname);

            let keys = Object.keys(thisPerson.actions);

            keys.map((key, i) => {
                let thisEntry = viewBox.person.addEntry(key);
                thisEntry.button_entry.on('mousedown', function(){
                    let act = thisPerson.actions[keys[i]];
                    act.do();
                    viewBox.person.destroy();
                    console.log(keys[i]);
                });
            });
        },

        addHeader: (label) => {
            let lib = props.library;

            let newEntry = new lib.stats_header();
            props.person_box.holder_values.addChild(newEntry);

            newEntry.data = label;

            newEntry.label.text = label.toUpperCase();

            let keys = Object.keys(viewBox.person.entries);

            newEntry.x = 0;
            newEntry.y = -(288 - (26 * keys.length));

            viewBox.person.entries[label] = newEntry;
        },

        addEntry: (label, value) => {
            let lib = props.library;

            let newEntry = new lib.stats_entry();
            props.person_box.holder_values.addChild(newEntry);

            newEntry.data = label;

            newEntry.label.text = capitaliseWord(label)
            if(value){
                newEntry.value.text = (value * 100) + '%';
            } else {
                newEntry.value.text = '';
            };

            let keys = Object.keys(viewBox.person.entries);

            newEntry.x = 0;
            newEntry.y = -(288 - (26 * keys.length));

            viewBox.person.entries[label] = newEntry;

            return newEntry
        },
    },

    lifeLog: {
        // TODO?
    },

    healthSystems: {
        entries: {},

        init: () => {
            let lib = props.library;

            props.healthSystems_box = new lib.stats_frame();
            _.holder_stats.addChild(props.healthSystems_box);

            props.healthSystems_box.x = 225;
            props.healthSystems_box.y = 270;
            
            props.info_boxes.push(props.healthSystems_box);

            props.healthSystems_box.visible = false;
        },

        addEntries: (thisPerson) => {
            let keys = Object.keys(thisPerson.vitals.systems);
            let values = Object.values(thisPerson.vitals.systems);

            props.healthSystems_box.removeAllChildren();
            viewBox.healthSystems.entries = {};

            for(keyNum in keys){
                if((values[keyNum] != null && !Array.isArray(values[keyNum]))){
                    let newEntry = viewBox.healthSystems.addEntry(keys[keyNum], values[keyNum].health)
                    
                    newEntry.on('mousedown', function (){
                        let labelText = newEntry.data;
                        for(dependant in thisPerson.vitals.systems[labelText].dependants){
                            console.log(thisPerson.vitals.systems[labelText].dependants[dependant]);
                        };
                    });

                };
            };
        },

        addEntry: (label, value) => {
            let lib = props.library;

            let newEntry = new lib.stats_entry();
            props.healthSystems_box.holder_values.addChild(newEntry);

            newEntry.data = label;

            newEntry.label.text = capitaliseWord(label) + ':';
            newEntry.value.text = (value * 100) + '%';

            let keys = Object.keys(viewBox.healthSystems.entries);

            newEntry.x = 0;
            newEntry.y = -(288 - (26 * keys.length));

            viewBox.healthSystems.entries[label] = newEntry;

            return newEntry
        },

        updateEntry: (thisEntry, value) => {
            switch (value) {
                case 0:
                    viewBox.healthSystems.entries[thisEntry].value.color = 'red';
                    viewBox.healthSystems.entries[thisEntry].value.text = 'SYSTEM FAILED';
                    break;
                
                case 'removed':
                    
                    break;
            
                default:
                    viewBox.healthSystems.entries[thisEntry].value.color = '#333333';
                    viewBox.healthSystems.entries[thisEntry].value.text = roundTo((value * 100), 0) + '%';
                    break;
            };
        },
    },

    organs: {
        entries: {},

        init: () => {
            let lib = props.library;

            props.organs_box = new lib.stats_frame();
            _.holder_stats.addChild(props.organs_box);

            props.organs_box.x = 225;
            props.organs_box.y = 270;
            
            props.info_boxes.push(props.organs_box);

            props.organs_box.visible = false;
        },

        addEntries: (thisPerson) => {
            let keys = Object.keys(thisPerson.vitals.organs);
            let values = Object.values(thisPerson.vitals.organs);

            props.organs_box.removeAllChildren();
            viewBox.organs.entries = {};

            for(keyNum in keys){
                let newEntry = viewBox.organs.addEntry(keys[keyNum], values[keyNum].health)
                    
                newEntry.on('mousedown', function (){
                    let labelText = newEntry.data;
                    console.log(thisPerson.vitals.organs[labelText].system);
                });
            };
        },

        addEntry: (label, value) => {
            let lib = props.library;

            let newEntry = new lib.stats_entry();
            props.organs_box.holder_values.addChild(newEntry);

            newEntry.data = label;

            newEntry.label.text = capitaliseWord(label) + ':';
            newEntry.value.text = (value * 100) + '%';

            let keys = Object.keys(viewBox.organs.entries);

            newEntry.x = 0;
            newEntry.y = -(288 - (26 * keys.length));

            viewBox.organs.entries[label] = newEntry;

            return newEntry
        },

        updateEntry: (thisEntry, value) => {
            switch (value) {
                case 0:
                    viewBox.organs.entries[thisEntry].value.color = 'red';
                    viewBox.organs.entries[thisEntry].value.text = 'ORGAN FAILED';
                    break;
                
                case 'removed':
                    viewBox.organs.entries[thisEntry].value.color = 'red';
                    viewBox.organs.entries[thisEntry].value.text = 'REMOVED';
                    break;
            
                default:
                    viewBox.organs.entries[thisEntry].value.color = '#333333';
                    viewBox.organs.entries[thisEntry].value.text = roundTo((value * 100), 0) + '%';
                    break;
            };
        },
    },

    limbs: {
        entries: {},

        init: () => {
            let lib = props.library;

            props.limbs_box = new lib.stats_frame();
            _.holder_stats.addChild(props.limbs_box);

            props.limbs_box.x = 225;
            props.limbs_box.y = 270;
            
            props.info_boxes.push(props.limbs_box);

            props.limbs_box.visible = false;
        },

        addEntries: (thisPerson) => {
            let keys = Object.keys(thisPerson.vitals.limbs);
            let values = Object.values(thisPerson.vitals.limbs);

            props.limbs_box.removeAllChildren();
            viewBox.limbs.entries = {};

            for(keyNum in keys){
                let newEntry = viewBox.limbs.addEntry(keys[keyNum], values[keyNum].health)
                    
                newEntry.on('mousedown', function (){
                    let labelText = newEntry.data;
                    console.log(thisPerson.vitals.limbs[labelText].system);
                });
            };
        },

        addEntry: (label, value) => {
            let lib = props.library;

            let newEntry = new lib.stats_entry();
            props.limbs_box.holder_values.addChild(newEntry);

            newEntry.data = label;

            newEntry.label.text = capitaliseWord(label) + ':';
            newEntry.value.text = (value * 100) + '%';

            let keys = Object.keys(viewBox.limbs.entries);

            newEntry.x = 0;
            newEntry.y = -(288 - (26 * keys.length));

            viewBox.limbs.entries[label] = newEntry;

            return newEntry
        },

        updateEntry: (thisEntry, value) => {
            switch (value) {
                case 0:
                    viewBox.limbs.entries[thisEntry].value.color = 'red';
                    viewBox.limbs.entries[thisEntry].value.text = 'LIMB FAILED';
                    break;
                
                case 'removed':
                    viewBox.limbs.entries[thisEntry].value.color = 'red';
                    viewBox.limbs.entries[thisEntry].value.text = 'REMOVED';
                    break;
            
                default:
                    viewBox.limbs.entries[thisEntry].value.colour = '#333333';
                    viewBox.limbs.entries[thisEntry].value.text = roundTo((value * 100), 0) + '%';
                    break;
            };
        },
    },

    family: {
        entries: 0,

        init: () => {
            let lib = props.library;

            props.family_box = new lib.stats_frame();
            _.holder_stats.addChild(props.family_box);

            props.family_box.x = 225;
            props.family_box.y = 270;

            props.info_boxes.push(props.family_box);

            props.family_box.visible = false;
        },

        addEntries: (thisPerson) => {
            props.family_box.removeAllChildren();
            viewBox.family.entries = 0;

            // Parents
            if(thisPerson.relationships.mother || thisPerson.relationships.father){
                viewBox.family.addHeader('parents');
                viewBox.family.addEntry(thisPerson.relationships.mother.name + ' ' + thisPerson.relationships.mother.surname, 
                    'Mother'
                );
                viewBox.family.addEntry(thisPerson.relationships.father.name + ' ' + thisPerson.relationships.father.surname, 
                    'Father'
                );
            }

            // Siblings
            let sibNames = Object.keys(thisPerson.relationships.siblings);

            if(sibNames.length > 0){
                viewBox.family.addHeader('siblings');
                let siblingKeys = Object.keys(thisPerson.relationships.siblings);
                for(key in siblingKeys){
                    let sib = thisPerson.relationships.siblings[siblingKeys[key]]
                    viewBox.family.addEntry(sib.name + ' ' + sib.surname, sib.sibType);
                };
            };
        },

        addHeader: (label) => {
            let lib = props.library;

            let newEntry = new lib.stats_header();
            props.family_box.holder_values.addChild(newEntry);

            newEntry.data = label;

            newEntry.label.text = label.toUpperCase();;

            newEntry.x = 0;
            newEntry.y = -(288 - (26 * viewBox.family.entries));

            viewBox.family.entries++;
        },

        addEntry: (label, value) => {
            let lib = props.library;

            let newEntry = new lib.stats_entry();
            props.family_box.holder_values.addChild(newEntry);

            newEntry.data = value;

            newEntry.label.text = capitaliseWord(label);
            newEntry.value.text = capitaliseWord(String(value));

            newEntry.x = 0;
            newEntry.y = -(288 - (26 * viewBox.family.entries));

            viewBox.family.entries++;
        }
    },

    school: {
        entries: {
            home: {},
            faculty: {},
            classmates: {},
            extracurricular: {},
        },

        init: () => {
            let lib = props.library;

            props.school_box = new lib.stats_frame();
            _.holder_stats.addChild(props.school_box);

            props.school_box.x = 225;
            props.school_box.y = 270;

            props.info_boxes.push(props.school_box);
        },

        updateView: (mode) => {
            let allEntries;
            let theseEntries;

            switch (mode) {
                case 'faculty':
                    allEntries = Object.keys(viewBox.school.entries);
                    
                    for(ent in allEntries){
                        theseEntries = Object.keys(viewBox.school.entries[allEntries[ent]]);
                        for(ent2 in theseEntries){
                            let thisEntry = viewBox.school.entries[allEntries[ent]][theseEntries[ent2]];
                            thisEntry.visible = false;
                        };
                    };

                    let facultyEntries = Object.keys(viewBox.school.entries.faculty);
                    for(fM in facultyEntries){
                        viewBox.school.entries.faculty[facultyEntries[fM]].visible = true;
                    };
                    break;

                case 'classmates':
                    allEntries = Object.keys(viewBox.school.entries);
                    
                    for(ent in allEntries){
                        theseEntries = Object.keys(viewBox.school.entries[allEntries[ent]]);
                        for(ent2 in theseEntries){
                            let thisEntry = viewBox.school.entries[allEntries[ent]][theseEntries[ent2]];
                            thisEntry.visible = false;
                        };
                    };

                    let classmateEntries = Object.keys(viewBox.school.entries.classmates);
                    for(cM in classmateEntries){
                        viewBox.school.entries.classmates[classmateEntries[cM]].visible = true;
                    };
                    break;

                case 'extracurricular':
                    allEntries = Object.keys(viewBox.school.entries);
                    
                    for(ent in allEntries){
                        theseEntries = Object.keys(viewBox.school.entries[allEntries[ent]]);
                        for(ent2 in theseEntries){
                            let thisEntry = viewBox.school.entries[allEntries[ent]][theseEntries[ent2]];
                            thisEntry.visible = false;
                        };
                    };

                    let extracurricularEntries = Object.keys(viewBox.school.entries.extracurricular);
                    for(ex in extracurricularEntries){
                        viewBox.school.entries.extracurricular[extracurricularEntries[ex]].visible = true;
                    };
                    break;
            
                default:
                    allEntries = Object.keys(viewBox.school.entries);
                    
                    for(ent in allEntries){
                        theseEntries = Object.keys(viewBox.school.entries[allEntries[ent]]);
                        for(ent2 in theseEntries){
                            let thisEntry = viewBox.school.entries[allEntries[ent]][theseEntries[ent2]];
                            thisEntry.visible = false;
                        };
                    };

                    let homeEntries = Object.keys(viewBox.school.entries.home);
                    for(hm in homeEntries){
                        viewBox.school.entries.home[homeEntries[hm]].visible = true;
                    };
                    break;
            }
        },

        addEntries: (thisPerson) => {
            let thisEntry;

            // Home
            viewBox.school.addHeader(thisPerson.school.name, 'home');
            thisEntry = viewBox.school.addEntry('Faculty', null, 'home');
            thisEntry.button_entry.on('mousedown', function(){
                viewBox.school.updateView('faculty');
            });
            thisEntry = viewBox.school.addEntry('Classmates', null, 'home');
            thisEntry.button_entry.on('mousedown', function(){
                viewBox.school.updateView('classmates');
            });
            thisEntry = viewBox.school.addEntry('Activities', null, 'home');
            thisEntry.button_entry.on('mousedown', function(){
                viewBox.school.updateView('extracurricular');
            });
            thisEntry = viewBox.school.addEntry('Skip School', null, 'home');
            thisEntry.button_entry.on('mousedown', function(){
                actions.skip_school(thisPerson);
            });
            thisEntry = viewBox.school.addEntry('Do Homework', null, 'home');
            thisEntry.button_entry.on('mousedown', function(){
                actions.do_homework(thisPerson);
            });
            thisEntry = viewBox.school.addEntry('Drop Out', null, 'home');
            thisEntry.button_entry.on('mousedown', function(){
                actions.drop_out(thisPerson);
            });

            // Faculty
            viewBox.school.addHeader('Headmaster', 'faculty'); //make country specific?
            thisEntry = viewBox.school.addEntry(thisPerson.school.head.name + ' ' + thisPerson.school.head.surname, null, 'faculty');
            thisEntry.button_entry.on('mousedown', function (){
                viewBox.person.generate(thisPerson.school.head);
            });
            
            viewBox.school.addHeader('Teachers', 'faculty');
            let teacherNames = Object.keys(thisPerson.school.faculty);
            
            for(teach in teacherNames){
                thisEntry = viewBox.school.addEntry(capitaliseWord(teacherNames[teach]), null, 'faculty');
                thisEntry.button_entry.on('mousedown', function (){
                    viewBox.person.generate(thisPerson.school.teachers[teacherNames[teach]]);
                });
            };

            // Classmates
            viewBox.school.addHeader('Teacher', 'classmates');
            thisEntry = viewBox.school.addEntry(thisPerson.school.playersTeacher.name + ' ' + thisPerson.school.playersTeacher.surname, null, 'classmates');
            thisEntry.button_entry.on('mousedown', function (){
                viewBox.person.generate(thisPerson.school.playersTeacher);
            });
            
            viewBox.school.addHeader('Classmates', 'classmates');
            
            let classmatesNames = Object.keys(thisPerson.school.classmates);
            
            for(cm in classmatesNames){
                thisEntry = viewBox.school.addEntry(capitaliseWord(classmatesNames[cm]), null, 'classmates');
                thisEntry.button_entry.on('mousedown', function (){
                    viewBox.person.generate(thisPerson.school.classmates[classmatesNames[cm]]);
                });
            };

            viewBox.school.updateView('home');

        },

        addHeader: (label, type) => {
            let lib = props.library;

            let newEntry = new lib.stats_header();
            props.school_box.holder_values.addChild(newEntry);

            newEntry.data = label;

            newEntry.label.text = label.toUpperCase();

            let keys = Object.keys(viewBox.school.entries[type]);

            newEntry.x = 0;
            newEntry.y = -(288 - (26 * keys.length));

            viewBox.school.entries[type][label] = newEntry;
        },

        addEntry: (label, value, type) => {
            let lib = props.library;

            let newEntry = new lib.stats_entry();
            props.school_box.holder_values.addChild(newEntry);

            newEntry.data = label;

            newEntry.label.text = capitaliseWord(label);

            if(value){
                newEntry.value.text = capitaliseWord(String(value));
            } else {
                newEntry.value.text = ''
            };

            let keys = Object.keys(viewBox.school.entries[type]);

            newEntry.x = 0;
            newEntry.y = -(288 - (26 * keys.length));
            viewBox.school.entries[type][label] = newEntry;
            return newEntry
        },

        updateEntries: (type) => {
            theseEntries = Object.keys(viewBox.school.entries[type]);

            for(ent in theseEntries){
                viewBox.school.updateEntry(viewBox.school.entries[theseEntries[ent]])
            };
        },

        updateEntry: (thisEntry, value) => {
            if(value){
                thisEntry.value.text = capitaliseWord(String(value));
            };
        },
    },
};