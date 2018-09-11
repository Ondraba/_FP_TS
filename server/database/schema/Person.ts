import {Document, model, Model, Schema} from 'mongoose';
import {SettingsService} from '../../services';

export interface PersonLinkDocument extends Document {
    name: string;
    url: string;
    icon: string;
    external: boolean;
    order: number;
}

export const PersonLinkSchema = new Schema({
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

export interface PersonDocument extends Document {
    firstName: string;
    lastName: string;
    imageSrc: string;
    fullImageSrc: string;
    position: string;
    description: string;
    our: boolean;
    homeReference: boolean;
    trainingReference: boolean;
    phone?: string | null;
    email?: string | null;
    links?: PersonLinkDocument[] | null;
}

export const PersonSchema = new Schema({
    firstName: {
        type: String,
        required: 'You must enter firstName',
    },
    lastName: {
        type: String,
        required: 'You must enter lastName',
    },
    imageSrc: {
        type: String,
        required: 'You must enter imageSrc',
    },
    position: {
        type: String,
        required: 'You must enter position',
    },
    description: {
        type: String,
        required: 'You must enter description',
    },
    our: {
        type: Boolean,
        required: 'You must enter our',
    },
    homeReference: {
        type: Boolean,
        required: 'You must enter homeReference',
    },
    trainingReference: {
        type: Boolean,
        required: 'You must enter trainingReference',
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
    },
    links: {
        type: [PersonLinkSchema],
    },
    order: {
        type: Number,
        required: 'You must enter order',
    },
});

// tslint:disable-next-line
PersonSchema.virtual('fullImageSrc').get(function(this: PersonDocument) {
    return `${SettingsService.getURLImages()}${this.imageSrc}`;
});

export const PersonModel: Model<PersonDocument> = model<PersonDocument>('Person', PersonSchema);
