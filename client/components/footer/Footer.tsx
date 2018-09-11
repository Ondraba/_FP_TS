import * as React from 'react';
import * as classnames from 'classnames';
import {Grid, Theme, withStyles} from '@material-ui/core';
import {FooterWebMap} from './FooterWebMap';
import {FooterAboutCompany} from './FooterAboutCompany';
import {FooterLogo} from './FooterLogo';
import {Page, PageQueryArgs} from '@graphql-model';
import {ChildDataProps, graphql} from 'react-apollo';
import {Queries} from '../../graphql';
import {MAX_WIDTH} from '@client/components';

interface Response {
    page: Page;
}

interface Props {
    readonly pageKey: string;
}

interface ChildProps extends ChildDataProps<Props, Response, PageQueryArgs> {}

const decorate = withStyles((theme: Theme) => ({
    root: {
        backgroundColor: theme.palette.primary.main,
        marginBottom: -64,
    },

    wrapper: {
        maxWidth: MAX_WIDTH,
    },

    container: {
        padding: '34px 20px 64px 20px',
    },

    center: {
        textAlign: 'center' as 'center',
    },

    right: {
        textAlign: 'right' as 'right',
    },

    waveContainer: {
        width: '100%',
        height: 100,
        overflow: 'hidden',
    },

    wave: {
        display: 'block',
        position: 'relative' as any,
        height: 40,
        backgroundColor: theme.palette.background.default,
        '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute' as any,
            borderRadius: '100%',
            width: '100%',
            height: '300px',
            backgroundColor: theme.palette.primary.main,
            right: '-25%',
            top: '20px',
        },
        '&:after': {
            content: '""',
            display: 'block',
            position: 'absolute' as any,
            borderRadius: '100%',
            width: '100%',
            height: '300px',
            backgroundColor: theme.palette.background.default,
            left: '-25%',
            top: '-240px',
        },
    },

    wavePaper: {
        backgroundColor: theme.palette.background.paper,
        '&:after': {
            backgroundColor: theme.palette.background.paper,
        },
    },
}));

const Component = decorate<ChildProps>(({classes, data: {loading, page}}) => {
    if (loading || !page) {
        return null;
    }

    return (
        <div className={classes.root}>
            <div className={classes.waveContainer}>
                <div className={classnames(classes.wave, {[classes.wavePaper]: page.lastWhiteBlock})} />
            </div>
            <Grid container spacing={0} direction="row" alignItems="center" justify="center" className={classes.container}>
                <Grid item xs={12} md={10} className={classes.wrapper}>
                    <Grid container spacing={24} direction="row" alignItems="flex-end" justify="center">
                        <Grid item xs={12} md={8}>
                            <Grid container>
                                <Grid item xs={12} md={6}>
                                    <FooterWebMap />
                                </Grid>
                                <Grid item xs={12} md={6} className={classes.center}>
                                    <FooterAboutCompany />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={4} className={classes.right}>
                            <FooterLogo />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
});

const withQuery = graphql<Props, Response, PageQueryArgs, ChildProps>(Queries.footer, {
    options: ({pageKey}) => ({variables: {key: pageKey}}),
});

export const Footer = withQuery(Component);
