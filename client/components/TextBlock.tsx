import * as React from 'react';
import {Grid, Typography, withStyles} from '@material-ui/core';
import {List} from './List';
import {PageContentTextBlock} from '@graphql-model';
import {WrapperBlock} from './WrapperBlock';
import {RichTextRender} from '@client/components/RichTextRender';

interface Props {
    data: PageContentTextBlock;
}

const decorate = withStyles(() => ({}));

const getListItems = (listItems: string[] | null | undefined): string[] => (listItems ? listItems : []);

export const TextBlock = decorate<Props>(({data}) => {
    const isExistList: boolean = !!data.listItems && Array.isArray(data.listItems) && data.listItems.length > 0;
    return (
        <WrapperBlock paperBackground>
            <Grid container direction="row" alignItems="flex-start" justify="center" spacing={0}>
                <Grid item xs={12}>
                    <Typography variant="headline" component="h3">
                        {data.title}
                    </Typography>
                    <Typography variant="body1">{data.subtitle}</Typography>
                    <br />
                </Grid>
                <Grid item xs={12} md={isExistList ? 8 : 12}>
                    <RichTextRender data={data.richText} />
                </Grid>
                {isExistList && (
                    <Grid item xs={12} md={4}>
                        <List items={getListItems(data.listItems)} />
                    </Grid>
                )}
            </Grid>
        </WrapperBlock>
    );
});
