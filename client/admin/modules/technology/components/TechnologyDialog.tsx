import * as React from 'react';
import {ChangeEvent} from 'react';
import {ChildMutateProps, graphql, Query as ApolloQuery} from 'react-apollo';
import {PureQueryOptions} from 'apollo-boost';
import {Dialog, DialogActions, DialogContent, DialogTitle, Grid, LinearProgress, List, Omit, TextField} from '@material-ui/core';
import {AdminMutations, AdminQueries} from '@client/admin/graphql';
import {CreateAdminMutationTechnologyArgs, SaveAdminMutationTechnologyArgs, Technology, TechnologyInput} from '@graphql-model';
import {CloseButton, CreateOrSaveButton, DefaultTextField, LoadingDialog} from '@client/admin/components';

interface Props {
    id?: string | null;
    open: boolean;
    onClose: () => void;
    input: TechnologyInput;
}

interface ChildProps extends ChildMutateProps<Props, Technology, CreateAdminMutationTechnologyArgs | SaveAdminMutationTechnologyArgs> {}

interface State {
    input: TechnologyInput;
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
        result.push({query: AdminQueries.technologies});
        if (id) {
            result.push({query: AdminQueries.technology, variables: {id}});
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

    handleChange = (name: keyof TechnologyInput) => (e: ChangeEvent<HTMLInputElement>) => {
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
                        <Grid item xs={12}>
                            <TextField label="Image path" onChange={this.handleChange('imageSrc')} value={input.imageSrc} disabled={loading} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Description"
                                onChange={this.handleChange('description')}
                                value={input.description}
                                multiline
                                rows={8}
                                disabled={loading}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Order" onChange={this.handleChange('order')} value={input.order} disabled={loading} />
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

const Save = graphql<Props, Technology, SaveAdminMutationTechnologyArgs, ChildProps>(AdminMutations.technology.save)(Component);

const Create = graphql<Props, Technology, CreateAdminMutationTechnologyArgs, ChildProps>(AdminMutations.technology.create)(Component);

export const TechnologyDialog = (props: Omit<Props, 'input'>) =>
    !!props.id ? (
        <ApolloQuery query={AdminQueries.technology} variables={{id: props.id}} fetchPolicy="network-only">
            {({loading, data}) => {
                if (loading || !data) {
                    return <LoadingDialog open={true} />;
                }
                const {__typename, id, ...input} = data.admin.technology;

                return <Save {...props} input={{...input}} />;
            }}
        </ApolloQuery>
    ) : (
        <Create
            {...props}
            input={{
                name: '',
                imageSrc: '',
                description: '',
                order: 1,
            }}
        />
    );
