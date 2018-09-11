import {ProjectInput} from '../../shared/graphql';
import {SubheaderNotificationModel} from '../database/schema';

/*
const fake: SubheaderNotification[] = [
    {
        id: '1',
        text: 'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born',
        buttons: [{id: '1', name: 'Připoj se k nám', url: '/pripojse', external: false, order: 1}],
    },
    {
        id: '2',
        text: 'Pokud máte zájem, můžete nás kontaktovat i pomocí sociálních sítí',
        buttons: [
            {id: '21', name: 'Facebook', url: 'https://www.facebook.com/ApiTree.cz/', external: true, order: 1},
            {id: '22', name: 'LinkedIn', url: 'https://www.linkedin.com/company/apitreecz/', external: true, order: 2},
        ],
    },
];
*/

export const SubheaderNotificationService = {
    findAll: async () => await SubheaderNotificationModel.find(),
    findById: (id: string) => SubheaderNotificationModel.findById(id),
    create: (input: ProjectInput) => new SubheaderNotificationModel(input).save(),
    save: (id: string, input: ProjectInput) => SubheaderNotificationModel.findByIdAndUpdate(id, input),
};
