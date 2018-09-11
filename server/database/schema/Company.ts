import {Document, model, Model, Schema} from 'mongoose';

export interface CompanyLinkDocument extends Document {
    name: string;
    url: string;
    icon: string;
    external: boolean;
    order: number;
}

export const CompanyLinkSchema = new Schema({
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

export interface CompanyDocument extends Document {
    name: string;
    ic: string;
    dic: string;
    bankAccount: string;
    courtDescription: string;
    phone: string;
    email: string;
    address: {
        street: string;
        city: string;
        zipPostalCode: string;
    };
    links?: CompanyLinkDocument[] | null;
    default: boolean;
}

export const CompanySchema = new Schema({
    name: {
        type: String,
        required: 'You must enter name',
    },
    ic: {
        type: String,
        required: 'You must enter ic',
    },
    dic: {
        type: String,
        required: 'You must enter dic',
    },
    bankAccount: {
        type: String,
        required: 'You must enter bankAccount',
    },
    courtDescription: {
        type: String,
        required: 'You must enter courtDescription',
    },
    phone: {
        type: String,
        required: 'You must enter phone',
    },
    email: {
        type: String,
        required: 'You must enter email',
    },
    address: {
        street: {
            type: String,
            required: 'You must enter street',
        },
        city: {
            type: String,
            required: 'You must enter city',
        },
        zipPostalCode: {
            type: String,
            required: 'You must enter zipPostalCode',
        },
    },
    links: {
        type: [CompanyLinkSchema],
    },
    default: {
        type: Boolean,
        required: 'You must enter default',
    },
});

export const CompanyModel: Model<CompanyDocument> = model<CompanyDocument>('Company', CompanySchema);
