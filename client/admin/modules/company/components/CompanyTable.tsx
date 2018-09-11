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
    admin: Pick<AdminQuery, 'companies'>;
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
                        <TableCell>Name</TableCell>
                        <TableCell>IC</TableCell>
                        <TableCell>Default</TableCell>
                        <TableCell />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {!admin
                        ? []
                        : admin.companies.map((row) => (
                              <TableRow key={row.id}>
                                  <TableCell>{row.id}</TableCell>
                                  <TableCell>{row.name}</TableCell>
                                  <TableCell>{row.ic}</TableCell>
                                  <TableCell>{row.default ? 'Ano' : 'Ne'}</TableCell>
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

export const CompanyTable = graphql<Props, Response, unknown, ChildProps>(AdminQueries.companies, {
    options: {fetchPolicy: 'cache-and-network', notifyOnNetworkStatusChange: true},
})(Component);
