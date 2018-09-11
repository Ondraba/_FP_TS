import * as React from 'react';
import {Checkbox, FormControlLabel, withStyles} from '@material-ui/core';
import {CheckboxProps} from '@material-ui/core/Checkbox';

interface Props extends CheckboxProps {
    label: string;
}

const decorate = withStyles(() => ({}));

export const DefaultCheckbox = decorate<Props>(({label, ...props}) => <FormControlLabel control={<Checkbox {...props} />} label={label} />);
