import * as React from 'react';
import {FormattedRelative} from 'react-intl';
import Link from 'next/link';
import {Button, Grid, Paper, Typography, withStyles} from '@material-ui/core';
import {WrapperBlock} from './WrapperBlock';
import {BlogQuery} from '@graphql-model';
import {ChildDataProps, graphql} from 'react-apollo';
import {Queries} from '@client/graphql';

interface Response {
    blog: BlogQuery;
}

interface Props {}

interface ChildProps extends ChildDataProps<Props, Response> {}

const decorate = withStyles(() => ({}));

const ButtonLink = (key: string) => (props) => (
    <Link href={{pathname: '/blog/post', query: {id: key}}} as={`/blog/post/${key}`}>
        <a {...props}>{props.children}</a>
    </Link>
);

const Component = decorate<ChildProps>(({data: {loading, blog}}) => {
    if (loading || !blog) {
        return null;
    }

    return (
        <WrapperBlock>
            <Grid container spacing={16}>
                {blog.latestsPosts &&
                    blog.latestsPosts.map((post) => (
                        <Grid item xs={12} md={6} lg={4} key={post.id}>
                            <Paper style={{padding: 16}}>
                                <Typography>
                                    <strong>Title:</strong> {post.title}
                                </Typography>
                                <Typography>
                                    <strong>Author:</strong> {post.author}
                                </Typography>
                                <Typography>
                                    <strong>Published:</strong> {post.publishedDate}
                                </Typography>
                                <Typography>nebo</Typography>
                                <Typography>
                                    <strong>Published:</strong> <FormattedRelative value={post.publishedDate} />
                                </Typography>
                                <Button component={ButtonLink(post.key)}>Detail</Button>
                            </Paper>
                        </Grid>
                    ))}
            </Grid>
        </WrapperBlock>
    );
});

const withQuery = graphql<Props, Response, {}, ChildProps>(Queries.blog.posts);

export const BlogPosts = withQuery(Component);
