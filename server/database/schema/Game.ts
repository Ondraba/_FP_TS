import {Document, model, Model, Schema} from 'mongoose';

export interface IGame {
    title: string;
    perex: string;
    ranking: number;
    platform: string;
}

export interface GameDocument extends IGame, Document {}

export const GameSchema = new Schema({
    title: {
        type: String,
        required: 'You must enter title',
    },
   perex: {
        type: String,
        required: 'You must enter perex',
    },
    ranking: {
        type: Number,
        required: 'You must enter ranking',
    },
    platform: {
        type: String,
        required: 'You must enter platform',
    }
});

export const GameModel: Model<GameDocument> = model<GameDocument>('Game', GameSchema);
