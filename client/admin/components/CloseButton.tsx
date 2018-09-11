import * as React from 'react';
import {Button, withStyles} from '@material-ui/core';
import {ButtonProps} from '@material-ui/core/Button';

interface Props extends ButtonProps {}

const decorate = withStyles(() => ({}));

export const CloseButton = decorate<Props>((props) => <Button {...props}>Close</Button>);
