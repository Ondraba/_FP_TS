import * as React from 'react';
import {Button, Grid, Typography} from '@material-ui/core';
import {WithAdminProps} from '@client/with/withAdmin';
import {PageContentTextBlockTable} from './PageContentTextBlockTable';
import {PageContentTextBlockDialog} from './PageContentTextBlockDialog';

interface State {
    isOpenDialog: boolean;
    editId?: string;
}

export class PageContentTextBlockIndexPage extends React.Component<WithAdminProps, State> {
    readonly state = {
        isOpenDialog: false,
        editId: undefined,
    };

    handleClickCreate = () => {
        this.setState({editId: undefined, isOpenDialog: true});
    };

    handleClickEdit = (id: string) => {
        this.setState({editId: id, isOpenDialog: true});
    };

    handleCloseDialog = () => {
        this.setState({isOpenDialog: false, editId: undefined});
    };

    render() {
        const {isOpenDialog, editId} = this.state;
        return (
            <>
                <Grid container spacing={16}>
                    <Grid item xs={12}>
                        <Typography variant="title">Page content block</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Button onClick={this.handleClickCreate}>Create</Button>
                    </Grid>
                    <Grid item xs={12}>
                        <PageContentTextBlockTable onClickEdit={this.handleClickEdit} />
                    </Grid>
                </Grid>
                {isOpenDialog && <PageContentTextBlockDialog open={isOpenDialog} onClose={this.handleCloseDialog} id={editId} />}
            </>
        );
    }
}
