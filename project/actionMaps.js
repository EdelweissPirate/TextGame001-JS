const actionMaps = {
    parent: {},

    siblings: {},
    
    extended: {},
    
    friends: {},
    
    enemies: {},
    
    lovers: {},
    
    offspring: {},

    ex_lovers: {},

    classmates: {
        ingratiate: {
            do: () => {
                actions.ingratiate();
            },
        },
        antagonise: {
            do: () => {
                actions.antagonise();
            },
        },
        befriend: {
            do: () => {
                actions.befriend();
            },
        },
        flirt: {
            do: () => {
                actions.flirt();
            },
        },
        converse: {
            do: () => {
                actions.converse();
            },
        },
        ask_to_tutor: {
            do: () => {
                actions.ask_to_tutor();
            },
        },
        give_money: {
            do: () => {
                actions.give_money();
            },
        },
        bully: {
            do: () => {
                actions.bully();
            },
        },
    },

    teachers: {
        ingratiate: {
            do: () => {
                actions.ingratiate();
            },
        },
        antagonise: {
            do: () => {
                actions.antagonise();
            },
        },
        befriend: {
            do: () => {
                actions.befriend();
            },
        },
        converse: {
            do: () => {
                actions.converse();
            },
        },
        suck_up: {
            do: () => {
                actions.suck_up();
            },
        },
    },
    coworkers: {},
    business_associates: {},
    business_partners: {},
    late_relations: {},
};