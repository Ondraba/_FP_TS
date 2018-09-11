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
    admin: Pick<AdminQuery, 'persons'>;
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
                        <TableCell>Position</TableCell>
                        <TableCell>Home / Our / Training</TableCell>
                        <TableCell />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {!admin
                        ? []
                        : admin.persons.map((row) => (
                              <TableRow key={row.id}>
                                  <TableCell>{row.id}</TableCell>
                                  <TableCell>{row.order}</TableCell>
                                  <TableCell>
                                      <img src={row.fullImageSrc} style={{width: 40}} />
                                  </TableCell>
                                  <TableCell>
                                      {row.firstName} {row.lastName}
                                  </TableCell>
                                  <TableCell>{row.position}</TableCell>
                                  <TableCell>
                                      {row.homeReference ? 'Ano' : 'Ne'} / {row.our ? 'Ano' : 'Ne'} / {row.trainingReference ? 'Ano' : 'Ne'}
                                  </TableCell>
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

export const PersonTable = graphql<Props, Response, unknown, ChildProps>(AdminQueries.persons, {
    options: {fetchPolicy: 'cache-and-network', notifyOnNetworkStatusChange: true},
})(Component);
