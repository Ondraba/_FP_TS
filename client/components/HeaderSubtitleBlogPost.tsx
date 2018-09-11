import * as React from 'react';
import {Avatar, Chip, Theme, Typography, withStyles} from '@material-ui/core';
import {BlogPost} from '@graphql-model';

interface Props {
    blogPost: BlogPost;
}

const decorate = withStyles((theme: Theme) => ({
    root: {
        marginTop: 8,
    },
    subtitle: {
        color: theme.palette.grey[200],
        fontSize: '16px',
        fontWeight: 100 as any,
    },

    item: {
        color: theme.palette.primary.main,
        marginTop: theme.spacing.unit / 2,
    },
}));

export const HeaderSubtitleBlogPost = decorate<Props>(({classes, blogPost}) => {
    return (
        <div className={classes.root}>
            <Typography className={classes.subtitle} component="h2" variant="caption">
                &bdquo;
                {blogPost.subtitle}
                &ldquo;
            </Typography>
            <div style={{marginTop: 16}}>
                {blogPost.labels.map((row) => (
                    <Chip style={{marginRight: 8}} key={row.id} label={row.name} color="primary" clickable avatar={<Avatar>{row.name.substr(0, 1)}</Avatar>} />
                ))}
            </div>
        </div>
    );
});
