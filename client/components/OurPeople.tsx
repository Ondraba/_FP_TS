import * as React from 'react';
import {Grid, withStyles} from '@material-ui/core';
import {ChildDataProps, graphql} from 'react-apollo';
import {PageQueryArgs, Person} from '@graphql-model';
import {Queries} from '../graphql';
import {OurPerson} from '@client/components/OurPerson';
import {WrapperBlock} from '@client/components/WrapperBlock';

interface Response {
    ourPeople: Person[];
}

interface Props {}

interface ChildProps extends Props, ChildDataProps<unknown, Response> {}

const decorate = withStyles(() => ({}));

const Component = decorate<ChildProps>(({data: {loading, ourPeople}}) => {
    if (loading || !ourPeople) {
        return null;
    }
    return (
        <WrapperBlock>
            <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={40}>
                {ourPeople.map((row) => (
                    <Grid key={row.id} item xs={12} sm={12} md={4}>
                        <OurPerson person={row} />
                    </Grid>
                ))}
            </Grid>
        </WrapperBlock>
    );
});

const withQuery = graphql<Props, Response, PageQueryArgs, ChildProps>(Queries.ourPeople);

export const OurPeople = withQuery(Component);
