import {PageContentTextBlock, PageContentTextBlockInput} from '../../shared/graphql';
import {PageContentTextBlockModel} from '../database/schema';

/*
const loremIpsumSubtitle = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut';
const loremIpsumText =
    'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?';

const fakeListItems = ['Rychle', 'Bezpecne', 'Dobre', 'A nejak'];

const textBlocks: PageContentTextBlock[] = [
    {id: '1', title: 'Vítejte u nás', subtitle: loremIpsumSubtitle, text: loremIpsumText},
    {id: '11', title: 'Naše projekty', subtitle: loremIpsumSubtitle, text: loremIpsumText},
    {id: '2', title: 'Kdo jsme?', subtitle: loremIpsumSubtitle, text: loremIpsumText, listItems: fakeListItems},
    {
        id: '3',
        title: 'Školení a konzultace',
        subtitle: loremIpsumSubtitle,
        text: loremIpsumText,
        listItems: ['Pro firmy i jednotlivce', 'Vhodné i pro začátečníky', 'Dobre', 'A nejak'],
    },
    {id: '4', title: 'Jaké kolegy nyní hledame?', subtitle: loremIpsumSubtitle, text: loremIpsumText, listItems: fakeListItems},
    {id: '5', title: 'Proč pracovat s námi?', subtitle: loremIpsumSubtitle, text: loremIpsumText},
    {id: '6', title: 'Využití moderních technologií', subtitle: loremIpsumSubtitle, text: loremIpsumText, listItems: fakeListItems},
];
*/

export const PageContentTextBlockService = {
    create: async (input: PageContentTextBlockInput): Promise<PageContentTextBlock> => {
        const model = new PageContentTextBlockModel(input);
        return (await model.save()) as PageContentTextBlock;
    },

    findById: async (id: string): Promise<PageContentTextBlock | null> => {
        return (await PageContentTextBlockModel.findById(id)) as PageContentTextBlock;
    },

    findAll: async (): Promise<PageContentTextBlock[]> => {
        return (await PageContentTextBlockModel.find()) as PageContentTextBlock[];
    },

    save: async (id: string, input: PageContentTextBlockInput): Promise<PageContentTextBlock | null> => {
        return (await PageContentTextBlockModel.findByIdAndUpdate(id, input)) as PageContentTextBlock;
    },
};
