import * as React from 'react';
import * as classnames from 'classnames';
import {AppBar, Button, Grid, Hidden, Theme, Toolbar, withStyles} from '@material-ui/core';
import {fade} from '@material-ui/core/styles/colorManipulator';
import Link from 'next/link';
import {TopBarSmallMenu} from './TopBarSmallMenu';
import {ChildDataProps, graphql} from 'react-apollo';
import {Queries} from '../../graphql';
import {Page} from '@graphql-model';
import {MAX_WIDTH} from '@client/components';

interface Response {
    pages: Page[];
}

interface Props {
    readonly pageKey: string;
}

interface ChildProps extends Props, ChildDataProps<unknown, Response> {}

const decorate = withStyles(({palette: {background, common: {white}, primary, secondary}}: Theme) => ({
    root: {
        transition: 'all 1s',
        height: 60,
    },

    wrapper: {
        maxWidth: MAX_WIDTH,
        marginLeft: 'auto',
        marginRight: 'auto',
    },

    onTop: {
        backgroundColor: 'transparent',
        boxShadow: 'none',
    },

    offTop: {
        backgroundColor: fade(background.paper, 0.9),
    },

    logo: {
        height: 40,
        cursor: 'pointer',
    },

    buttonOnTop: {
        color: white,
    },
    buttonSelected: {
        borderBottom: `2px solid ${secondary.main}`,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    buttonOffTop: {
        color: primary.main,
    },
}));

const ButtonLink = (key: string) => (props) => (
    <Link href={{pathname: '/', query: {id: key}}} as={`/${key === 'index' ? '' : key}`}>
        <a {...props}>{props.children}</a>
    </Link>
);

const Component = decorate<ChildProps & WithOnScrollProps>(({classes, pageKey, data: {pages}, isOnTop}) => {
    return (
        <AppBar position="fixed" className={classnames(classes.root, {[classes.onTop]: isOnTop, [classes.offTop]: !isOnTop})} color="default">
            <Toolbar>
                <Grid container direction="row" justify="space-between" alignItems="center" className={classes.wrapper}>
                    <Grid item>
                        <Link href="/">
                            <a>
                                <img src={`/static/images/logo_topBar.svg`} className={classes.logo} />
                            </a>
                        </Link>
                    </Grid>
                    <Grid item>
                        <Hidden smDown>
                            {pages &&
                                pages.map((page) => (
                                    <Button
                                        key={page.key}
                                        component={ButtonLink(page.key)}
                                        color={page.key === pageKey ? 'primary' : 'default'}
                                        classes={{
                                            root: classnames({
                                                [classes.buttonOnTop]: isOnTop,
                                                [classes.buttonOffTop]: !isOnTop,
                                                [classes.buttonSelected]: page.key === pageKey,
                                            }),
                                        }}
                                    >
                                        {page.name}
                                    </Button>
                                ))}
                        </Hidden>
                        <Hidden mdUp>
                            <TopBarSmallMenu pageKey={pageKey} pages={pages || []} isOnTop={isOnTop} />
                        </Hidden>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
});

interface WithOnScrollProps {
    isOnTop: boolean;
}

const offTop = 40;

const withOnScroll = (BaseComponent: React.ComponentType<ChildProps & WithOnScrollProps>): React.ComponentClass<ChildProps> => {
    const initialState = {
        isOnTop: true,
    };

    return class extends React.Component<ChildProps, typeof initialState> {
        readonly state = initialState;

        componentDidMount(): void {
            if (window.pageYOffset >= offTop) {
                this.setState({isOnTop: false});
            }
            addEventListener('scroll', this.handleScroll);
        }

        handleScroll = () => {
            const {isOnTop} = this.state;
            const actualIsOnTop = window.pageYOffset <= offTop;
            if (actualIsOnTop !== isOnTop) {
                this.setState({isOnTop: !isOnTop});
            }
        };

        componentWillUnmount(): void {
            removeEventListener('scroll', this.handleScroll);
        }

        render() {
            const {isOnTop} = this.state;
            return <BaseComponent {...this.props} isOnTop={isOnTop} />;
        }
    };
};

const withQuery = graphql<Props, Response, {}, ChildProps>(Queries.topBar);

export const TopBar = withQuery(withOnScroll(Component));
