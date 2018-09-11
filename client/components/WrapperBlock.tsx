import * as React from 'react';
import * as classnames from 'classnames';
import {Grid, Theme, withStyles} from '@material-ui/core';
import {MAX_WIDTH} from '@client/components';

interface Props {
    paperBackground?: boolean;
}

const decorate = withStyles((theme: Theme) => ({
    root: {
        padding: '60px 16px',
        maxWidth: MAX_WIDTH,
    },

    colorPaper: {
        backgroundColor: theme.palette.background.paper,
    },
}));

export const WrapperBlock = decorate<Props>(({classes, children, paperBackground}) => (
    <Grid container spacing={0} direction="row" alignItems="center" justify="center" className={classnames({[classes.colorPaper]: paperBackground})}>
        <Grid item xs={10} className={classes.root}>
            {children}
        </Grid>
    </Grid>
));
