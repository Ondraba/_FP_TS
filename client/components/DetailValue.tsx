import * as React from 'react';
import {FormattedMessage} from 'react-intl';
import {Theme, Typography, withStyles} from '@material-ui/core';

interface Props {
    readonly title: string;
    readonly value: string;
}

const decorate = withStyles((theme: Theme) => ({
    root: {
        marginBottom: theme.spacing.unit,
    },
    text: {
        color: theme.palette.common.white,
    },
}));

export const DetailValue = decorate<Props>(({classes, title, value}) => (
    <div className={classes.root}>
        <Typography className={classes.text}>
            <FormattedMessage id={title}>{(msg) => <strong>{msg}:</strong>}</FormattedMessage>
            &nbsp;
            {value}
        </Typography>
    </div>
));
