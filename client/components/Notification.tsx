import * as React from 'react';
import {Fragment} from 'react';
import {Button, Grid, Theme, Typography, withStyles} from '@material-ui/core';
import {fade} from '@material-ui/core/styles/colorManipulator';
import Link from 'next/link';
import {SubheaderNotification} from '@graphql-model';

interface Props {
    data: SubheaderNotification;
}

const decorate = withStyles((theme: Theme) => ({
    root: {
        width: '100%',
        position: 'absolute' as any,
        left: 0,
        bottom: 0,
        backgroundColor: fade(theme.palette.primary.main, 0.8),
        padding: 24,
    },

    text: {
        color: theme.palette.common.white,
    },

    button: {
        color: theme.palette.common.white,
        borderColor: theme.palette.common.white,
    },
}));

const ButtonLink = (url: string, external: boolean) => (props) => (
    <Link href={external ? url : {pathname: '/', query: {id: url.substring(1)}}} as={external ? undefined : url}>
        <a {...props} target={external ? '_blank' : ''}>
            {props.children}
        </a>
    </Link>
);

export const Notification = decorate<Props>(({classes, data: {links, text}}) => (
    <Grid container>
        <Grid item xs={12} className={classes.root}>
            <Grid container direction="row" justify="center" alignItems="center" spacing={40}>
                <Grid item>
                    <Typography className={classes.text}>{text}</Typography>
                </Grid>
                <Grid item>
                    {links &&
                        links.map((btn) => (
                            <Fragment key={btn.name}>
                                &nbsp;&nbsp;
                                <Button variant="outlined" className={classes.button} component={ButtonLink(btn.url, btn.external)}>
                                    {btn.name}
                                </Button>
                            </Fragment>
                        ))}
                </Grid>
            </Grid>
        </Grid>
    </Grid>
));
