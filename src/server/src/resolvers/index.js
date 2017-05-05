const brewMethods = [
    {
        id: 1,
        name: 'AeroPress',
        keywords: [],
        description: 'desc',
        image: '',
        ratios: ['15:1', '16:1'],
        recipes: [],
    },
    {
        id: 2,
        name: 'Drip/Pour Over',
        keywords: [],
        description: 'desc',
        image: '',
        ratios: ['15:1'],
        recipes: [],
    },
    {
        id: 3,
        name: 'French Press',
        keywords: [],
        description: 'desc',
        image: '',
        ratios: ['16:1'],
        recipes: [],
    },
    {
        id: 4,
        name: 'Turkish Pot/Cezve',
        keywords: [],
        description: 'desc',
        image: '',
        ratios: ['16:1'],
        recipes: [],
    },
    {
        id: 5,
        name: 'Espresso',
        keywords: [],
        description: 'desc',
        image: '',
        ratios: ['16:1'],
        recipes: [],
    },
];

let nextId = brewMethods[brewMethods.length-1].id;

module.exports = {
    Query: {
        brewMethods: (name = '') => {
            if(name === '') {
                return brewMethods;
            }
            return brewMethods.find(method => method.name === name);
        },
    },
    // Mutation: {
    //     addChannel: (root, args) => {
    //         const newChannel = { id: nextId++, name: args.name };
    //         brewMethods.push(newChannel);
    //         return newChannel;
    //     },
    // }
};