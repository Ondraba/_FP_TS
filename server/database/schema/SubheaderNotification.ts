import {Document, model, Model, Schema} from 'mongoose';

export interface SubheaderNotificationLinkDocument extends Document {
    name: string;
    url: string;
    icon: string;
    external: boolean;
    order: number;
}

export const SubheaderNotificationLinkSchema = new Schema({
    name: {
        type: String,
        required: 'You must enter name',
    },
    url: {
        type: String,
        required: 'You must enter url',
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

export interface SubheaderNotificationDocument extends Document {
    text: string;
    links?: SubheaderNotificationLinkDocument[] | null;
}

export const SubheaderNotificationSchema = new Schema({
    text: {
        type: String,
        required: 'You must enter text',
    },
    links: {
        type: [SubheaderNotificationLinkSchema],
    },
});

export const SubheaderNotificationModel: Model<SubheaderNotificationDocument> = model<SubheaderNotificationDocument>(
    'SubheaderNotification',
    SubheaderNotificationSchema,
);
