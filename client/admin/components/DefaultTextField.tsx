import * as React from 'react';
import {TextField, withStyles} from '@material-ui/core';
import {TextFieldProps} from '@material-ui/core/TextField';

interface Props extends TextFieldProps {}

const decorate = withStyles(() => ({}));

export const DefaultTextField = decorate<Props>((props) => <TextField fullWidth margin="dense" {...props} />);
