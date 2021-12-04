var props = {
    library: null,

    player: null,

    buttons: [],

    info_boxes: [],
    person_box: null,
    lifeLog_box: null,
    stats_box: null,
    bio_box: null,
    healthSystems_box: null,
    organs_box: null,
    limbs_box: null,
    family_box: null,
    school_box: null,

    people: [],
    peopleCount: 0,
    people_special: [],

    speciesCount: 3,

    species: {
        human: {
            peakFertility: 21,
            menopause: 51,
            ageOfDecline: 55,
            seniorAge: 65,
            average_lifespan: 82,
            natural_lifespan: 122,
            lifeStages: [
                'infant',
                'child',
                'teenager',
                'adult',
                'senior',
            ],
            lifeStageAges: [
                0,
                6,
                13,
                18,
                65
            ],
            limbMap: [
                'head',
                'left_ear',
                'right_ear',
                'nose',
                'jaw',
                'left_shoulder',
                'left_forearm',
                'left_hand',
                'right_shoulder',
                'right_forearm',
                'right_hand',
                'left_thigh',
                'left_knee',
                'left_calf',
                'left_foot',
                'right_thigh',
                'right_knee',
                'right_calf',
                'right_foot',
            ],
            organMap: [
                'brain',
                'left_eye',
                'right_eye',
                'lips',
                'tongue',
                'teeth',
                'left_breast',
                'right_breast',
                'heart',
                'left_lung',
                'right_lung',
                'stomach',
                'liver',
                'left_kidney',
                'right_kidney',
                'genitals',
                'skin',
                'hair',
                'beard',
            ],
            nationality: [
                'welsh', 
                'english', 
                'scottish'
            ],
            race: [
                'caucasian', 
                'african', 
                'mid_asian', 
                'east_asian',
            ],
            surname: {
                welsh: [
                    'Evans',
                    'Jones',
                    'Williams'
                ],
                english: [
                    'Smith',
                    'Brown',
                    'Johnson'
                ],
                scottish: [
                    'Thomson',
                    'Wilson',
                    'Stewart'
                ],
            },
            gender: {
                male: {
                    title: [
                        'Master', 
                        'Mr', 
                        'Lord', 
                        'King', 
                        'Baron', 
                        'Duke'
                    ],
                    name: {
                        welsh: {
                            caucasian: [
                                'Iwan',
                                'Dafydd',
                                'Gwyn'
                            ],
                            african: [
                                'Iwan',
                                'Dafydd',
                                'Gwyn'
                            ],
                            mid_asian: [
                                'Iwan',
                                'Dafydd',
                                'Gwyn'
                            ],
                            east_asian: [
                                'Iwan',
                                'Dafydd',
                                'Gwyn'
                            ],
                        },
                        english: {
                            caucasian: [
                                'John',
                                'George',
                                'Robert'
                            ],
                            african: [
                                'John',
                                'George',
                                'Robert'
                            ],
                            mid_asian: [
                                'John',
                                'George',
                                'Robert'
                            ],
                            east_asian: [
                                'John',
                                'George',
                                'Robert'
                            ],
                        },
                        scottish: {
                            caucasian: [
                                'Ainsley',
                                'Evan',
                                'Finley'
                            ],
                            african: [
                                'Ainsley',
                                'Evan',
                                'Finley'
                            ],
                            mid_asian: [
                                'Ainsley',
                                'Evan',
                                'Finley'
                            ],
                            east_asian: [
                                'Ainsley',
                                'Evan',
                                'Finley'
                            ],
                        },
                    },
                },
                female: {
                    title: [
                        'Miss',
                        'Mrs',  
                        'Ms',  
                        'Lady', 
                        'Queen', 
                        'Baroness', 
                        'Duchess'
                    ],
                    name: {
                        welsh: {
                            caucasian: [
                                'Sian',
                                'Bronwen',
                                'Enfys'
                            ],
                            african: [
                                'Imani',
                                'Kalisha',
                                'Makeba'
                            ],
                            mid_asian: [
                                'Sian',
                                'Bronwen',
                                'Enfys'
                            ],
                            east_asian: [
                                'Sian',
                                'Bronwen',
                                'Enfys'
                            ],
                        },
                        english: {
                            caucasian: [
                                'Rose',
                                'Bessie',
                                'Kate'
                            ],
                            african: [
                                'Rose',
                                'Bessie',
                                'Kate'
                            ],
                            mid_asian: [
                                'Rose',
                                'Bessie',
                                'Kate'
                            ],
                            east_asian: [
                                'Rose',
                                'Bessie',
                                'Kate'
                            ],
                        },
                        scottish: {
                            caucasian: [
                                'Isla',
                                'Freya',
                                'Ava'
                            ],
                            african: [
                                'Isla',
                                'Freya',
                                'Ava'
                            ],
                            mid_asian: [
                                'Isla',
                                'Freya',
                                'Ava'
                            ],
                            east_asian: [
                                'Isla',
                                'Freya',
                                'Ava'
                            ],
                        },
                    },
                }
            },
        },
        // alien: {
        //     natural_lifespan: 425,
        //     menopause: 225,
        //     nationality: [
        //         'jupiter', 
        //         'mars', 
        //         'moon'
        //     ],
        //     race: [
        //         'jupiter', 
        //         'mars', 
        //         'moon',
        //     ],
        //     surname: {
        //         jupiter: [
        //             'Jupiter',
        //         ],
        //         martian: [
        //             'Mars',
        //         ],
        //         the_moon: [
        //             'Moon',
        //         ],
        //     },
        //     gender: {
        //         male: {
        //             title: [
        //                 'Mr', 
        //                 'Master', 
        //                 'Lord', 'King', 
        //                 'Baron', 
        //                 'Duke'
        //             ],
        //             name: {
        //                 jupiter: [
        //                     'Julian',
        //                     'Joseph',
        //                     'Jupitero'
        //                 ],
        //                 martian: [
        //                     'Mars',
        //                     'Marty',
        //                     'Marses'
        //                 ],
        //                 the_moon: [
        //                     'Moony',
        //                     'Moonface',
        //                     'Luna'
        //                 ],
        //             },
        //         },
        //         female: {
        //             title: [
        //                 'Mrs', 
        //                 'Miss', 
        //                 'Ms',  
        //                 'Lady', 
        //                 'Queen', 
        //                 'Baroness', 
        //                 'Duchess'
        //             ],
        //             name: {
        //                 jupiter: [
        //                     'Juliet',
        //                     'Jackie',
        //                     'Jan'
        //                 ],
        //                 martian: [
        //                     'Marissa',
        //                     'Molly',
        //                     'Maggie'
        //                 ],
        //                 the_moon: [
        //                     'Moona',
        //                     'Moonaline',
        //                     'Luna'
        //                 ],
        //             },
        //         }
        //     },
        // },
        // cyborg: {
        //     natural_lifespan: 2000,
        //     menopause: 2000,
        //     nationality: [
        //         'google', 
        //         'amazon',
        //         'apple', 
        //         'sony', 
        //         'casio'
        //     ],
        //     race: [
        //         'google',
        //         'amazon',
        //         'apple', 
        //         'sony', 
        //         'casio'
        //     ],
        //     surname: {
        //         google: [
        //             'Model X',
        //             '3000',
        //             'Z',
        //             'Pro',
        //         ],
        //         apple: [
        //             'Model X',
        //             '3000',
        //             'Z',
        //             'Pro',
        //         ],
        //         sony: [
        //             'Model X',
        //             '3000',
        //             'Z',
        //             'Pro',
        //         ],
        //         casio: [
        //             'Model X',
        //             '3000',
        //             'Z',
        //             'Pro',
        //         ],
        //     },
        //     gender: {
        //         male: {
        //             title: ['The'],
        //             name: {
        //                 google: [
        //                     'Bender',
        //                     'Clamps',
        //                     'Crusher',
        //                     'Pleasuretron'
        //                 ],
        //                 apple: [
        //                     'Bender',
        //                     'Clamps',
        //                     'Crusher',
        //                     'Pleasuretron'
        //                 ],
        //                 sony: [
        //                     'Bender',
        //                     'Clamps',
        //                     'Crusher',
        //                     'Pleasuretron'
        //                 ],
        //                 casio: [
        //                     'Bender',
        //                     'Clamps',
        //                     'Crusher',
        //                     'Pleasuretron'
        //                 ],
        //             },
                    
        //         },
        //         female: {
        //             title: ['The'],
        //             name: {
        //                 google: [
        //                     'Bender',
        //                     'Clamps',
        //                     'Crusher',
        //                     'Pleasuretron'
        //                 ],
        //                 apple: [
        //                     'Bender',
        //                     'Clamps',
        //                     'Crusher',
        //                     'Pleasuretron'
        //                 ],
        //                 sony: [
        //                     'Bender',
        //                     'Clamps',
        //                     'Crusher',
        //                     'Pleasuretron'
        //                 ],
        //                 casio: [
        //                     'Bender',
        //                     'Clamps',
        //                     'Crusher',
        //                     'Pleasuretron'
        //                 ],
        //             },
        //         },
        //     },
        // },
    },

    countries: [// placeholder; initialise each country, then add regions and THEN add cities. Alien planets just have one city, add them manually
        'UK', 
        // 'jupiter', //chinese
        // 'mars', //american
        // 'the_moon'//russian
    ],
    locations: {
        UK: {
            wales: [
                'Cardiff',
                'Swansea',
                'Merthyr Tydfil'
            ],
            england: [
                'London',
                'Liverpool',
                'Bristol'
            ],
            scotland: [
                'Glasgow',
                'Fife',
                'Edinburgh'
            ],
        },
        // jupiter: {
        //     europa: [
        //         'Human City XII',
        //     ],
        //     io: [
        //         'Federation City I',
        //     ],
        //     callisto: [
        //         'Human City VIII',
        //     ],
        // },
        // mars: {
        //     isidis_basin: [
        //         'Human City III',
        //     ],
        //     elysium_mons: [
        //         'Federation City I',
        //     ],
        // },
        // the_moon: {
        //     copernicus: [
        //         'Human City IV',
        //     ],
        //     mare_crisium: [
        //         'Federation City I',
        //     ],
        //     callisto: [
        //         'Human City X',
        //     ],
        // }
    },
};

function onEnterFrame() {

};

document.ready(function(){
    init_();
    init_touch();
    init_library();

    controls.init();

    lifeLog.init();
    viewBox.init();
    
    people.init();
});

