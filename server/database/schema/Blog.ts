import {Document, model, Model, Schema} from 'mongoose';
import {SettingsService} from '../../services';
import {ILabel} from './Label';

export interface IBlogPost {
    key: string;
    title: string;
    subtitle: string;
    imageSrc: string;
    fullImageSrc: string;
    published: boolean;
    publishedDate: Date;
    author: string;
    content: string;
    labels: string[] | ILabel[];
}

export interface BlogPostDocument extends IBlogPost, Document {}

export const BlogPostSchema = new Schema({
    key: {
        type: String,
        unique: true,
        required: 'You must enter key',
    },
    title: {
        type: String,
        required: 'You must enter title',
    },
    subtitle: {
        type: String,
        required: 'You must enter title',
    },
    imageSrc: {
        type: String,
        required: 'You must enter imageSrc',
    },
    published: {
        type: Boolean,
        required: 'You must enter published',
    },
    publishedDate: {
        type: Date,
        required: 'You must enter publishedDate',
    },
    author: {
        type: String,
        required: 'You must enter author',
    },
    content: {
        type: String,
        required: 'You must enter content',
    },
    labels: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Label',
        },
    ],
});

// tslint:disable-next-line
BlogPostSchema.virtual('fullImageSrc').get(function(this: BlogPostDocument) {
    return `${SettingsService.getURLImages()}${this.imageSrc}`;
});

export const BlogPostModel: Model<BlogPostDocument> = model<BlogPostDocument>('BlogPost', BlogPostSchema);
