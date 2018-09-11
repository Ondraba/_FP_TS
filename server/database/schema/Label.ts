import {Document, model, Model, Schema} from 'mongoose';

export interface ILabel {
    name: string;
}

export interface LabelDocument extends ILabel, Document {}

export const LabelSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: 'You must enter name',
    },
});

export const LabelModel: Model<LabelDocument> = model<LabelDocument>('Label', LabelSchema);
