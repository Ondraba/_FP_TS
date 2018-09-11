import {Document, Schema} from 'mongoose';

export interface RichTextDocument extends Document {
    blocks: RichTextBlockDocument[];
}

interface RichTextBlockDocument extends Document {
    key: string;
    text: string;
    type: string;
    depth: number;
    inlineStyleRanges: RichTextInlineStyleRange[];
    entityRanges: RichTextEntityRangeDocument[];
    data: RichTextDataDocument;
}

interface RichTextInlineStyleRange extends Document {
    offset: number;
    length: number;
    style: string;
}

interface RichTextEntityRangeDocument extends Document {
    offset: number;
    length: number;
    key: number;
}

interface RichTextDataDocument extends Document {
    id: string;
}

export const RichTextSchema = new Schema({
    blocks: [
        new Schema({
            key: {
                type: String,
            },
            text: {
                type: String,
            },
            type: {
                type: String,
            },
            depth: {
                type: Number,
            },
            inlineStyleRanges: [
                new Schema({
                    offset: {
                        type: Number,
                    },
                    length: {
                        type: Number,
                    },
                    style: {
                        type: String,
                    },
                }),
            ],
            entityRanges: [
                new Schema({
                    offset: {
                        type: Number,
                    },
                    length: {
                        type: Number,
                    },
                    key: {
                        type: Number,
                    },
                }),
            ],
            data: new Schema({
                id: {
                    type: String,
                },
            }),
        }),
    ],
});
