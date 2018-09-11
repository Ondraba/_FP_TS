
import {GameModel} from '../database/schema';
import {
    CreateMutationGameArgs,
} from '../../shared/graphql';


export const GameService = {
    findAllGames: async () => await GameModel.find({}),
    create: async({input}: CreateMutationGameArgs) => new GameModel(input).save(),
};
