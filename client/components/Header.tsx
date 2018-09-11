import * as React from 'react';
import {Button, Grid, Theme, withStyles} from '@material-ui/core';
import {HeaderTitle} from './HeaderTitle';
import * as classnames from 'classnames';
import Link from 'next/link';
import {PageHeader, SubheaderBlock, SubheaderNotification} from '@graphql-model';
import {Notification} from './Notification';
import {Subheader} from './Subheader';
import {MAX_WIDTH} from '@client/components/index';

interface Props {
    header: PageHeader;
    title: string | JSX.Element;
    subtitle?: string | JSX.Element;
    notification?: SubheaderNotification | null;
    subheaderBlocks?: SubheaderBlock[] | null;
    imageSrc: string;
}

const decorate = withStyles(({palette: {common, grey}, breakpoints}: Theme) => ({
    wrapper: {
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        width: '100%',
        height: 470,
        paddingTop: 100,
        paddingLeft: '10%',
        position: 'relative' as any,
    },

    wrapperContent: {
        maxWidth: MAX_WIDTH,
    },

    headerText: {
        width: '50%',
        [breakpoints.down('xs')]: {
            width: '100%',
        },
    },

    button: {
        marginTop: 20,
        marginRight: 8,
    },

    buttonBlack: {
        color: common.white,
        borderColor: common.white,
        '&:hover': {
            color: grey[200],
            borderColor: grey[200],
        },
    },

    buttonWhite: {
        backgroundColor: common.white,
        borderColor: common.white,
        '&:hover': {
            backgroundColor: grey[200],
            borderColor: grey[200],
        },
    },
}));

const ButtonLink = (url: string, external: boolean) => (props) => (
    <Link href={external ? url : {pathname: '/', query: {id: url.replace('/', '')}}} as={url}>
        <a {...props} target={external ? '_blank' : ''}>
            {props.children}
        </a>
    </Link>
);

export const Header = decorate<Props>(({classes, header: {buttons}, imageSrc, notification, subheaderBlocks, title, subtitle}) => (
    <>
        <div className={classes.wrapper} style={{backgroundImage: `url("${imageSrc}")`}}>
            <Grid container spacing={0} direction="row" justify="center" alignItems="center">
                <Grid item xs={12} className={classes.wrapperContent}>
                    <div className={classes.headerText}>
                        <HeaderTitle text={title} />
                        {subtitle}
                    </div>
                    {buttons &&
                        buttons.map((btn) => (
                            <Button
                                key={btn.name}
                                variant="outlined"
                                className={classnames(classes.button, {[classes.buttonWhite]: btn.white, [classes.buttonBlack]: !btn.white})}
                                component={ButtonLink(btn.url, btn.external === true)}
                            >
                                {btn.name}
                            </Button>
                        ))}
                </Grid>
            </Grid>
            {!!notification && <Notification data={notification} />}
        </div>
        {!!subheaderBlocks && subheaderBlocks.length > 0 && <Subheader blocks={subheaderBlocks} />}
    </>
));
