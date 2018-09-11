import * as mongoose from 'mongoose';

export const Database = {
    start: (): Promise<void> => {
        return new Promise((resolve, reject) => {
            // const {DATABASE_USER, DATABASE_PASSWORD, DATABASE_HOST, DATABASE_PORT, DATABASE_NAME} = process.env;
            // if (!DATABASE_USER || !DATABASE_PASSWORD || !DATABASE_HOST || !DATABASE_PORT || !DATABASE_NAME) {
            //     throw new Error(
            //         'Enviroment value for database connection is not set. "DATABASE_USER", "DATABASE_PASSWORD", "DATABASE_HOST", "DATABASE_PORT", "DATABASE_NAME"',
            //     );
            // }
            mongoose.connect('mongodb://archie:clovek789@ds143744.mlab.com:43744/starterdb');
            const conn = mongoose.connection;
            conn.once('open', () => {
                console.log('MONGO CONNECTED');
                resolve();
            });
            conn.on('error', (err) => {
                reject(err);
            });
        });
    },
};
