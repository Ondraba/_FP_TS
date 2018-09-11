import {Document, model, Model, Schema} from 'mongoose';
import {SettingsService} from '../../services';

export interface TechnologyDocument extends Document {
    name: string;
    description: string;
    imageSrc: string;
    fullImageSrc: string;
    order: number;
}

export const TechnologySchema = new Schema({
    name: {
        type: String,
        required: 'You must enter name',
    },
    description: {
        type: String,
        required: 'You must enter icon',
    },
    imageSrc: {
        type: String,
        required: 'You must enter imageSrc',
    },
    order: {
        type: Number,
        required: 'You must enter order',
    },
});

// tslint:disable-next-line
TechnologySchema.virtual('fullImageSrc').get(function(this: TechnologyDocument) {
    return `${SettingsService.getURLImages()}${this.imageSrc}`;
});

export const TechnologyModel: Model<TechnologyDocument> = model<TechnologyDocument>('Technology', TechnologySchema);
