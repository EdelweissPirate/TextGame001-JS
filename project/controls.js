const controls = {
    init: () => {
        controls.buttons.init();
    },

    showBox: (thisBox) => {
        props.info_boxes.map(box => {
            box.visible = false;
        });

        thisBox.visible = true;
    },

    buttons: {
        init: () => {
            _.holder_controls.x = 30;
            _.holder_controls.y = 30;

            //buttonCreate
            const buttonCreate = controls.buttons.init_button(-12.5, -5, 'CREATE');
            buttonCreate.buttonFunc = () => {
                props.player = person.random();
                viewBox.defaultEntries();
                healthSystems.refresh(props.player);

                lifeLog.addEntry(lifeEvents.general.born, true);

                controls.showBox(props.lifeLog_box);
                controls.buttons.defaultPerson();
            };
            
            buttonCreate.enableButton(true);

            //buttonAge
            const buttonAge = controls.buttons.init_button(-12.5, -5, 'AGE');
            buttonAge.buttonFunc = () => {
                if(props.player.alive){
                    // while(props.player.alive){
                        person.ageUp(props.player);
                        for(peeps in props.people){
                            if(props.people[peeps] != props.player && props.people[peeps].alive){
                                person.ageUp(props.people[peeps]);
                            };
                        };
                        //update visuals
                        viewBox.bio.updateEntry('age', props.player.age);
                        viewBox.bio.updateEntry('life_stage', props.player.life_stage);
                        //try do random event contexual to life stage
                        if(randomFromRange(1, 6) >= 3){
                            let randomEvent = randomProperty(lifeEvents[props.player.life_stage]);
                            lifeLog.addEntry(randomEvent, true);
                        } else {
                            lifeLog.addEntry(null, true);
                        };
                    // };
                };
            };
            buttonAge.showHide(false);

            //buttonLog
            const buttonLog = controls.buttons.init_button(buttonCreate.y + 30, buttonCreate.label.y + 30, 'LOG');
            buttonLog.buttonFunc = () => {
                controls.showBox(props.lifeLog_box);
            };

            //buttonStats
            const buttonBio = controls.buttons.init_button(buttonLog.y + 30, buttonLog.label.y + 30, 'BIO');
            buttonBio.buttonFunc = () => {
                controls.showBox(props.bio_box);
            };

            //buttonHealthSystems
            const buttonHealthSystems = controls.buttons.init_button(buttonBio.y + 30, buttonBio.label.y + 30, 'SYS');
            buttonHealthSystems.buttonFunc = () => {
                controls.showBox(props.healthSystems_box);
            };

            //buttonOrgans
            const buttonOrgans = controls.buttons.init_button(buttonHealthSystems.y + 30, buttonHealthSystems.label.y + 30, 'ORGS');
            buttonOrgans.buttonFunc = () => {
                controls.showBox(props.organs_box);
            };

            //buttonLimbs
            const buttonLimbs = controls.buttons.init_button(buttonOrgans.y + 30, buttonOrgans.label.y + 30, 'LIMBS');
            buttonLimbs.buttonFunc = () => {
                controls.showBox(props.limbs_box);
            };

            //buttonFamily
            const buttonFamily = controls.buttons.init_button(buttonLimbs.y + 30, buttonLimbs.label.y + 30, 'FAM');
            buttonFamily.buttonFunc = () => {
                controls.showBox(props.family_box);
            };

            //buttonSchool
            const buttonSchool = controls.buttons.init_button(buttonFamily.y + 30, buttonFamily.label.y + 30, 'SCHL');
            buttonSchool.buttonFunc = () => {
                controls.showBox(props.school_box);
                if(props.player.school == null){
                    props.player.school = school.create();
                    viewBox.school.addEntries(props.player);
                    // console.log(props.player.school);
                } else {
                    viewBox.school.updateView('home');
                };
            };

            // //buttonDamage - TEST
            // const buttonDamage = controls.buttons.init_button(buttonFamily.y + 30, buttonFamily.label.y + 30, 'DMGE');
            // buttonDamage.buttonFunc = () => {
            //     let keysOrg = Object.keys(props.player.vitals.organs);
            //     let keysLimb = Object.keys(props.player.vitals.limbs);
            //     let targetType;

            //     let cFlip = coinFlip();

            //     if(cFlip){
            //         targetType = keysOrg;
            //     } else {
            //         targetType = keysLimb;
            //     };

            //     let randomTarget = randomFromArray(targetType);
            //     //TODO - somehow link hair, skin, teeth, lips and beard/breasts to beauty
            //     //missing eye also drops beauty, trait 'missing eye'
            //     //trait 'limp' if one knee destroyed and other not, or if movement below 50%
            //     while(randomTarget == 'hair' || randomTarget == 'skin' || randomTarget == 'beard' ){
            //             randomTarget = randomFromArray(targetType);
            //     };

            //     let damageVal = randomFromRange(0, 1);
            //     console.log('Damaged ' + randomTarget + ' for ' + damageVal + ' damage' + '!')

            //     switch (targetType) {
            //         case keysOrg:
            //             props.player.vitals.organs[randomTarget].damageOrgan(damageVal, 0);
            //             break;

            //         case keysLimb:
            //             props.player.vitals.limbs[randomTarget].damageLimb(damageVal, 0);
            //             break;
            //     };
            // };

            // //buttonStat+ - TEST
            // const buttonHappyPlus = controls.buttons.init_button(buttonDamage.y + 30, buttonDamage.label.y + 30, 'Hppy+');
            // buttonHappyPlus.buttonFunc = () => {
            //     props.player.stats.happiness += 0.05;
            //     stats.refresh(props.player);
            // };

            // //buttonStat- - TEST
            // const buttonHappyMinus = controls.buttons.init_button(buttonHappyPlus.y + 30, buttonHappyPlus.label.y + 30, 'Hppy-');
            // buttonHappyMinus.buttonFunc = () => {
            //     props.player.stats.happiness -= 0.05;
            //     stats.refresh(props.player);
            // };

            // //buttonStat- - TEST
            // const buttonGym = controls.buttons.init_button(buttonHappyMinus.y + 30, buttonHappyMinus.label.y + 30, 'GYM');
            // buttonGym.buttonFunc = () => {
            //     //needs to affect health! may need to go back to old stat calculation method :(
            //     props.player.vitals.organs.heart.setOrganHealth(props.player.vitals.organs.heart.health + (weightedRandom(0.1, 0.5, 5)));
            //     props.player.vitals.organs.left_lung.setOrganHealth(props.player.vitals.organs.left_lung.health + (weightedRandom(0.1, 0.5, 5)));
            //     props.player.vitals.organs.right_lung.setOrganHealth(props.player.vitals.organs.right_lung.health + (weightedRandom(0.1, 0.5, 5)));
            //     //make func for this
            //     props.player.stats.happiness = limit(0, 1, props.player.stats.happiness + (weightedRandom(0.1, 0.5, 5)))
            //     healthSystems.refresh(props.player);
            //     stats.refresh(props.player);
            // };
        },

        init_button: (y1, y2, label) => {
            let newButton = new createjs.Shape();
            _.holder_controls.addChild(newButton);

            newButton.graphics.setStrokeStyle(2).beginStroke('#9a9a9a').beginFill('#d9d9d9').drawRect(0, 0, 50, 25);
            newButton.x = -25;
            newButton.y = y1;

            newButton.label = new createjs.Text();
            _.holder_controls.addChild(newButton.label);
            newButton.label.text = label;
            newButton.label.x = -20;
            newButton.label.y = y2;

            newButton.showHide = (onOff) => {
                newButton.visible = onOff;
                newButton.mouseEnabled = onOff;
            };

            newButton.enableButton = (onOff) => {
                newButton.alpha = .25 + (.75 * onOff);
                newButton.label.alpha = onOff;
                newButton.mouseEnabled = onOff;
            };

            newButton.enableButton(false);

            newButton.buttonFunc = function(){};

            newButton.on('mousedown', function(){
                newButton.alpha = .5
                if(props.person_box){
                    viewBox.person.destroy();
                }
                newButton.buttonFunc();
            });

            newButton.on('pressup', function(){
                newButton.alpha = 1
            });

            props.buttons.push(newButton);

            return newButton
        },

        defaultPerson: () => {
            props.buttons[0].enableButton(false);
            props.buttons[0].showHide(false);

            props.buttons[1].enableButton(true);
            props.buttons[1].showHide(true);

            for(let i = 2; i <= props.buttons.length - 1; i++){
                let button = props.buttons[i];
                button.enableButton(true);
            };
        },
    },
};