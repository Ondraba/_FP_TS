import * as React from 'react';
import {FormattedMessage} from 'react-intl';
import {Omit, Theme, Typography, withStyles} from '@material-ui/core';
import {TypographyProps} from '@material-ui/core/Typography';

interface Props extends Omit<TypographyProps, 'children'> {
    title: string;
}

const decorate = withStyles((theme: Theme) => ({
    root: {
        marginBottom: theme.spacing.unit * 2,
        color: theme.palette.common.white,
        textTransform: 'uppercase' as 'uppercase',
    },
}));

export const FooterTitle = decorate<Props>(({title, ...props}) => (
    <FormattedMessage id={title}>
        {(msg) => (
            <Typography variant="title" component="h5" {...props}>
                {msg}
            </Typography>
        )}
    </FormattedMessage>
));
