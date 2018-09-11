import * as accepts from 'accepts';
import * as express from 'express';
import {readFileSync} from 'fs';
import {sync} from 'glob';
import * as IntlPolyfill from 'intl';
import * as nextjs from 'next';
import {basename} from 'path';

import {createApolloServer} from './graphql';
import {Database} from './database';
import * as jwt from 'jsonwebtoken';
import {PageService} from './services';
import * as bodyParser from 'body-parser';
import {AdminService} from './services/AdminService';

// tslint:disable-next-line
require('dotenv').config();

Intl.NumberFormat = IntlPolyfill.NumberFormat;
Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;

const dev: boolean = process.env.NODE_ENV !== 'production';

const app = nextjs({dev});
const handle = app.getRequestHandler();

const languages = sync('./lang/*.json').map((f) => basename(f, '.json'));

// We need to expose React Intl's locale data on the request for the user's
// locale. This function will also cache the scripts by lang in memory.
const localeDataCache = new Map();
const getLocaleDataScript = (locale: string) => {
    const lang = locale.split('-')[0];
    if (!localeDataCache.has(lang)) {
        const localeDataFile = require.resolve(`react-intl/locale-data/${lang}`);
        const localeDataScript = readFileSync(localeDataFile, 'utf8');
        localeDataCache.set(lang, localeDataScript);
    }
    return localeDataCache.get(lang);
};

// We need to load and expose the translations on the request for the user's
// locale. These will only be used in production, in dev the `defaultMessage` in
// each message description in the source code will be used.
const getMessages = (locale: string) => require(`../../lang/${locale}.json`);

const withLocaleRequest = (req: any): any => {
    // When you change language other way (with browser settings is now), you must rewrite get locale from client on this code row
    const locale = accepts(req).language(languages);
    req.locale = locale;
    if (locale) {
        req.localeDataScript = getLocaleDataScript(locale);
        req.messages = getMessages(locale);
    }
    return req;
};

app.prepare()
    .then(async () => {
        const {SECRET} = process.env;
        if (!SECRET) {
            throw new Error('Enviroment value "SECRET" is not set. In local development, you must create .env file and set "SECRET"');
        }

        await Database.start();

        const server = express();

        createApolloServer(SECRET, {introspection: true}).applyMiddleware({app: server});

        server.get('/healthz', (_, res) => {
            // check my health
            // -> return next(new Error('DB is unreachable'))
            res.sendStatus(200);
        });

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

        if (!dev) {
            // server.use(
            //     '/static',
            //     express.static(__dirname + '/static', {
            //         maxAge: '14d',
            //     }),
            // );
        }

        server.get('/blog/post/:id', (req, res) => {
            return app.render(withLocaleRequest(req), res, '/blog/post', {id: req.params.id});
        });

        for (const key of await PageService.findAllKeys()) {
            server.get(`/${key}`, (req, res) => {
                if (key === 'blog') {
                    return app.render(withLocaleRequest(req), res, '/blog');
                }
                return app.render(withLocaleRequest(req), res, '/', {id: key});
            });
        }

        server.get('*', (req: any, res) => {
            return handle(withLocaleRequest(req), res);
        });

        const PORT = 3030;
        server.listen(PORT, (err: any) => {
            if (err) {
                throw err;
            }
            // tslint:disable-next-line
            console.log(`> Ready on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        // tslint:disable
        console.error('Application failed!');
        console.error(err);
        // tslint:enable
        process.exit(1);
    });
