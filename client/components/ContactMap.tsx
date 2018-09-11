import * as React from 'react';
import {withStyles} from '@material-ui/core';
import {GoogleMap} from './GoogleMap';

interface Props {}

const decorate = withStyles((_) => ({}));

export const ContactMap = decorate<Props>(({}) => (
    <GoogleMap zoom={15} position={{lat: 50.0744829, lng: 14.4377882}} apiKey={'AIzaSyARHV9jrC1WQKlkyzM8CMdERzTFU5ykoLA'} />
));
