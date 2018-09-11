import * as React from 'react';
import {Grid, GridList, GridListTile, GridListTileBar, IconButton, LinearProgress, Theme, Typography, withStyles, withWidth} from '@material-ui/core';
import {FormattedRelative} from 'react-intl';
import {ChildDataProps, graphql} from 'react-apollo';
import {PageQueryArgs, Query} from '@graphql-model';
import {Queries} from '@client/graphql';
import {Breakpoint} from '@material-ui/core/styles/createBreakpoints';
import {ChevronRight as ChevronRightIcon} from '@material-ui/icons';
import {WrapperBlock} from './WrapperBlock';

type Response = Pick<Query, 'latestRemoteBlogPosts'>;

interface Props {
    width: Breakpoint;
}

interface ChildProps extends Props, ChildDataProps<unknown, Response> {}

const decorate = withStyles((theme: Theme) => ({
    gridList: {
        width: '100%',
        flexWrap: 'nowrap' as any,
        transform: 'translateZ(0)',
        minHeight: 185,
    },

    title: {
        marginBottom: 24,
    },

    gridItem: {
        opacity: 0.8,
        '&:hover': {
            opacity: 1,
        },
    },

    actionButton: {
        color: theme.palette.common.white,
    },
}));

const getCols = (width: Breakpoint): number => {
    switch (width) {
        case 'xl':
            return 3.5;
        case 'lg':
            return 2.5;
        case 'md':
            return 2;
        default:
            return 1.5;
    }
};

const Component = decorate<ChildProps>(({classes, width, data: {loading, latestRemoteBlogPosts}}) => {
    return (
        <WrapperBlock>
            <Grid container direction="row" alignItems="flex-start" justify="center" spacing={0}>
                <Grid item xs={12}>
                    <Typography variant="headline">Blog</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1" color="primary" className={classes.title}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    {loading && <LinearProgress />}
                    {latestRemoteBlogPosts && (
                        <GridList className={classes.gridList} cols={getCols(width)}>
                            {latestRemoteBlogPosts.map((blog) => (
                                <GridListTile key={blog.id} className={classes.gridItem}>
                                    <img src={blog.imageUrl || '/static/images/home-bg.jpg'} alt={blog.title || ''} />
                                    <GridListTileBar
                                        title={blog.title}
                                        subtitle={<FormattedRelative value={blog.updated || ''} />}
                                        actionIcon={
                                            <a href={blog.url || ''} target="_blank">
                                                <IconButton className={classes.actionButton}>
                                                    <ChevronRightIcon />
                                                </IconButton>
                                            </a>
                                        }
                                    />
                                </GridListTile>
                            ))}
                        </GridList>
                    )}
                </Grid>
            </Grid>
        </WrapperBlock>
    );
});

const withQuery = graphql<Props, Response, PageQueryArgs, ChildProps>(Queries.latestRemoteBlogPosts);

export const RemoteBlogCarousel = withWidth()(withQuery(Component));
