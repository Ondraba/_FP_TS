import * as React from 'react';
import {Button, Grid, Typography} from '@material-ui/core';
import {WithAdminProps} from '@client/with/withAdmin';
import {TechnologyTable} from './TechnologyTable';
import {TechnologyDialog} from './TechnologyDialog';

interface State {
    isOpenDialog: boolean;
    editId?: string;
}

export class TechnologyIndexPage extends React.Component<WithAdminProps, State> {
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
                        <Typography variant="title">Technologies</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Button onClick={this.handleClickCreate}>Create</Button>
                    </Grid>
                    <Grid item xs={12}>
                        <TechnologyTable onClickEdit={this.handleClickEdit} />
                    </Grid>
                </Grid>
                {isOpenDialog && <TechnologyDialog open={isOpenDialog} onClose={this.handleCloseDialog} id={editId} />}
            </>
        );
    }
}
