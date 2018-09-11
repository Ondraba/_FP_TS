import * as React from 'react';
import {Theme, Typography, withStyles} from '@material-ui/core';

interface Props {
    readonly text: string | JSX.Element;
}

const decorate = withStyles((theme: Theme) => ({
    root: {
        color: theme.palette.common.white,
        fontSize: '32px',
        paddingRight: 4,
        fontWeight: 100 as any,
    },
}));

export const HeaderTitle = decorate<Props>(({classes, text}) => (
    <Typography component="h1" className={classes.root}>
        {text}
    </Typography>
));
