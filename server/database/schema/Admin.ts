import {Document, model, Model, Schema} from 'mongoose';

export interface AdminDocument extends Document {
    login: string;
    firstName: string;
    lastName: string;
    password: string;
}

export const AdminSchema = new Schema({
    login: {
        type: String,
        required: 'You must enter login',
    },
    firstName: {
        type: String,
        required: 'You must enter firstName',
    },
    lastName: {
        type: String,
        required: 'You must enter lastName',
    },
    password: {
        type: String,
        required: 'You must enter password',
    },
});

export const AdminModel: Model<AdminDocument> = model<AdminDocument>('Admin', AdminSchema);
