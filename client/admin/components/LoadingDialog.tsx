import * as React from 'react';
import {CircularProgress, Dialog, DialogContent, DialogTitle, withStyles} from '@material-ui/core';

interface Props {
    open: boolean;
}

const decorate = withStyles(() => ({
    content: {
        textAlign: 'center' as 'center',
    },
}));

export const LoadingDialog = decorate<Props>(({classes, open}) => (
    <Dialog open={open}>
        <DialogTitle>Loading...</DialogTitle>
        <DialogContent className={classes.content}>
            <CircularProgress size={50} />
        </DialogContent>
    </Dialog>
));
