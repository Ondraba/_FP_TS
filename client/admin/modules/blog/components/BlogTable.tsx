import * as React from 'react';
import {FormattedDate} from 'react-intl';
import {Button, IconButton, LinearProgress, Paper, Table, TableBody, TableCell, TableHead, TableRow, withStyles} from '@material-ui/core';
import {Edit as EditIcon} from '@material-ui/icons';
import {ChildDataProps, graphql} from 'react-apollo';
import {AdminQuery} from '@graphql-model';
import {AdminQueries} from '@client/admin/graphql';

interface Props {
    onClickEdit: (id: string) => void;
}

interface Response {
    admin: Pick<AdminQuery, 'blogPosts'>;
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
                        <TableCell>Key</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Published</TableCell>
                        <TableCell>Author</TableCell>
                        <TableCell />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {!admin
                        ? []
                        : admin.blogPosts.map((row) => (
                              <TableRow key={row.id}>
                                  <TableCell>{row.key}</TableCell>
                                  <TableCell>{row.title}</TableCell>
                                  <TableCell>
                                      {row.published ? <span style={{color: 'green'}}>Ano</span> : <span style={{color: 'red'}}>Ne</span>}{' '}
                                      <FormattedDate value={row.publishedDate} />
                                  </TableCell>
                                  <TableCell>{row.author}</TableCell>
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

export const BlogTable = graphql<Props, Response, unknown, ChildProps>(AdminQueries.blogPosts, {
    options: {fetchPolicy: 'cache-and-network', notifyOnNetworkStatusChange: true},
})(Component);
