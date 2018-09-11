import * as React from 'react';
import {Theme, Typography, withStyles} from '@material-ui/core';

interface Props {
    items: string[];
}

const decorate = withStyles((theme: Theme) => ({
    root: {
        margin: 0,
        listStyleType: 'square',
    },

    item: {
        color: theme.palette.primary.main,
        marginTop: theme.spacing.unit / 2,
    },
}));

export const List = decorate<Props>(({classes, items}) => (
    <ul className={classes.root}>
        {items.map((row) => (
            <li key={row} className={classes.item}>
                <Typography variant="body2">{row}</Typography>
            </li>
        ))}
    </ul>
));
