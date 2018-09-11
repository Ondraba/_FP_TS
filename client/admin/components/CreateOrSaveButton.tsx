import * as React from 'react';
import {Button, withStyles} from '@material-ui/core';
import {ButtonProps} from '@material-ui/core/Button';

interface Props extends ButtonProps {
    create: boolean;
}

const decorate = withStyles(() => ({}));

export const CreateOrSaveButton = decorate<Props>(({create, ...props}) => (
    <Button color="primary" {...props}>
        {create ? 'Create' : 'Save'}
    </Button>
));
