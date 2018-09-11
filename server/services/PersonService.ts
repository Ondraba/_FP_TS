import {PersonInput} from '../../shared/graphql';
import {PersonModel} from '../database/schema';

/*
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
const loremIpsum =
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi alias iusto nisi quidem cupiditate dignissimos maiores libero aut laboriosam iure.';

const ourPeople: Array<Omit<Person, 'imageSrc'>> = [
    {
        id: '1',
        firstName: 'Ales',
        lastName: 'Dostal',
        position: 'CEO / Founder',
        description: loremIpsum,
        phone: '+420 607 665 681',
        email: 'a.dostal@apitree.cz',
        links: [
            {name: 'Facebook', url: 'https://www.facebook.com/a.dostal81', icon: 'fab fa-facebook-f', external: true},
            {name: 'LinkedIn', url: 'https://www.linkedin.com/in/ale%C5%A1-dost%C3%A1l-4892279b/', icon: 'fab fa-linkedin-in', external: true},
        ],
        our: true,
        homeReference: false,
        trainingReference: false,
    },
    {
        id: '2',
        firstName: 'Simona',
        lastName: 'Dostalova',
        position: 'HR',
        description: loremIpsum,
        our: true,
        homeReference: false,
        trainingReference: false,
    },
    {
        id: '3',
        firstName: 'Ales',
        lastName: 'Kalfas',
        position: 'Development',
        description: loremIpsum,
        our: true,
        homeReference: false,
        trainingReference: false,
    },
    {
        id: '4',
        firstName: 'Sarka',
        lastName: 'Sindelarova',
        position: 'Development',
        description: loremIpsum,
        our: true,
        homeReference: false,
        trainingReference: false,
    },
    {
        id: '5',
        firstName: 'Roman',
        lastName: 'Krejci',
        position: 'Development',
        description: loremIpsum,
        our: true,
        homeReference: false,
        trainingReference: false,
    },
    {
        id: '6',
        firstName: 'Michal',
        lastName: 'Kara',
        position: 'Development',
        description: loremIpsum,
        our: true,
        homeReference: false,
        trainingReference: false,
    },
    {
        id: '7',
        firstName: 'Jakub',
        lastName: 'Zuscak',
        position: 'Development',
        description: loremIpsum,
        our: true,
        homeReference: false,
        trainingReference: false,
    },
    {
        id: '8',
        firstName: 'Honza',
        lastName: 'Bejvl',
        position: 'Development',
        description: loremIpsum,
        our: true,
        homeReference: false,
        trainingReference: false,
    },
    {
        id: '9',
        firstName: 'Ondra',
        lastName: 'Basista',
        position: 'Development',
        description: loremIpsum,
        our: true,
        homeReference: false,
        trainingReference: false,
    },
];

const loremIpsumTraining =
    'Your products, all the kits that I have downloaded from your site and worked with are sooo cool! I love the color mixtures, cards... everything. Keep up the great work!';

const trainingReferences: Array<Omit<Person, 'imageSrc'>> = [
    {
        id: '11',
        firstName: 'Martin',
        lastName: 'Novacek',
        position: 'Developer / ApiTree',
        description: loremIpsumTraining,
        our: false,
        homeReference: false,
        trainingReference: true,
    },
    {
        id: '12',
        firstName: 'Petr',
        lastName: 'Novotny',
        position: 'CEO / Firma ABC',
        description: loremIpsumTraining,
        our: false,
        homeReference: false,
        trainingReference: true,
    },
    {
        id: '13',
        firstName: 'Tomas',
        lastName: 'Petrovsky',
        position: 'Developer / Firma C',
        description: loremIpsumTraining,
        our: false,
        homeReference: false,
        trainingReference: true,
    },
    {
        id: '14',
        firstName: 'Tadeas',
        lastName: 'Novy',
        position: 'Manager / Firma XY',
        description: loremIpsumTraining,
        our: false,
        homeReference: false,
        trainingReference: true,
    },
];
*/

export const PersonService = {
    create: async (input: PersonInput) => {
        const model = new PersonModel(input);
        return await model.save();
    },

    save: async (id: string, input: PersonInput) => {
        return await PersonModel.findByIdAndUpdate(id, input);
    },

    findAll: async () => {
        return await PersonModel.find().sort('order');
    },

    findAllOurPeople: async () => {
        return await PersonModel.find({our: true}).sort('order');
    },

    findAllHomeReferences: async () => {
        return await PersonModel.find({homeReference: true}).sort('order');
    },

    findAllTrainingReferences: async () => {
        return await PersonModel.find({trainingReference: true}).sort('order');
    },

    findById: async (id: string) => PersonModel.findById(id),
};
