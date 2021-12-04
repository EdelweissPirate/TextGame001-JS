const lifeEvents = {
    general: {
        blank:  {
            logContent: () => {
                let output = ' ';

                return output
            },
        },

        ageUp:  {
            logContent: () => {
                let output;
                let eventVariable = 'ageUp';

                // var emoji = String.fromCodePoint(0x1F621)
                switch (eventVariable) {
                    case 'ageUp':
                        output = boldString('AGE: ' + props.player.age + '\n');
                        break;
                };

                return output
            },
        },

        damaged: {
            logContent: (partDamaged, damageExtent) => {
                //todo not working because of passing arguments
                let output;
                let partName = partDamaged.name;

                output = "You're " + partName + 'has ' + damageExtent +  '!';

                return output
                // switch (partDamaged.type) {
                //     case 'organ':
                        
                //         break;
                    
                //     case 'limb':
                        
                //         break;
                    
                //     case 'system':
                        
                //         break;
                
                //     default:
                //         break;
                // }
            }
        },

        born:  {
            logContent: () => {
                let output;
                let eventVariable = 'born';

                switch (eventVariable) {
                    case 'born':
                        output = 'You have been born at ' + boldString(props.player.location_city, props.player.location_city) + ', ' + capitaliseWord(props.player.location_country) + 
                        ' to parents ' + props.player.relationships.mother.name + ' ' + props.player.relationships.mother.surname + ', ' + props.player.relationships.mother.age + ', ' 
                        + 'and ' + props.player.relationships.father.name + ' ' + props.player.relationships.father.surname + ', ' + props.player.relationships.father.age + '. ' + 
                        'They named you '+ boldString(props.player.name + ' ' + props.player.surname) +  '.';

                        if(Object.keys(props.player.relationships.siblings).length > 0){
                            eventVariable = 'siblings';
                        } else {
                            eventVariable = 'inheritance';
                        };

                    case 'siblings':
                        if(eventVariable == 'siblings'){
                            let theseSiblings = Object.keys(props.player.relationships.siblings);
                            let firstSib = props.player.relationships.siblings[theseSiblings[0]];

                            output += ' You have a ' + firstSib.sibType + ' named ' + firstSib.name + ', ' + firstSib.age;

                            if(theseSiblings.length > 1){
                                for(let i = 1; i <= theseSiblings.length - 1; i++){
                                    let thisSib = props.player.relationships.siblings[theseSiblings[i]];
                                    if(i != theseSiblings.length - 1){
                                        output += ', a ';
                                    } else {
                                        output += ', and a ';
                                    };

                                    output += thisSib.sibType + ' named ' + thisSib.name + ', ' + thisSib.age;
                                };
                            };
                            output += '.'
                        };
                        eventVariable = 'inheritance';

                    case 'inheritance':
                        output += ' You inherited some money.'
                        eventVariable = 'talents';

                    case 'talents':
                        output += ' You have a natural talent for [null].';
                        return output
                };
            },
        },

        died: {
            logContent: () => {
                let output;

                output = 'You have died due to ' + props.player.causeOfDeath;
                return output
            },
        }
    },

    infant: {
        testEvent: {
            triggered: false,
            logContent: () => {
                return 'testEvent - infant'
            },
        }
    },

    child: {
        testEvent: {
            conditionsMet: false,
            triggered: false,

            conditions: () => {
                
            },
            effect: () => {
                
            },
            logContent: () => {
                return 'testEvent - child'
            },
        },
    },

    teenager: {
        testEvent: {
            triggered: false,
            logContent: () => {
                return 'testEvent - Teen'
            },
        }
    },

    adult: {
        testEvent: {
            triggered: false,
            logContent: () => {
                return 'testEvent - adult'
            },
        },
    },

    senior: {
        testEvent: {
            triggered: false,
            logContent: () => {
                return 'testEvent - senior'
            },
        }
    },

    special : {
        wunderkind:  {
            conditionsMet: false,
            triggered: false,

            conditions: () => {
                //checks stats prerequisites
                if(props.player.stats.intelligence == 1 && props.player.stats.happiness == 1 && 
                        props.player.stats.criminality == 0 && props.player.age < 12
                    ){
                    //rolls 20 sided die to see if event triggers
                    lifeEvents.special.wunderkind.conditionsMet = (randomFromRange(1, 20) >= 18);
                };

                return lifeEvents.special.wunderkind.conditionsMet
            },

            logContent: () => {
                if(lifeEvents.special.wunderkind.conditionsMet){
                    let output;

                    output = 'test - wunderkind';
                    //the government has been watching you due to your abnormally high intelligence
                    //will you go with them?
                    //starts life as working child/ intelligence agent
                    //either really exciting or really boring 
                    //never see parents again
                    //chance to be tracked down in 30's
                    //oppotunity to look them up when you are 18/ choose to leave the service
                    //gain wunderkind trait - high self esteem while young, high expectations when older (harder to build happiness/happiness modifier) so make the most of it!
                    lifeEvents.special.wunderkind.triggered = true;

                    return output
                };
            },
        },

        immortality: {
            triggered: false,

            logContent: () => {
                let output;

                output = 'You have been granted immortality but have been rendered infertile. ' + 
                'Go forth and live freely, as you try to distinguish this gift as a blessing or a curse...';

                return output
            },
        },

        replicant_truth:  {
            triggered: false,
            
            logContent: () => {
                let output;
                let eventVariable = 'discovery';

                switch (eventVariable) {
                    case 'discovery':
                        output = "You find a pristine brown envelope has been pushed under your apartment's front door during the night.";
                        //give options
                        //Will you read it?
                        //A: Read it
                        //B: Throw in trash
                        //C: Let's make a coffee first

                    case 'Read it':
                        output += "\rYou're blood runs cold as you read the bold letters at the top of the page; \r\r" + 
                        props.player.name.toUpperCase() + ' ' + props.player.surname.toUpperCase() + ': REPLICANT.';
                        return output
                    // case 'Throw in trash':
                    //     output += ' You inherited some money.'
                    //     eventVariable = 'talents';

                    // case 'Let"s make a coffee first':
                    //     output += ' You have a natural talent for [null].';
                    //     return output
                };
            },
        },
    }
};