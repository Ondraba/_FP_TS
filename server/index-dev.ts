import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as jwt from 'jsonwebtoken';
import {Database} from './database';
import {createApolloServer} from './graphql';
import {AdminService} from './services/AdminService';

// tslint:disable-next-line
require('dotenv').config();

const {SECRET} = process.env;
if (!SECRET) {
    throw new Error('Enviroment value "SECRET" is not set. In local development, you must create .env file and set "SECRET"');
}

const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));

server.post('/authenticate', async (req, res) => {
    // FIXME - doplnit kontrolu pres databazi...
    try {
        if (!req.body || !req.body.login || !req.body.password) {
            throw new Error('No credentials send (login, password)');
        }
        const {login, password} = req.body;
        const user = await AdminService.login(login, password);
        if (!user) {
            throw new Error('Bad credentials');
        }
        const clientToken = jwt.sign({id: user.id, login, xsrfToken: 'xsrfToken'}, SECRET, {expiresIn: 1000000});
        const expiresDate = new Date();
        expiresDate.setTime(expiresDate.getTime() + 1000000);
        res.status(200).json({success: true, token: clientToken, expiresIn: expiresDate.getTime()});
    } catch (err) {
        res.status(401).json({error: err.message});
    }
});

createApolloServer(SECRET, {introspection: true, playground: true}).applyMiddleware({app: server});

const PORT = 8080;
server.listen(PORT, async (err: Error) => {
    await Database.start();
    if (err) {
        throw err;
    }
    // tslint:disable-next-line
    console.log(`Server is ready on PORT=${PORT}`);
});
