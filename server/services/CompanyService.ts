import {CompanyInput} from '../../shared/graphql';
import {CompanyModel} from '../database/schema';


const fake = {
    id: '1',
    name: 'ApiTree s.r.o.',
    ic: '06308643',
    dic: 'CZ06308643',
    bankAccount: '4885827379/0800',
    courtDescription: 'Společnost je vedená u Městského soudu v Praze pod spisovou značkou C 279944',
    phone: '+420 607 665 681',
    email: 'info@apitree.cz',
    address: {
        street: 'Francouzská 75/4 Vinohrady',
        city: 'Praha 2',
        zipPostalCode: '120 00',
    },
    default: true,
    links: [
        {id: '1', name: 'Facebook', icon: 'fab fa-facebook-f', url: 'https://www.facebook.com/ApiTree.cz/', external: true, order: 1},
        {id: '2', name: 'LinkedIn', icon: 'fab fa-linkedin-in', url: 'https://www.linkedin.com/company/apitreecz/', external: true, order: 2},
        {id: '3', name: 'Github', icon: 'fab fa-github', url: 'https://github.com/ApiTreeCZ', external: true, order: 3},
    ],
};


const remapInput = ({street, city, zipPostalCode, ...input}: CompanyInput) => {
    return {
        ...input,
        address: {
            street,
            city,
            zipPostalCode,
        },
    };
};

export const CompanyService = {
    findDefault: () => fake,
    findAll: async () => await fake,
    findById: (id: string) => CompanyModel.findById(id),
    create: (input: CompanyInput) => new CompanyModel(remapInput(input)).save(),
    save: (id: string, input: CompanyInput) => CompanyModel.findByIdAndUpdate(id, remapInput(input)),
};
