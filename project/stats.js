const stats = {
    init: () => {

    },

    refresh: (thisPerson) => {
        //TODO - update/degrade stats eg - small amount of happiness gained each year (can be totally negated by other factors like depression ailment or 'moody' trait)
        //then check for added traits?
        //then refresh stats again??
        stats.refreshFitness(thisPerson);
        stats.refreshBeauty(thisPerson);
        // stats.refreshCharisma(thisPerson);
        // stats.refreshStrength(thisPerson);

        //last
        stats.refreshHealth(thisPerson);
        viewBox.stats.updateEntries(thisPerson);
    },

    refreshHealth: (thisPerson) => {
        let systemsArray = thisPerson.vitals.systems; 
        let systemCount = Object.keys(thisPerson.vitals.systems).length;
        let healthSum = 0;

        // #1
        // for(sys in systemsArray){
        //     healthSum += systemsArray[sys].health;
        // };

        // healthSum += thisPerson.stats.happiness;
        // systemCount++;

        // let healthMax = healthSum/systemCount;
        // let output = limit(0, healthMax, thisPerson.stats.health);

        // thisPerson.stats.health = roundTo(output, 2);

        // #2
        for(sys in systemsArray){
            let thisSys = systemsArray[sys];
            let sysFraction;

            switch (sys) {
                case 'consciousness':
                    sysFraction = 0.146;
                    break;
                case 'movement':
                    sysFraction = 0.048;
                    break;
                case 'manipulation':
                    sysFraction = 0.048;
                    break;
                case 'cardio':
                    sysFraction = 0.222;
                    break;
                case 'talking':
                    sysFraction = 0.048; //maybe remove talking from this?
                    break;
                case 'eating':
                    sysFraction = 0.096;
                    break;
                case 'sight':
                    sysFraction = 0.024;
                    break;
                case 'hearing':
                    sysFraction = 0.024;
                    break;
                case 'breathing':
                    sysFraction = 0.146;
                    break;
                case 'metabolism':
                    sysFraction = 0.048;
                    break;

                default:
                    sysFraction = 0;
                    break;
            };

            let healthSpan = inverse_between(0, 1, thisSys.health);
            let healthSpanLimit = limit(0, 1, healthSpan);
            let sumFraction = between(0, sysFraction, healthSpanLimit);
        
            healthSum += sumFraction;
        };

        let healthSpan = inverse_between(0, 1, thisPerson.stats.happiness);
        let healthSpanLimit = limit(0, 1, healthSpan);
        let sumFraction = between(0, 0.146, healthSpanLimit);

        healthSum += sumFraction;
        systemCount++;

        let healthMax = roundTo(healthSum, 2);
        let output = limit(0, healthMax, thisPerson.stats.health);

        thisPerson.stats.health = roundTo(output, 2);
    },

    // TODO - weight other systems? 
    refreshFitness: (thisPerson) => {
        let systemsArray = [thisPerson.vitals.systems.cardio, thisPerson.vitals.systems.breathing]; 
        let systemCount = systemsArray.length;
        let fitnessSum = 0;

        for(sys in systemsArray){
            fitnessSum += systemsArray[sys].health;
        };

        // let fitnessSpan = inverse_between(0, systemCount, fitnessSum);
        // let fitnessSpanLimited = limit(0, 1, fitnessSpan);
        let fitnessMax = fitnessSum/systemCount; //between(0, 1, fitnessSpanLimited);
        let output = limit(0, fitnessMax, thisPerson.stats.fitness);

        thisPerson.stats.fitness = roundTo(output, 2);
    },

    // TODO - both funcs need to be done. Also need to programme stat degradation for each year!
    refreshBeauty: (thisPerson) => {
        let beautyArray = [thisPerson.vitals.organs.skin, thisPerson.vitals.organs.lips, thisPerson.vitals.organs.teeth, thisPerson.vitals.organs.hair];
        let beautyCount = beautyArray.length;
        let beautySum = 0;

        for(beaut in beautyArray){
            beautySum += beautyArray[beaut].health;
        };

        // let beautySpan = inverse_between(0, beautyCount, beautySum);
        // let beautySpanLimited = limit(0, 1, beautySpan);
        let beautyMax = beautySum/beautyCount; //between(0, 1, beautySpanLimited)
        let output = limit(0, beautyMax, thisPerson.stats.beauty);

        thisPerson.stats.beauty = roundTo(output, 2);
    },

    refreshCharisma: (thisPerson) => {
        let charismaArray = [thisPerson.stats.beauty, thisPerson.vitals.systems.talking.health];
        let charismaCount = charismaArray.length;
        let charismaSum = 0;

        for(cha in charismaArray){
            charismaSum += charismaArray[cha];
        };

        // let charismaSpan = inverse_between(0, charismaCount, charismaSum);
        // let charismaSpanLimited = limit(0, 1, charismaSpan);
        let charismaMax = charismaSum/charismaCount; //between(0, 1, charismaSpanLimited)
        let output = limit(0, charismaMax, thisPerson.stats.charisma);

        thisPerson.stats.charisma = roundTo(output, 2);
        // TODO - constantly decreasing. fix thisbut kinda keep it because initial calc is good!
        // console.log(thisPerson.stats.charisma, newCharisma);
        // thisPerson.stats.charisma = roundTo(thisPerson.stats.charisma * newCharisma, 2); //roundTo(newCharisma, 2);
    },

    // refreshStrength: (thisPerson) => {
    //     // let strengthArray = ;
    //     // let strengthCount = strengthArray.length;
    //     // let strengthSum = 0;

    //     // for(strng in strengthArray){
    //     //     strengthSum += strengthArray[strng];
    //     // };

    //     // let strengthSpan = inverse_between(0, strengthCount, strengthSum);
    //     // let strengthSpanLimited = limit(0, 1, strengthSpan);
    //     // let newStrength = between(0, 1, strengthSpanLimited);

    //     console.log(thisPerson.stats.strength, (thisPerson.age / 13));
    //     if(Number(thisPerson.age) < 13){
    //         thisPerson.stats.strength = roundTo(thisPerson.stats.strength * (1 * (thisPerson.age / 13)), 2);//* newStrength, 2) * (1 * (thisPerson.age / 13));
    //     } else {
    //         thisPerson.stats.strength = roundTo(thisPerson.stats.strength, 2);// * newStrength, 2);
    //     };
    // },

};