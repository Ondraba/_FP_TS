import * as React from 'react';
import Link from 'next/link';
import {Theme, Typography, withStyles} from '@material-ui/core';
import {FooterTitle} from './FooterTitle';
import {Lang} from '../../Lang';
import {Page} from '@graphql-model';
import {ChildDataProps, graphql} from 'react-apollo';
import {Queries} from '../../graphql';

interface Response {
    pages: Page[];
}

interface Props {}

interface ChildProps extends Props, ChildDataProps<unknown, Response> {}

const decorate = withStyles((theme: Theme) => ({
    list: {
        listStyleType: 'none',
        margin: 0,
        padding: 0,
    },

    item: {
        marginBottom: theme.spacing.unit,
    },

    link: {
        textDecoration: 'none',
    },

    itemText: {
        color: theme.palette.common.white,
        '&:hover': {
            color: theme.palette.primary.main,
        },
    },
}));

const Component = decorate<ChildProps>(({classes, data: {loading, pages}}) => {
    if (loading || !pages) {
        return null;
    }

    return (
        <>
            <FooterTitle title={Lang.FOOTER_WEB_MAP} />
            <ul className={classes.list}>
                {pages.map((page) => (
                    <li key={page.key} className={classes.item}>
                        <Link href={{pathname: '/', query: {id: page.key}}} as={`/${page.key}`}>
                            <a className={classes.link}>
                                <Typography className={classes.itemText}>{page.name}</Typography>
                            </a>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
});

const withQuery = graphql<Props, Response, {}, ChildProps>(Queries.topBar);

export const FooterWebMap = withQuery(Component);
