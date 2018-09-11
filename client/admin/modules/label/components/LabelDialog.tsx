import * as React from 'react';
import {ChangeEvent} from 'react';
import {ChildMutateProps, graphql, Query as ApolloQuery} from 'react-apollo';
import {PureQueryOptions} from 'apollo-boost';
import {Dialog, DialogActions, DialogContent, DialogTitle, Grid, LinearProgress, List, Omit} from '@material-ui/core';
import {AdminMutations, AdminQueries} from '@client/admin/graphql';
import {CreateAdminMutationLabelArgs, Label, LabelInput, SaveAdminMutationLabelArgs} from '@graphql-model';
import {CloseButton, CreateOrSaveButton, DefaultTextField, LoadingDialog} from '@client/admin/components';

interface Props {
    id?: string | null;
    open: boolean;
    onClose: () => void;
    input: LabelInput;
}

interface ChildProps extends ChildMutateProps<Props, Label, CreateAdminMutationLabelArgs | SaveAdminMutationLabelArgs> {}

interface State {
    input: LabelInput;
    loading: boolean;
}

class Component extends React.Component<ChildProps & Props, State> {
    constructor(props: ChildProps & Props, context: any) {
        super(props, context);
        this.state = {
            input: this.props.input,
            loading: false,
        };
    }

    getRefetchQueries = (): PureQueryOptions[] => {
        const {id} = this.props;
        const result: PureQueryOptions[] = [];
        result.push({query: AdminQueries.labels});
        if (id) {
            result.push({query: AdminQueries.label, variables: {id}});
        }

        return result;
    };

    handleSubmit = () => {
        const {mutate, id} = this.props;
        const {input} = this.state;
        this.setState({loading: true});
        mutate({variables: id ? {id, input} : {input}, refetchQueries: this.getRefetchQueries(), awaitRefetchQueries: true})
            // mutate({variables: id ? {id, input} : {input}})
            .then(() => {
                this.props.onClose();
            })
            .catch((err) => {
                this.setState({loading: false});
                // tslint:disable-next-line
                console.log('error: ', err);
                alert(`Chyba odeslani: ${err.message}`);
            });
    };

    handleChange = (name: keyof LabelInput) => (e: ChangeEvent<HTMLInputElement>) => {
        const {input} = this.state;
        this.setState({input: {...input, [name]: e.target.value}});
    };

    render() {
        const {open, onClose, id} = this.props;
        const {input, loading} = this.state;
        return (
            <Dialog open={open} fullWidth maxWidth="md">
                <DialogTitle>Page content text block - {id ? 'Save' : 'Create'}</DialogTitle>
                <DialogContent>
                    {loading && <LinearProgress />}
                    <Grid container spacing={24}>
                        <Grid item xs={12}>
                            <DefaultTextField label="Name" onChange={this.handleChange('name')} value={input.name} disabled={loading} />
                        </Grid>
                    </Grid>
                    <List />
                </DialogContent>
                <DialogActions>
                    <CloseButton onClick={onClose} disabled={loading} />
                    <CreateOrSaveButton create={!id} onClick={this.handleSubmit} disabled={loading} />
                </DialogActions>
            </Dialog>
        );
    }
}

const Save = graphql<Props, Label, SaveAdminMutationLabelArgs, ChildProps>(AdminMutations.label.save)(Component);

const Create = graphql<Props, Label, CreateAdminMutationLabelArgs, ChildProps>(AdminMutations.label.create)(Component);

export const LabelDialog = (props: Omit<Props, 'input'>) =>
    !!props.id ? (
        <ApolloQuery query={AdminQueries.label} variables={{id: props.id}} fetchPolicy="network-only">
            {({loading, data}) => {
                if (loading || !data) {
                    return <LoadingDialog open={true} />;
                }
                const {__typename, id, ...input} = data.admin.label;

                return <Save {...props} input={{...input}} />;
            }}
        </ApolloQuery>
    ) : (
        <Create
            {...props}
            input={{
                name: '',
            }}
        />
    );
