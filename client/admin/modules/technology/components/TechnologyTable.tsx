import * as React from 'react';
import {Button, IconButton, LinearProgress, Paper, Table, TableBody, TableCell, TableHead, TableRow, withStyles} from '@material-ui/core';
import {Edit as EditIcon} from '@material-ui/icons';
import {ChildDataProps, graphql} from 'react-apollo';
import {AdminQuery} from '@graphql-model';
import {AdminQueries} from '@client/admin/graphql';

interface Props {
    onClickEdit: (id: string) => void;
}

interface Response {
    admin: Pick<AdminQuery, 'technologies'>;
}

interface ChildProps extends Props, ChildDataProps<unknown, Response> {}

const decorate = withStyles(() => ({}));

const Component = decorate<ChildProps>(({data: {loading, admin, refetch}, onClickEdit}) => {
    const handleClickRefresh = async () => {
        await refetch();
    };

    const handleClickEdit = (id: string) => () => {
        onClickEdit(id);
    };
    return (
        <Paper>
            <Button onClick={handleClickRefresh} disabled={loading}>
                Refresh
            </Button>
            {loading && <LinearProgress />}
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Order</TableCell>
                        <TableCell>Image</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {!admin
                        ? []
                        : admin.technologies.map((row) => (
                              <TableRow key={row.id}>
                                  <TableCell>{row.id}</TableCell>
                                  <TableCell>{row.order}</TableCell>
                                  <TableCell>
                                      <img src={row.fullImageSrc} style={{width: 40}} />
                                  </TableCell>
                                  <TableCell>{row.name}</TableCell>
                                  <TableCell>
                                      <IconButton onClick={handleClickEdit(row.id)}>
                                          <EditIcon />
                                      </IconButton>
                                  </TableCell>
                              </TableRow>
                          ))}
                </TableBody>
            </Table>
        </Paper>
    );
});

export const TechnologyTable = graphql<Props, Response, unknown, ChildProps>(AdminQueries.technologies, {
    options: {fetchPolicy: 'cache-and-network', notifyOnNetworkStatusChange: true},
})(Component);
