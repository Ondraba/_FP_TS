import * as React from 'react';
import {Fragment} from 'react';
import {Grid, Theme, Typography, withStyles} from '@material-ui/core';
import * as classnames from 'classnames';
import {ChildDataProps, graphql} from 'react-apollo';
import {Queries} from '../../graphql';
import {Company, CreateInTechnology} from '@graphql-model';

interface Response {
    company: Company;
    createInTechnologies: CreateInTechnology[];
}

interface Props {}

interface ChildProps extends Props, ChildDataProps<unknown, Response> {}

const decorate = withStyles((theme: Theme) => ({
    logo: {
        height: 40,
    },

    linkIconsWrapper: {
        marginBottom: theme.spacing.unit * 3,
    },

    color: {
        color: theme.palette.common.white,
    },
}));

const Component = decorate<ChildProps>(({classes, data: {loading, company, createInTechnologies}}) => {
    if (loading || !company || !createInTechnologies) {
        return null;
    }
    return (
        <Grid container direction="column" justify="space-between" spacing={16}>
            <Grid item xs={12}>
                <img src="/static/images/logo_white.svg" className={classes.logo} />
            </Grid>
            <Grid item xs={12} className={classes.linkIconsWrapper}>
                {company.links.map((link) => (
                    <Fragment key={link.id}>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <a href={link.url} target={link.external ? '_blank' : ''}>
                            <i className={classnames(`${link.icon} fa-lg`, classes.color)} />
                        </a>
                    </Fragment>
                ))}
            </Grid>
            <Grid item xs={12}>
                <Typography className={classes.color}>
                    Powered by:&nbsp;
                    {createInTechnologies.map((tech) => (
                        <Fragment key={tech.id}>
                            &nbsp;&nbsp;
                            <a href={tech.url} target={tech.external ? '_blank' : ''}>
                                <i className={classnames(tech.icon, classes.color)} />
                            </a>
                        </Fragment>
                    ))}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body1" className={classes.color}>
                    &copy; {company.name} 2018
                </Typography>
            </Grid>
        </Grid>
    );
});

const withCompany = graphql<Props, Response, {}, ChildProps>(Queries.footerLogo);

export const FooterLogo = withCompany(Component);
