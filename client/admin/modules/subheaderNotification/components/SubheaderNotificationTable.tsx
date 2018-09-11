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
    admin: Pick<AdminQuery, 'subheaderNotifications'>;
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
                        <TableCell>Text</TableCell>
                        <TableCell />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {!admin
                        ? []
                        : admin.subheaderNotifications.map((row) => (
                              <TableRow key={row.id}>
                                  <TableCell>{row.id}</TableCell>
                                  <TableCell>{row.text}</TableCell>
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

export const SubheaderNotificationTable = graphql<Props, Response, unknown, ChildProps>(AdminQueries.subheaderNotifications, {
    options: {fetchPolicy: 'cache-and-network', notifyOnNetworkStatusChange: true},
})(Component);
