import {Document, model, Model, Schema} from 'mongoose';

export interface CreateInTechnologyDocument extends Document {
    name: string;
    icon: string;
    url: string;
    external: boolean;
    order: number;
}

export const CreateInTechnologySchema = new Schema({
    name: {
        type: String,
        required: 'You must enter name',
    },
    url: {
        type: String,
        required: 'You must enter url',
    },
    icon: {
        type: String,
        required: 'You must enter icon',
    },
    external: {
        type: Boolean,
        required: 'You must enter external',
    },
    order: {
        type: Number,
        required: 'You must enter order',
    },
});

export const CreateInTechnologyModel: Model<CreateInTechnologyDocument> = model<CreateInTechnologyDocument>('CreateInTechnology', CreateInTechnologySchema);
