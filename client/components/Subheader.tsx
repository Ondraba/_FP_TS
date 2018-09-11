import * as React from 'react';
import {Grid, Theme, Typography, withStyles} from '@material-ui/core';
import * as classnames from 'classnames';
import {SubheaderBlock} from '@graphql-model';
import {WrapperBlock} from '@client/components/WrapperBlock';

interface Props {
    blocks: SubheaderBlock[];
}

const decorate = withStyles((theme: Theme) => ({
    item: {
        textAlign: 'center' as any,
    },

    icon: {
        color: theme.palette.secondary.main,
        fontSize: 46,
    },

    title: {
        marginTop: 16,
        marginBottom: 8,
    },

    block: {
        position: 'relative' as 'relative',
    },

    blockAnimate1: {
        animation: 'leftToRight 1s',
    },

    blockAnimate2: {
        animation: 'topToDown 1s',
    },

    blockAnimate3: {
        animation: 'rightToLeft 1s',
    },

    '@keyframes rightToLeft': {
        '0%': {opacity: 0, transform: 'translate(150px,0)'},
        '100%': {opacity: 1, transform: 'translate(0px,0)'},
    },
    '@keyframes topToDown': {
        '0%': {opacity: 0, transform: 'translateY(-150px)'},
        '100%': {opacity: 1, transform: 'translateY(0px)'},
    },
    '@keyframes leftToRight': {
        '0%': {opacity: 0, transform: 'translate(-150px, 0)'},
        '100%': {opacity: 1, transform: 'translate(0px, 0)'},
    },
}));

export const Subheader = decorate<Props>(({classes, blocks}) => (
    <WrapperBlock paperBackground>
        <Grid container direction="row" justify="center" alignItems="flex-start" spacing={24} className={classes.item}>
            {blocks.map(({icon, title, subtitle}, index) => (
                <Grid item xs={12} sm={4} md={4} key={title}>
                    <div
                        className={classnames(classes.block, {
                            [classes.blockAnimate1]: index === 0,
                            [classes.blockAnimate2]: index === 1,
                            [classes.blockAnimate3]: index === 2,
                        })}
                    >
                        <i className={classnames(icon, classes.icon)} />
                        <Typography variant="title" className={classes.title} component="h2">
                            {title}
                        </Typography>
                        <Typography variant="caption">{subtitle}</Typography>
                    </div>
                </Grid>
            ))}
        </Grid>
    </WrapperBlock>
));
