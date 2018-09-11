import {ProjectInput} from '../../shared/graphql';
import {ProjectModel} from '../database/schema';

/*
const loremIpsum = 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica';

const getProjects = (): Project[] => [
    {
        id: '1',
        name: 'Alda CMS',
        subtitle: 'Open-source',
        description: loremIpsum,
        imageSrc: `${SettingsService.getURLImages()}/projects/alda.png`,
        links: [{name: 'Github', icon: 'fab fa-github', url: 'https://github.com/ApiTreeCZ', external: true, order: 1}],
        order: 1,
    },
    {
        id: '2',
        name: 'ApiTree public',
        subtitle: 'Open-source',
        description: loremIpsum,
        imageSrc: `${SettingsService.getURLImages()}/projects/eon.png`,
        links: [{name: 'Github', icon: 'fab fa-github', url: 'https://github.com/ApiTreeCZ', external: true, order: 2}],
        order: 2,
    },
    {
        id: '3',
        name: 'Neco neco',
        subtitle: 'Open-source',
        description: loremIpsum,
        imageSrc: `${SettingsService.getURLImages()}/projects/iconic.png`,
        links: [{name: 'Github', icon: 'fab fa-github', url: 'https://github.com/ApiTreeCZ', external: true, order: 3}],
        order: 3,
    },
];
*/

export const ProjectService = {
    findAll: async () => await ProjectModel.find().sort('order'),
    findById: (id: string) => ProjectModel.findById(id),
    create: (input: ProjectInput) => new ProjectModel(input).save(),
    save: (id: string, input: ProjectInput) => ProjectModel.findByIdAndUpdate(id, input),
};
