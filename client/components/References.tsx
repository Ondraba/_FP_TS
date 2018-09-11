import * as React from 'react';
import {FormattedMessage} from 'react-intl';
import * as classnames from 'classnames';
import {Avatar, Grid, Paper, Theme, Typography, withStyles} from '@material-ui/core';
import {fade} from '@material-ui/core/styles/colorManipulator';
import {Person} from '@graphql-model';
import {Lang} from '../Lang';
import {WrapperBlock} from './WrapperBlock';
import {CustomPalette} from '../styles/CustomPalette';

export interface ReferencesProps {
    title: Lang;
    persons: Person[];
    loading: boolean;
}

const decorate = withStyles(({palette: {primary, grey, common: {black}}}: Theme) => ({
    title: {
        marginBottom: 32,
    },

    paper: {
        textAlign: 'center' as 'center',
        padding: '24px 16px 72px 16px',
        position: 'relative' as 'relative',
        boxShadow: `0px 8px 10px -5px ${fade(primary.main, 0.2)}, 0px 16px 24px 2px ${fade(primary.main, 0.14)}, 0px 6px 30px 5px ${fade(primary.main, 0.12)}`,
        marginBottom: 64,
        height: 350,
    },

    description: {
        marginBottom: 24,
        fontStyle: 'italic' as 'italic',
    },

    text: {
        color: grey[600],
    },

    nameAndPosition: {
        position: 'absolute' as 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        bottom: 70,
    },

    avatar: {
        width: 120,
        height: 120,
        position: 'absolute' as 'absolute',
        bottom: -60,
        left: '50%',
        transform: 'translateX(-50%)',
        boxShadow: `0 16px 38px -12px ${fade(black, 0.56)}, 0 4px 25px 0px ${fade(black, 0.12)}, 0 8px 10px -5px ${fade(black, 0.2)}`,
    },
}));

const Quote = () => (
    <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true" style={{width: 40, height: 40, marginBottom: 24}}>
        <g>
            <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" fill={(CustomPalette.primary as any).main} />
        </g>
    </svg>
);

export const References = decorate<ReferencesProps>(({classes, loading, persons, title}) => {
    if (loading) {
        return null;
    }
    return (
        <WrapperBlock>
            <Grid container>
                <Grid item xs={12}>
                    <FormattedMessage id={title}>
                        {(msg) => (
                            <Typography variant="headline" className={classes.title} component="h3">
                                {msg}
                            </Typography>
                        )}
                    </FormattedMessage>
                </Grid>
                <Grid item xs={12}>
                    <Grid container direction="row" justify="flex-start" alignItems="center" spacing={40}>
                        {persons.map((row) => (
                            <Grid key={row.id} item xs={12} sm={12} md={6} lg={4}>
                                <Paper className={classes.paper}>
                                    <Quote />
                                    <Typography className={classnames(classes.text, classes.description)}>{row.description}</Typography>
                                    <div className={classes.nameAndPosition}>
                                        <Typography variant="title" component="p">
                                            {row.firstName} {row.lastName}
                                        </Typography>
                                        <Typography variant="caption">{row.position}</Typography>
                                    </div>
                                    <Avatar alt={`${row.firstName} ${row.lastName}`} src={row.fullImageSrc} className={classes.avatar} />
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </WrapperBlock>
    );
});
