import {Document, model, Model, Schema} from 'mongoose';
import {SubheaderNotificationDocument} from './SubheaderNotification';
import {PageContentTextBlockDocument} from './PageContentTextBlock';
import {PageContentType} from '../../../shared/graphql';
import {SettingsService} from '../../services';

interface PageHeaderDescriptionDocument extends Document {
    text: string;
    order: number;
}

interface PageHeaderDocument extends Document {
    descriptions: PageHeaderDescriptionDocument[];
    imageSrc: string;
    fullImageSrc: string;
    buttons: Array<{name: string; url: string; white: boolean; external: boolean; order: number}>;
}

interface PageSubheaderBlockDocument extends Document {
    title: string;
    icon: string;
    subtitle: string;
    order: string;
}

interface PageContentBlockDocument extends Document {
    type: PageContentType;
    textBlock: string | PageContentTextBlockDocument;
    order: number;
}

export interface PageDocument extends Document {
    key: string;
    title: string;
    name: string;
    header: PageHeaderDocument;
    lastWhiteBlock: boolean;
    order: number;
    subheaderBlocks?: PageSubheaderBlockDocument[] | null;
    subheaderNotification: string | SubheaderNotificationDocument;
    contentBlocks: PageContentBlockDocument[];
}

export const PageHeaderSchema = new Schema({
    descriptions: {
        type: [
            new Schema({
                text: {
                    type: String,
                    required: 'You must enter text',
                },
                order: {
                    type: Number,
                    required: 'You must enter order',
                },
            }),
        ],
        required: 'You must enter descriptions',
    },
    imageSrc: {
        type: String,
        required: 'You must enter imageSrc',
    },
    buttons: {
        type: [
            new Schema({
                name: {
                    type: String,
                    required: 'You must enter name',
                },
                url: {
                    type: String,
                    required: 'You must enter url',
                },
                white: {
                    type: Boolean,
                    required: 'You must enter white',
                },
                external: {
                    type: Boolean,
                    required: 'You must enter external',
                },
                order: {
                    type: Number,
                    required: 'You must enter order',
                },
            }),
        ],
        required: 'You must enter buttons',
    },
});

// tslint:disable-next-line
PageHeaderSchema.virtual('fullImageSrc').get(function(this: PageHeaderDocument) {
    return `${SettingsService.getURLImages()}${this.imageSrc}`;
});

export const PageSchema = new Schema({
    key: {
        type: String,
        required: 'You must enter key',
    },
    name: {
        type: String,
        required: 'You must enter name',
    },
    title: {
        type: String,
        required: 'You must enter title',
    },
    header: {
        type: PageHeaderSchema,
        required: 'You must enter header',
    },
    subheaderBlocks: {
        type: [
            new Schema({
                title: {
                    type: String,
                    required: 'You must enter title',
                },
                icon: {
                    type: String,
                    required: 'You must enter icon',
                },
                subtitle: {
                    type: String,
                    required: 'You must enter subtitle',
                },
                order: {
                    type: Number,
                    required: 'You must enter order',
                },
            }),
        ],
    },
    subheaderNotification: {
        type: Schema.Types.ObjectId,
        ref: 'SubheaderNotification',
    },
    contentBlocks: {
        type: [
            new Schema({
                type: {
                    type: String,
                    enum: Object.values(PageContentType),
                    required: 'You must enter title',
                },
                textBlock: {
                    type: Schema.Types.ObjectId,
                    ref: 'PageContentTextBlock',
                },
                order: {
                    type: Number,
                    required: 'You must enter order',
                },
            }),
        ],
    },
    lastWhiteBlock: {
        type: Boolean,
        required: 'You must enter lastWhiteBlock',
    },
    order: {
        type: Number,
        required: 'You must enter order',
    },
});

export const PageModel: Model<PageDocument> = model<PageDocument>('Page', PageSchema);
