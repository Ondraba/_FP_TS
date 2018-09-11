import * as cookie from 'cookie';
import {Admin, Query} from '@graphql-model';
import gql from 'graphql-tag';
import {ApolloClient, ApolloQueryResult} from 'apollo-boost';
import {NextDocumentContext} from 'next/document';
import Router from 'next/router';

const NAME = 'token';
const COOKIE_PATH = '/admin';

export const AuthService = {
    saveToken: (token: string): void => {
        document.cookie = cookie.serialize(NAME, token, {
            maxAge: 30 * 24 * 60 * 60, // 30 days
        });
    },

    getToken: (req?: any, options = {}): string | null => {
        const parsedCookie = cookie.parse(req ? req.headers.cookie || '' : document.cookie, options);
        if (!parsedCookie || !parsedCookie.token) {
            return null;
        }
        return parsedCookie[NAME];
    },

    removeToken: (_?: any | null): void => {
        document.cookie = `${NAME}=; Max-Age=0;path=${COOKIE_PATH}`;
    },

    checkLoggedIn: async (apolloClient: ApolloClient<any>, req: any): Promise<Partial<{loggedInUser: Admin}>> => {
        if (!AuthService.getToken(req)) {
            return {loggedInUser: undefined};
        }
        return apolloClient
            .query<Query>({
                query: gql`
                    query getUser {
                        admin {
                            me {
                                id
                                login
                                firstName
                                lastName
                            }
                        }
                    }
                `,
            })
            .then(({data}: ApolloQueryResult<Query>) => {
                if (!data || !data.admin || !data.admin.me) {
                    throw new Error('User is not logged');
                }
                return {loggedInUser: data.admin.me};
            })
            .catch((err) => {
                // tslint:disable-next-line
                console.error('Error check admin: ', err);
                AuthService.removeToken(req);
                // Fail gracefully
                return {loggedInUser: undefined};
            });
    },

    redirect: async (target: string, context?: NextDocumentContext): Promise<boolean> => {
        if (context && context.res) {
            context.res.writeHead(303, {Location: target});
            context.res.end();
            return true;
        } else {
            return await Router.replace(target);
        }
    },
};
