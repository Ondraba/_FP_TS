require('dotenv').config();
const withTypescript = require('@zeit/next-typescript');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
    publicRuntimeConfig: {
        // Will be available on both server and client
        // staticFolder: '/static',
        DEV_REMOTE_LOCAL_GRAPHQL_PORT: process.env.DEV_REMOTE_LOCAL_GRAPHQL_PORT,
    },
    ...withTypescript({
        webpack(config, options) {
            if (options.isServer && process.env.NODE_ENV !== 'production') {
                config.plugins.push(new ForkTsCheckerWebpackPlugin());
            }
            return config;
        },
    }),
};
