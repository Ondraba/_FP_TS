import {ProjectInput} from '../../shared/graphql';
import {CreateInTechnologyModel} from '../database/schema';

/*
const fake = [
    {id: '1', name: 'React', icon: 'fab fa-react', url: 'https://reactjs.org/', external: true, order: 1},
    {id: '2', name: 'Node.js', icon: 'fab fa-node', url: 'https://nodejs.org/en/', external: true, order: 2},
    {id: '3', name: 'Cloud', icon: 'fas fa-cloud', url: 'https://kubernetes.io/', external: true, order: 3},
    {id: '4', name: 'Docker', icon: 'fab fa-docker', url: 'https://www.docker.com/', external: true, order: 4},
];
*/

export const CreateInTechnologyService = {
    findAll: async () => await CreateInTechnologyModel.find().sort('order'),
    findById: (id: string) => CreateInTechnologyModel.findById(id),
    create: (input: ProjectInput) => new CreateInTechnologyModel(input).save(),
    save: (id: string, input: ProjectInput) => CreateInTechnologyModel.findByIdAndUpdate(id, input),
};
