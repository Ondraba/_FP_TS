import {graphql} from 'react-apollo';
import {Person} from '@graphql-model';
import {Queries} from '../graphql';
import {Lang} from '../Lang';
import {References, ReferencesProps} from './References';

interface OwnProps {}

interface Response {
    trainingReferences: Person[];
}

export const TrainingReferences = graphql<OwnProps, Response, unknown, ReferencesProps>(Queries.trainingReferences, {
    props: ({data}) => ({
        persons: !!data && !!data.trainingReferences ? data.trainingReferences : [],
        loading: !!data && !!data.loading,
        title: Lang.TRAINING_REFERENCES,
    }),
})(References);
