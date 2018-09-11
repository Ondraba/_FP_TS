import {Document, model, Model, Schema} from 'mongoose';
import {RichTextDocument, RichTextSchema} from './RichText';

export interface PageContentTextBlockDocument extends Document {
    title: string;
    subtitle: string;
    listItems?: string[] | null;
    richText: RichTextDocument;
}

export const PageContentTextBlockSchema = new Schema({
    title: {
        type: String,
        required: 'You must enter title',
    },
    subtitle: {
        type: String,
        required: 'You must enter subtitle',
    },
    listItems: {
        type: [String],
    },
    richText: RichTextSchema,
});

export const PageContentTextBlockModel: Model<PageContentTextBlockDocument> = model<PageContentTextBlockDocument>(
    'PageContentTextBlock',
    PageContentTextBlockSchema,
);
