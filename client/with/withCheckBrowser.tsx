import * as React from 'react';
import bowser from 'bowser';
import Head from 'next/head';
import {Grid, Paper, Theme, Typography, withStyles} from '@material-ui/core';
import {AppFrame} from '../components';

interface InvalidBrowserProps {
    browser: any;
}

const decorate = withStyles((theme: Theme) => ({
    root: {
        padding: 16,
    },

    browsersWrapper: {
        textAlign: 'center' as 'center',
    },

    browsersLink: {
        color: theme.palette.common.black,
    },

    browsersPaper: {
        padding: '16px 32px',
        cursor: 'pointer',
    },

    browsersTitle: {
        marginBottom: 8,
    },
}));

interface BrowserDownload {
    name: string;
    url: string;
    img: string;
}

const browsersDownload: BrowserDownload[] = [
    {name: 'Chrome', url: 'https://www.google.com/chrome/', img: 'chrome'},
    {name: 'Firefox', url: 'https://www.mozilla.cz/stahnout/firefox/', img: 'firefox'},
    {name: 'Edge', url: 'https://www.microsoft.com/cs-cz/windows/microsoft-edge', img: 'edge'},
];

const InvalidBrowser = decorate<InvalidBrowserProps>(({classes, browser}) => (
    <>
        <Head>
            <title>ApiTree - Nepodporovaný prohlížeč</title>
        </Head>
        <Grid className={classes.root} container spacing={0}>
            <Grid item xs={12}>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <img src="/static/images/logo_topBar.svg" />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="display1" component="h1">
                            Nepodporovaný prohlížeč
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" color="error">
                            Milý návštěvníku. Nemůžeme ti bohužel zobrazit naší stránku, protože používáš zastaralý a nepodporovaný webový prohlížeč.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="title">Odkazy na stažení bežně používaných webových prohlížečů</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={16}>
                            {browsersDownload.map((row) => (
                                <Grid key={row.name} item className={classes.browsersWrapper}>
                                    <a href={row.url} target="_blank" className={classes.browsersLink}>
                                        <Paper className={classes.browsersPaper}>
                                            <Typography variant="title" className={classes.browsersTitle}>
                                                {row.name}
                                            </Typography>
                                            <img src={`/static/images/browsers/${row.img}.png`} />
                                        </Paper>
                                    </a>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" color="error">
                            Pokud nemáš oprávnění instalovat jiný prohlížeč, kontaktuj svého administrátora a vysvětli mu, že i ty chceš být v bezpečí a mít
                            určitý komfort.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="title">Technické údaje, které můžeš předat administrátorovi</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper>
                            <pre>{JSON.stringify(browser.techData, null, 2)}</pre>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="title">Současná statistika využití webových prohlížečů</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper>
                            <img src="/static/images/browsers/browser-stats.png" style={{width: '100%'}} />
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </>
));

const isValidBrowser = (userAgent: string): {validBrowser: boolean; techData: any} => {
    const browser = bowser.getParser(userAgent).getBrowser();
    return {validBrowser: browser.name !== 'Internet Explorer', techData: {...browser, userAgent}};
};

export const withCheckBrowser = (BaseComponent: React.ComponentType<any> & {getInitialProps?(ctx: any): Promise<any>}): React.ComponentClass<any> => {
    return class extends React.Component<any> {
        static async getInitialProps(ctx: any) {
            const userAgent = ctx.ctx.req ? ctx.ctx.req.headers['user-agent'] : navigator.userAgent;
            if (BaseComponent.getInitialProps) {
                return {
                    ...(await BaseComponent.getInitialProps(ctx)),
                    browser: isValidBrowser(userAgent),
                };
            }
        }

        render() {
            const {browser} = this.props;
            if (!browser.validBrowser) {
                return (
                    <AppFrame>
                        <InvalidBrowser browser={browser} />
                    </AppFrame>
                );
            }
            return <BaseComponent {...this.props} />;
        }
    };
};
