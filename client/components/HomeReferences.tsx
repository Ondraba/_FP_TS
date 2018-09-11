import {graphql} from 'react-apollo';
import {Person} from '@graphql-model';
import {Queries} from '../graphql';
import {Lang} from '../Lang';
import {References, ReferencesProps} from './References';

interface OwnProps {}

interface Response {
    homeReferences: Person[];
}

export const HomeReferences = graphql<OwnProps, Response, unknown, ReferencesProps>(Queries.homeReferences, {
    props: ({data}) => ({
        persons: !!data && !!data.homeReferences ? data.homeReferences : [],
        loading: !!data && !!data.loading,
        title: Lang.HOME_REFERENCES,
    }),
})(References);
