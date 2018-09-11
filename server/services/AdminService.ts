import {AdminDocument, AdminModel} from '../database/schema';
import {AdminInput, AdminSaveInput} from '../../shared/graphql';
import * as bcrypt from 'bcrypt';

const hashPassword = async (password: string) => bcrypt.hash(password, 10);

export const AdminService = {
    login: async (login: string, password): Promise<AdminDocument | null> => {
        const find = await AdminModel.findOne({login});
        if (find && (await bcrypt.compare(password, find.password))) {
            return find;
        }
        return null;
    },

    findAll: async () => {
        return await AdminModel.find();
    },

    findById: (id: string) => {
        return AdminModel.findById(id);
    },

    create: async ({password, passwordAgain, ...input}: AdminInput) => {
        if (password !== passwordAgain) {
            throw new Error('Password is not equal');
        }
        return new AdminModel({...input, password: await hashPassword(password)}).save();
    },
    save: async (id: string, {password, passwordAgain, ...input}: AdminSaveInput) => {
        if ((!!password || !!passwordAgain) && password !== passwordAgain) {
            throw new Error('Password is not equal');
        }
        return AdminModel.findByIdAndUpdate(id, password ? {...input, password: await hashPassword(password)} : input);
    },
};
