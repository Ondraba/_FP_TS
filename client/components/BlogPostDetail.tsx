import * as React from 'react';
import {FormattedDate} from 'react-intl';
import {Grid, Theme, Typography, withStyles} from '@material-ui/core';
import {BlogPost} from '@graphql-model';
import {WrapperBlock} from './WrapperBlock';
import {MarkdownRender} from '@client/components/MarkdownRender';

interface Props {
    data: BlogPost;
}

const decorate = withStyles((theme: Theme) => ({
    info: {
        borderBottom: `2px solid ${theme.palette.grey[100]}`,
        paddingBottom: 8,
        marginBottom: 16,
    },
}));

export const BlogPostDetail = decorate<Props>(({classes, data}) => (
    <WrapperBlock paperBackground>
        <Grid container>
            <Grid item xs={12} className={classes.info}>
                <Grid container direction="row" justify="space-between" alignItems="center">
                    <Grid item>
                        <Grid container spacing={24}>
                            <Grid item>
                                <Typography variant="caption">
                                    <i className="far fa-user" /> {data.author}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="caption">
                                    <i className="far fa-clock" /> <FormattedDate value={data.publishedDate} />
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="caption">
                                    <i className="far fa-eye" /> 2334 zhlédnutí
                                </Typography>
                            </Grid>
                            <Grid item />
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container direction="row" justify="flex-start" alignItems="center" spacing={8}>
                            <Grid item>
                                <i className="fab fa-facebook fa-2x" style={{color: '#415893'}} />
                            </Grid>
                            <Grid item>
                                <i className="fab fa-linkedin fa-2x" style={{color: '#3374AF'}} />
                            </Grid>
                            <Grid item>
                                <i className="fab fa-twitter-square fa-2x" style={{color: '#4C9FEC'}} />
                            </Grid>
                            <Grid item>
                                <i className="fab fa-google-plus-square fa-2x" style={{color: '#C9593D'}} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <MarkdownRender content={data.content} />
            </Grid>
        </Grid>
    </WrapperBlock>
));
