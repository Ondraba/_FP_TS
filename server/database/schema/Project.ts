import {Document, model, Model, Schema} from 'mongoose';
import {SettingsService} from '../../services';

export interface ProjectLinkDocument extends Document {
    name: string;
    icon: string;
    url: string;
    external: boolean;
    order: number;
}

export const ProjectLinkSchema = new Schema({
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

export interface ProjectDocument extends Document {
    name: string;
    subtitle: string;
    description: string;
    imageSrc: string;
    fullImageSrc: string;
    links?: ProjectLinkDocument[] | null;
    order: number;
}

export const ProjectSchema = new Schema({
    name: {
        type: String,
        required: 'You must enter name',
    },
    subtitle: {
        type: String,
        required: 'You must enter url',
    },
    description: {
        type: String,
        required: 'You must enter icon',
    },
    imageSrc: {
        type: String,
        required: 'You must enter imageSrc',
    },
    links: {
        type: [ProjectLinkSchema],
    },
    order: {
        type: Number,
        required: 'You must enter order',
    },
});

// tslint:disable-next-line
ProjectSchema.virtual('fullImageSrc').get(function(this: ProjectDocument) {
    return `${SettingsService.getURLImages()}${this.imageSrc}`;
});

export const ProjectModel: Model<ProjectDocument> = model<ProjectDocument>('Project', ProjectSchema);
