const healthSystems = {
    initSystem: (owner, thisName, thisSystem, health, failed, critical) => {
        thisSystem = {
            type: 'system',
            owner: owner,
            name: thisName,
            dependants: [],
            health: health,
            max_health: 1,
            failed: failed,
            critical: critical,

            damageSystem: (damageAmount, shutdown) => {
                if(!shutdown){
                    thisSystem.health -= damageAmount;
                    // healthSystems.refresh(thisSystem.owner);
                } else {
                    thisSystem.shutdownSystem();
                };
            },

            shutdownSystem: () => {
                thisSystem.health = 0;
                thisSystem.failed = true;
                lifeLog.addEntry(thisSystem, 'failed');
                healthSystems.refresh(thisSystem.owner);
            },
        };

        return thisSystem
    },

    refresh: (thisPerson) => {
        let keys = Object.keys(thisPerson.vitals.systems);

        for(keyNum in keys){
            healthSystems.checkSystem(thisPerson.vitals.systems[keys[keyNum]]);
            if(thisPerson.vitals.systems[keys[keyNum]].health == 0 && thisPerson.vitals.systems[keys[keyNum]].critical){
                healthSystems.checkCritical(thisPerson.vitals.systems[keys[keyNum]]);
                return
            };
        };
    },

    checkSystem: (thisSystem) => {
        if(thisSystem != 'none'){
            if(thisSystem.health != 0){
                let dependantCount = thisSystem.dependants.length;
                let conditionSum = 0;
    
                for(dependant in thisSystem.dependants){
                    conditionSum += thisSystem.dependants[dependant].health;
                };
    
                let conditionSpan = inverse_between(0, dependantCount, conditionSum);
                let conditionSpanLimited = limit(0, 1, conditionSpan);
                let newCondition = between(0, 1, conditionSpanLimited)
    
                thisSystem.health = newCondition;
                if(thisSystem.owner == props.player){
                    viewBox.healthSystems.updateEntry(thisSystem.name, thisSystem.health);
                };
            } else {
                if(thisSystem.owner == props.player){
                    viewBox.healthSystems.updateEntry(thisSystem.name, thisSystem.health);
                };
                //TODO - not working because of how passing arguments
                // lifeLog.addEntry(lifeEvents.damaged(thisSystem, 'failed'));
            };
        };
    },

    checkCritical: (thisSystem) => {
        let thisPerson = thisSystem.owner;

        if(thisSystem.critical && thisSystem.health == 0){
            healthSystems.killAll(thisPerson);
        };
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
            if(thisPerson == props.player){
                viewBox.limbs.updateEntry(thisPerson.vitals.limbs[lmbs].name, thisPerson.vitals.limbs[lmbs].health);
            };
        };

        for(sys in thisPerson.vitals.systems){
            healthSystems.checkSystem(thisPerson.vitals.systems[sys])
        };
    },

    human: {
        default: (thisPerson) => {
            let keys = Object.keys(thisPerson.vitals.systems);

            for(keyNum in keys){
                let newSystem =
                    healthSystems.initSystem(
                            thisPerson, 
                            keys[keyNum], 
                            thisPerson.vitals.systems[keys[keyNum]], 
                            1, 
                            false, 
                            false
                        );
                        
                thisPerson.vitals.systems[keys[keyNum]] = newSystem;
            };

            thisPerson.vitals.systems.consciousness.critical = true;
            thisPerson.vitals.systems.cardio.critical = true;
            thisPerson.vitals.systems.breathing.critical = true;
            thisPerson.vitals.systems.metabolism.critical = true;

            thisPerson.vitals.systems.consciousness.dependants[0] = thisPerson.vitals.organs.brain;
            thisPerson.vitals.systems.consciousness.dependants[1] = thisPerson.vitals.limbs.head;

            thisPerson.vitals.systems.movement.dependants[0] = thisPerson.vitals.limbs.left_foot;
            thisPerson.vitals.systems.movement.dependants[1] = thisPerson.vitals.limbs.right_foot;
            thisPerson.vitals.systems.movement.dependants[2] = thisPerson.vitals.limbs.left_calf;
            thisPerson.vitals.systems.movement.dependants[3] = thisPerson.vitals.limbs.right_calf;
            thisPerson.vitals.systems.movement.dependants[4] = thisPerson.vitals.limbs.left_knee;
            thisPerson.vitals.systems.movement.dependants[5] = thisPerson.vitals.limbs.right_knee;
            thisPerson.vitals.systems.movement.dependants[6] = thisPerson.vitals.limbs.left_thigh;
            thisPerson.vitals.systems.movement.dependants[7] = thisPerson.vitals.limbs.right_thigh;

            thisPerson.vitals.systems.manipulation.dependants[0] = thisPerson.vitals.limbs.left_hand;
            thisPerson.vitals.systems.manipulation.dependants[1] = thisPerson.vitals.limbs.right_hand;
            thisPerson.vitals.systems.manipulation.dependants[2] = thisPerson.vitals.limbs.left_forearm;
            thisPerson.vitals.systems.manipulation.dependants[3] = thisPerson.vitals.limbs.right_forearm;
            thisPerson.vitals.systems.manipulation.dependants[4] = thisPerson.vitals.limbs.left_shoulder;
            thisPerson.vitals.systems.manipulation.dependants[5] = thisPerson.vitals.limbs.right_shoulder;

            thisPerson.vitals.systems.cardio.dependants[0] = thisPerson.vitals.organs.heart;

            // TODO - talking not being affected when damaging conciousness?
            thisPerson.vitals.systems.talking.dependants[0] = thisPerson.vitals.systems.consciousness;
            thisPerson.vitals.systems.talking.dependants[1] = thisPerson.vitals.organs.lips;
            thisPerson.vitals.systems.talking.dependants[2] = thisPerson.vitals.organs.tongue;
            
            thisPerson.vitals.systems.eating.dependants[0] = thisPerson.vitals.organs.teeth;

            thisPerson.vitals.systems.sight.dependants[0] = thisPerson.vitals.organs.left_eye;
            thisPerson.vitals.systems.sight.dependants[1] = thisPerson.vitals.organs.right_eye;

            thisPerson.vitals.systems.hearing.dependants[0] = thisPerson.vitals.limbs.left_ear;
            thisPerson.vitals.systems.hearing.dependants[1] = thisPerson.vitals.limbs.right_ear;

            thisPerson.vitals.systems.breathing.dependants[0] = thisPerson.vitals.organs.left_lung;
            thisPerson.vitals.systems.breathing.dependants[1] = thisPerson.vitals.organs.right_lung;

            thisPerson.vitals.systems.metabolism.dependants[0] = thisPerson.vitals.organs.stomach;
            thisPerson.vitals.systems.metabolism.dependants[1] = thisPerson.vitals.organs.liver;
            thisPerson.vitals.systems.metabolism.dependants[2] = thisPerson.vitals.organs.left_kidney;
            thisPerson.vitals.systems.metabolism.dependants[3] = thisPerson.vitals.organs.right_kidney;
            
            organs.assignSystems(thisPerson);
            limbs.assignSystems(thisPerson);
        },
    },

    alien: {
        default: (thisPerson) => {
            
        },
    },

    cyborg: {
        default: (thisPerson) => {
            
        },
    },
};