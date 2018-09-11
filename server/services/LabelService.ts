import {AdminMutationLabelCreateArgs, AdminMutationLabelSaveArgs, LabelAdminQueryArgs} from '../../shared/graphql';
import {LabelModel} from '../database/schema';

export const LabelService = {
    findAll: async () => await LabelModel.find().sort('name'),
    findById: ({id}: LabelAdminQueryArgs) => LabelModel.findById(id),
    create: ({input}: AdminMutationLabelCreateArgs) => new LabelModel(input).save(),
    save: ({id, input}: AdminMutationLabelSaveArgs) => LabelModel.findByIdAndUpdate(id, input),
};
