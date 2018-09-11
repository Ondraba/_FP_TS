import * as React from 'react';
import {Fragment, SyntheticEvent} from 'react';
import {DocumentProps, NextDocumentContext} from 'next/document';
import Link from 'next/link';
import Router from 'next/router';
import {ApolloClient} from 'apollo-boost';
import {ApolloConsumer} from 'react-apollo';
import {AppBar, BottomNavigation, BottomNavigationAction, Grid, IconButton, Menu, MenuItem, Toolbar, Typography} from '@material-ui/core';
import {AccountCircle as AccountCircleIcon, Menu as MenuIcon, SupervisedUserCircle as SupervisedUserCircleIcon} from '@material-ui/icons';
import {Admin} from '@graphql-model';
import {AppFrame} from '@client/components';
import {AuthService} from '@client/admin';

interface LoggedInUserResponse {
    readonly loggedInUser: Admin;
}

export interface WithAdminProps extends LoggedInUserResponse {}

export const withAdmin = (BaseComponent: React.ComponentType<WithAdminProps> & {getInitialProps?(ctx: NextDocumentContext): DocumentProps}) => {
    const initState = {
        anchorEl: undefined,
    };

    interface State {
        anchorEl?: EventTarget & HTMLElement;
    }

    return class extends React.Component<LoggedInUserResponse, Readonly<State>> {
        readonly state = initState;

        handleOnLogout = (apolloClient: ApolloClient<any>) => async () => {
            AuthService.removeToken();
            await apolloClient.cache.reset();
            await AuthService.redirect('/admin/login');
        };

        static async getInitialProps(context: NextDocumentContext & {apolloClient: ApolloClient<any>}) {
            const {loggedInUser} = await AuthService.checkLoggedIn(context.apolloClient, context.req);
            if (!loggedInUser) {
                // AuthService.removeToken(context.req);
                // If not signed in, send them somewhere more useful
                await AuthService.redirect('/admin/login', context);
            }
            const props = BaseComponent.getInitialProps ? await BaseComponent.getInitialProps(context) : {};
            return {...props, loggedInUser};
        }

        handleOnClose = () => {
            this.setState({anchorEl: undefined});
        };

        handleOnClickMenu = (e: SyntheticEvent<HTMLElement>) => {
            this.setState({anchorEl: e.currentTarget});
        };

        handleOnClickRoute = (route: string) => () => {
            Router.push(route);
        };

        render() {
            const {loggedInUser} = this.props;
            const {anchorEl} = this.state;
            const isOpen = Boolean(anchorEl);
            return (
                <AppFrame>
                    <ApolloConsumer>
                        {(client) => (
                            <Fragment>
                                <AppBar position="static">
                                    <Toolbar>
                                        <IconButton style={{marginLeft: -12, marginRight: 20}} color="inherit" aria-label="Menu">
                                            <MenuIcon />
                                        </IconButton>
                                        <Link href="/admin">
                                            <Typography variant="title" color="inherit" style={{flexGrow: 1, cursor: 'pointer'}}>
                                                Administrace
                                            </Typography>
                                        </Link>
                                        <div>
                                            <Typography style={{display: 'inline-block'}} color="inherit">
                                                ({loggedInUser.login}) {loggedInUser.firstName} {loggedInUser.lastName}
                                            </Typography>
                                            <IconButton
                                                aria-owns={isOpen ? 'menu-appbar' : undefined}
                                                aria-haspopup="true"
                                                onClick={this.handleOnClickMenu}
                                                color="inherit"
                                            >
                                                <AccountCircleIcon />
                                            </IconButton>
                                            <Menu
                                                id="menu-appbar"
                                                anchorEl={anchorEl}
                                                anchorOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                open={isOpen}
                                                onClose={this.handleOnClose}
                                            >
                                                <MenuItem onClick={this.handleOnClose}>Profile</MenuItem>
                                                <MenuItem onClick={this.handleOnLogout(client)}>Logout</MenuItem>
                                            </Menu>
                                        </div>
                                    </Toolbar>
                                </AppBar>
                            </Fragment>
                        )}
                    </ApolloConsumer>

                    <main>
                        <Grid container spacing={0} style={{padding: 16, paddingBottom: 80}}>
                            <Grid item xs={12}>
                                <BaseComponent {...this.props} />
                            </Grid>
                        </Grid>
                    </main>

                    <BottomNavigation showLabels style={{position: 'fixed', width: '100%', left: 0, bottom: 0}}>
                        <BottomNavigationAction
                            label="Page content text"
                            icon={<SupervisedUserCircleIcon />}
                            onClick={this.handleOnClickRoute('/admin/pageContentTextBlock')}
                        />
                        <BottomNavigationAction label="Person" icon={<SupervisedUserCircleIcon />} onClick={this.handleOnClickRoute('/admin/person')} />
                        <BottomNavigationAction label="Project" icon={<SupervisedUserCircleIcon />} onClick={this.handleOnClickRoute('/admin/project')} />
                        <BottomNavigationAction label="Technology" icon={<SupervisedUserCircleIcon />} onClick={this.handleOnClickRoute('/admin/technology')} />
                        <BottomNavigationAction label="Company" icon={<SupervisedUserCircleIcon />} onClick={this.handleOnClickRoute('/admin/company')} />
                        <BottomNavigationAction
                            label="Create In tech"
                            icon={<SupervisedUserCircleIcon />}
                            onClick={this.handleOnClickRoute('/admin/createInTechnology')}
                        />
                        <BottomNavigationAction
                            label="Subheader notification"
                            icon={<SupervisedUserCircleIcon />}
                            onClick={this.handleOnClickRoute('/admin/subheaderNotification')}
                        />
                        <BottomNavigationAction label="Page" icon={<SupervisedUserCircleIcon />} onClick={this.handleOnClickRoute('/admin/page')} />
                        <BottomNavigationAction label="Admin" icon={<SupervisedUserCircleIcon />} onClick={this.handleOnClickRoute('/admin/admin')} />
                        <BottomNavigationAction label="Blog" icon={<SupervisedUserCircleIcon />} onClick={this.handleOnClickRoute('/admin/blog')} />
                        <BottomNavigationAction label="Label" icon={<SupervisedUserCircleIcon />} onClick={this.handleOnClickRoute('/admin/label')} />
                    </BottomNavigation>
                </AppFrame>
            );
        }
    };
};
