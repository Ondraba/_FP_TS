import * as React from 'react';
import * as classnames from 'classnames';
import {Grid, Paper, Theme, Typography, withStyles} from '@material-ui/core';
import {fade} from '@material-ui/core/styles/colorManipulator';
import {ChildDataProps, graphql} from 'react-apollo';
import {PageQueryArgs, Project} from '@graphql-model';
import {Queries} from '../graphql';
import {WrapperBlock} from '@client/components/WrapperBlock';

interface Response {
    projects: Project[];
}

interface Props {}

interface ChildProps extends Props, ChildDataProps<unknown, Response> {}

const decorate = withStyles(({palette: {secondary, grey, common: {black}}}: Theme) => ({
    paper: {
        marginTop: 24,
        height: 350,
        textAlign: 'center' as 'center',
        padding: '158px 16px',
        position: 'relative' as 'relative',
        boxShadow: `0px 8px 10px -5px ${fade(secondary.main, 0.2)}, 0px 16px 24px 2px ${fade(secondary.main, 0.14)}, 0px 6px 30px 5px ${fade(
            secondary.main,
            0.12,
        )}`,
    },

    image: {
        width: 220,
        height: 140,
        position: 'absolute' as 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        top: -10,
        boxShadow: `0 16px 38px -12px ${fade(black, 0.56)}, 0 4px 25px 0px ${fade(black, 0.12)}, 0 8px 10px -5px ${fade(black, 0.2)}`,
        borderRadius: 4,
    },

    subtitle: {
        marginBottom: 16,
    },

    text: {
        color: grey[600],
    },

    linksWrapper: {
        position: 'absolute' as 'absolute',
        bottom: 8,
        left: '50%',
        transform: 'translateX(-50%)',
    },

    link: {
        margin: 8,
        float: 'left' as 'left',
    },

    linkIcon: {
        color: black,
    },
}));

const Component = decorate<ChildProps>(({classes, data: {loading, projects}}) => {
    if (loading || !projects) {
        return null;
    }
    return (
        <WrapperBlock>
            <Grid container direction="row" alignItems="center" justify="center" spacing={40}>
                <Grid item xs={12}>
                    <Grid container direction="row" justify="center" alignItems="center" spacing={40}>
                        {projects.map((row) => (
                            <Grid key={row.id} item xs={12} sm={12} md={4}>
                                <Paper className={classes.paper}>
                                    <img src={row.fullImageSrc} className={classes.image} />
                                    <Typography variant="title" component="h5">
                                        {row.name}
                                    </Typography>
                                    <Typography variant="caption" className={classes.subtitle}>
                                        {row.subtitle}
                                    </Typography>
                                    <Typography className={classes.text}>{row.description}</Typography>
                                    {row.links && (
                                        <div className={classes.linksWrapper}>
                                            {row.links.map((link) => (
                                                <a key={link.name} href={link.url} target={link.external ? '_blank' : ''} className={classes.link}>
                                                    <i className={classnames(`${link.icon} fa-2x`, classes.linkIcon)} />
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </WrapperBlock>
    );
});

const withQuery = graphql<Props, Response, PageQueryArgs, ChildProps>(Queries.projects);

export const Projects = withQuery(Component);
