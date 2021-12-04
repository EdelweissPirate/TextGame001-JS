const parents = {
    create: (married) => {
        let newMother = person.create(
                null, null, 
                'human', null, null, null, 
                null, null, null,
                null, 'female', 
                null, null, null, 0, null,
                null
            );

        let newFather = person.create(
                null, null, 
                'human', null, null, null, 
                null, null, null, 
                null, 'male', 
                null, null, null, 0, null,
                null
            );

        let peakFertility = props.species[newMother.species].peakFertility;
        let motherAge = floor(weightedRandom(16, peakFertility, 1));
        let fatherAge = floor(weightedRandom(16, motherAge, 1));

        person.setAge(newMother, motherAge);
        person.setAge(newFather, fatherAge);

        person.setLifeStage(newMother, null);
        person.setLifeStage(newFather, null);

        person.setTitle(newFather, null);

        if(married){
            person.setTitle(newMother, 'Mrs');
            person.setName(newMother, newMother.name, newFather.surname);
            person.setLocation(newMother, newFather.location_country, newFather.location_city);
        } else {
            person.setTitle(newMother, null);
        };

        person.setStats(
                newMother, 
                randomFromRange(0.4, 1), randomFromRange(0.4, 1), randomFromRange(0.4, 1), randomFromRange(0.8, 1), randomFromRange(0.4, 1), 
                randomFromRange(0.4, 1), randomFromRange(0.4, 1), randomFromRange(0.4, 1), randomFromRange(0.1, 1),
                0, 0, 0, 0, 
                randomFromRange(0.4, 1)
            );

        person.setStats(
                newFather, 
                randomFromRange(0.4, 1), randomFromRange(0.4, 1), randomFromRange(0.4, 1), randomFromRange(0.8, 1), randomFromRange(0.4, 1), 
                randomFromRange(0.4, 1), randomFromRange(0.4, 1), randomFromRange(0.4, 1), randomFromRange(0.1, 1),
                0, 0, 0, 0, 
                randomFromRange(0.4, 1)
            );

        if(newMother.age > 30){
            for(let i = 0; i <= newMother.age - 30; i++){
                organs.degrade(newMother);
            };
        };
        stats.refresh(newMother);

        if(newFather.age > 30){
            for(let i = 0; i <= newFather.age - 30; i++){
                organs.degrade(newFather);
            };
        };
        stats.refresh(newFather);

        //siblings
        siblings.randomGenerate(newMother, newFather);

        return {mother: newMother, father: newFather}
    },

    calcInheritedStat: (mother, father, stat) => {
        let output = (mother.stats[stat] + father.stats[stat]) / 2; 
        return roundTo(output, 2);
    },
};