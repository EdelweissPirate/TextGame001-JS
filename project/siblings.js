const siblings = {
    createSibling: (mother, father, age) => {
        let newSibling = person.create(
            mother, father, 
            mother.species, father.species, 
            mother.nationality, father.nationality, 
            null, null, null,
            null, null, 
            null, father.surname, null, age, null,
            null
            );

        return newSibling
    },

    randomGenerate: (mother, father) => {
        let siblingCount = floor(Math.random() * 3);

        for (let i = 0; i < siblingCount; i++) {
            let siblingAge = floor(Math.random() * 6) + 1;

            let sibling = siblings.createSibling(mother, father, siblingAge);

            mother.relationships.offspring[sibling.name+'_'+sibling.surname] = sibling;
            father.relationships.offspring[sibling.name+'_'+sibling.surname] = sibling;
        };
    },
};