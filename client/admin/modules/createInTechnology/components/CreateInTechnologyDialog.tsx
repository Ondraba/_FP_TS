import * as React from 'react';
import {ChangeEvent} from 'react';
import {ChildMutateProps, graphql, Query as ApolloQuery} from 'react-apollo';
import {PureQueryOptions} from 'apollo-boost';
import {Dialog, DialogActions, DialogContent, DialogTitle, Grid, LinearProgress, List, Omit} from '@material-ui/core';
import {AdminMutations, AdminQueries} from '@client/admin/graphql';
import {CreateAdminMutationCreateInTechnologyArgs, CreateInTechnology, CreateInTechnologyInput, SaveAdminMutationCreateInTechnologyArgs} from '@graphql-model';
import {CloseButton, CreateOrSaveButton, DefaultCheckbox, DefaultTextField, LoadingDialog} from '@client/admin/components';

interface Props {
    id?: string | null;
    open: boolean;
    onClose: () => void;
    input: CreateInTechnologyInput;
}

interface ChildProps extends ChildMutateProps<Props, CreateInTechnology, CreateAdminMutationCreateInTechnologyArgs | SaveAdminMutationCreateInTechnologyArgs> {}

interface State {
    input: CreateInTechnologyInput;
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
        result.push({query: AdminQueries.createInTechnologies});
        if (id) {
            result.push({query: AdminQueries.createInTechnology, variables: {id}});
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

    handleChange = (name: keyof CreateInTechnologyInput) => (e: ChangeEvent<HTMLInputElement>) => {
        const {input} = this.state;
        this.setState({input: {...input, [name]: e.target.value}});
    };

    handleChangeCheckbox = (name: keyof CreateInTechnologyInput) => (e: ChangeEvent<HTMLInputElement>) => {
        const {input} = this.state;
        this.setState({input: {...input, [name]: e.target.checked}});
    };

    render() {
        const {open, onClose, id} = this.props;
        const {input, loading} = this.state;
        return (
            <Dialog open={open} fullWidth maxWidth="md">
                <DialogTitle>Create in technology - {id ? 'Save' : 'Create'}</DialogTitle>
                <DialogContent>
                    {loading && <LinearProgress />}
                    <Grid container spacing={24}>
                        <Grid item xs={12} md={8}>
                            <DefaultTextField label="Name" onChange={this.handleChange('name')} value={input.name} disabled={loading} />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <DefaultTextField label="Icon" onChange={this.handleChange('icon')} value={input.icon} disabled={loading} />
                        </Grid>
                        <Grid item xs={12} md={10}>
                            <DefaultTextField label="Url" onChange={this.handleChange('url')} value={input.url} disabled={loading} />
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <DefaultCheckbox checked={input.external} onChange={this.handleChangeCheckbox('external')} value={'external'} label={'External'} />
                        </Grid>
                        <Grid item xs={12}>
                            <DefaultTextField label="Order" onChange={this.handleChange('order')} value={input.order} disabled={loading} />
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

const Save = graphql<Props, CreateInTechnology, SaveAdminMutationCreateInTechnologyArgs, ChildProps>(AdminMutations.createInTechnology.save)(Component);

const Create = graphql<Props, CreateInTechnology, CreateAdminMutationCreateInTechnologyArgs, ChildProps>(AdminMutations.createInTechnology.create)(Component);

export const CreateInTechnologyDialog = (props: Omit<Props, 'input'>) =>
    !!props.id ? (
        <ApolloQuery query={AdminQueries.createInTechnology} variables={{id: props.id}} fetchPolicy="network-only">
            {({loading, data}) => {
                if (loading || !data) {
                    return <LoadingDialog open={true} />;
                }
                const {__typename, id, ...input} = data.admin.createInTechnology;

                return <Save {...props} input={{...input}} />;
            }}
        </ApolloQuery>
    ) : (
        <Create
            {...props}
            input={{
                name: '',
                icon: '',
                url: '',
                order: 1,
                external: true,
            }}
        />
    );
