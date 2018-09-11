import {PageInput} from '../../shared/graphql';
import {PageDocument, PageModel} from '../database/schema';

/*
const loremIpsum =
    'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of';

const getPages = (): Page[] =>
    [
        {
            id: '1',
            key: 'index',
            name: 'Domů',
            lastWhiteBlock: false,
            header: {
                id: '1',
                descriptions: ['Vývoj softwaru, školení, IT projekty', 'Skupina profesionálů s dlouholetými zkušenostmi'],
                imageSrc: `${SettingsService.getURLImages()}/header/header_01.jpg`,
                buttons: [
                    {id: '1', name: 'Kdo jsme?', url: '/onas', white: false, external: false, order: 1},
                    {id: '2', name: 'Co umíme?', url: '/technologie', white: false, external: false, order: 2},
                ],
            },
            subheaderNotification: SubheaderNotificationService.findById('1'),
            subheaderBlocks: [
                {id: '11', icon: 'fas fa-cloud', title: 'Vývoj aplikací v Cloudu', subtitle: loremIpsum, order: 1},
                {id: '12', icon: 'fab fa-react', title: 'JavaScript / Java', subtitle: loremIpsum, order: 2},
                {id: '13', icon: 'fas fa-users', title: 'Konzultace a školení', subtitle: loremIpsum, order: 3},
            ],
            contentBlocks: [
                {id: '11', type: PageContentType.TEXT, textBlockId: '5b79985bf604fc8f74d993cd', order: 1},
                {id: '12', type: PageContentType.HOME_REFERENCE, order: 2},
                {id: '14', type: PageContentType.TEXT, textBlockId: '5b799875f604fc8f74d993ce', order: 3},
                {id: '15', type: PageContentType.PROJECTS, order: 4},
            ],
            order: 1,
        },
        {
            id: '2',
            key: 'onas',
            name: 'O nás',
            lastWhiteBlock: true,
            header: {
                id: '2',
                descriptions: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit', 'Sed ut perspiciatis unde omnis iste natus error sit'],
                imageSrc: `${SettingsService.getURLImages()}/header/header_04.jpg`,
            },
            subheaderNotification: SubheaderNotificationService.findById('1'),
            contentBlocks: [
                {id: '22', type: PageContentType.TEXT, textBlockId: '5b79988af604fc8f74d993cf', order: 1},
                {id: '23', type: PageContentType.OUR_PEOPLE, order: 2},
            ],
            order: 2,
        },
        {
            id: '3',
            key: 'skoleni',
            name: 'Školení a konzultace',
            lastWhiteBlock: true,
            header: {
                id: '3',
                descriptions: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit', 'Sed ut perspiciatis unde omnis iste natus error sit'],
                imageSrc: `${SettingsService.getURLImages()}/header/header_02.jpg`,
            },
            subheaderNotification: SubheaderNotificationService.findById('1'),
            subheaderBlocks: [
                {id: '21', icon: 'fab fa-react', title: 'React aplikace', subtitle: loremIpsum, order: 1},
                {id: '22', icon: 'fab fa-node-js', title: 'Node.js a GraphQL', subtitle: loremIpsum, order: 2},
                {id: '23', icon: 'fab fa-docker', title: 'Docker a Kubernetes', subtitle: loremIpsum, order: 3},
            ],
            contentBlocks: [
                {id: '33', type: PageContentType.TEXT, textBlockId: '5b799f2cf604fc8f74d993d0', order: 1},
                {id: '34', type: PageContentType.TRAINING_REFERENCE, order: 2},
            ],
            order: 3,
        },
        {
            id: '4',
            key: 'pripojse',
            name: 'Připoj se k nám',
            lastWhiteBlock: false,
            header: {
                id: '4',
                descriptions: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit', 'Sed ut perspiciatis unde omnis iste natus error sit'],
                imageSrc: `${SettingsService.getURLImages()}/header/header_02.jpg`,
            },
            subheaderBlocks: [
                {id: '31', icon: 'fab fa-react', title: 'Studenti', subtitle: loremIpsum, order: 1},
                {id: '32', icon: 'fab fa-node-js', title: 'I pro začátečníky', subtitle: loremIpsum, order: 2},
                {id: '33', icon: 'fab fa-docker', title: 'Moderní technologie', subtitle: loremIpsum, order: 3},
            ],
            contentBlocks: [
                {id: '44', type: PageContentType.TEXT, textBlockId: '5b799f5ff604fc8f74d993d1', order: 1},
                {id: '45', type: PageContentType.TEXT, textBlockId: '5b799f96f604fc8f74d993d2', order: 2},
            ],
            order: 4,
        },
        {
            id: '5',
            key: 'technologie',
            name: 'Technologie',
            lastWhiteBlock: true,
            header: {
                id: '5',
                descriptions: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit', 'Sed ut perspiciatis unde omnis iste natus error sit'],
                imageSrc: `${SettingsService.getURLImages()}/header/header_02.jpg`,
            },
            subheaderNotification: SubheaderNotificationService.findById('1'),
            contentBlocks: [
                {id: '56', type: PageContentType.TEXT, textBlockId: '5b799fc1f604fc8f74d993d3', order: 1},
                {id: '57', type: PageContentType.TECHNOLOGIES, order: 2},
            ],
            order: 5,
        },
        {
            id: '6',
            key: 'kontakt',
            name: 'Kontakt',
            lastWhiteBlock: false,
            header: {
                id: '6',
                descriptions: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit', 'Sed ut perspiciatis unde omnis iste natus error sit'],
   
             imageSrc: `${SettingsService.getURLImages()}/header/header_02.jpg`,
            },
            subheaderNotification: SubheaderNotificationService.findById('2'),
            subheaderBlocks: [
                {id: '41', icon: 'fas fa-home', title: 'Adresa společnosti', subtitle: 'Francouzská 75/4 Vinohrady 120 00 Praha 2', order: 1},
                {id: '42', icon: 'far fa-envelope', title: 'Kontaktní email', subtitle: 'info@apitree.cz', order: 2},
                {id: '43', icon: 'fas fa-phone', title: 'Telefon', subtitle: '+420 607 665 681', order: 3},
            ],
            contentBlocks: [{id: '68', type: PageContentType.GOOGLE_MAP, order: 1}],
            order: 6,
        },
    ].map((p) => ({...p, url: p.key === 'index' ? '' : p.key}));
*/
const sortAll = (pages: PageDocument[]): PageDocument[] => pages.map(sort);

const sort = (page: PageDocument): PageDocument => {
    if (page.contentBlocks) {
        page.contentBlocks = page.contentBlocks.sort((a, b) => a.order - b.order);
    }
    return page;
};

export const PageService = {
    findAll: async () => {
        return sortAll(
            await PageModel.find()
                .populate('subheaderNotification')
                .populate('contentBlocks.textBlock')
                .sort('order'),
        );
    },

    findById: async (id: string) => {
        const result = await PageModel.findById(id)
            .populate('subheaderNotification')
            .populate('contentBlocks.textBlock');
        if (result) {
            return sort(result);
        }
    },

    create: (input: PageInput) => new PageModel(input).save(),
    save: (id: string, input: PageInput) => PageModel.findByIdAndUpdate(id, input),

    findByKey: async (key: string) => {
        const result = await PageModel.findOne({key})
            .populate('subheaderNotification')
            .populate('contentBlocks.textBlock');
        if (result) {
            return sort(result);
        }
    },

    findAllKeys: async (): Promise<string[]> => {
        const result = await PageModel.find()
            .select('key')
            .sort('order');
        return result.map((m) => m.key);
    },
};
