import * as React from 'react';
import {ChangeEvent} from 'react';
import {ChildMutateProps, graphql, Query as ApolloQuery} from 'react-apollo';
import {PureQueryOptions} from 'apollo-boost';
import {Dialog, DialogActions, DialogContent, DialogTitle, Grid, LinearProgress, List, Omit} from '@material-ui/core';
import {AdminMutations, AdminQueries} from '@client/admin/graphql';
import {Admin, AdminInput, AdminSaveInput, CreateAdminMutationAdminArgs, SaveAdminMutationAdminArgs} from '@graphql-model';
import {CloseButton, CreateOrSaveButton, DefaultTextField, LoadingDialog} from '@client/admin/components';

interface Props {
    id?: string | null;
    open: boolean;
    onClose: () => void;
    input: AdminInput;
}

interface ChildProps extends ChildMutateProps<Props, Admin, CreateAdminMutationAdminArgs | SaveAdminMutationAdminArgs> {}

interface State {
    input: AdminInput;
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
        result.push({query: AdminQueries.admins});
        if (id) {
            result.push({query: AdminQueries.admin, variables: {id}});
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

    handleChange = (name: keyof AdminInput | keyof AdminSaveInput) => (e: ChangeEvent<HTMLInputElement>) => {
        const {input} = this.state;
        this.setState({input: {...input, [name]: e.target.value}});
    };

    render() {
        const {open, onClose, id} = this.props;
        const {input, loading} = this.state;
        return (
            <Dialog open={open} fullWidth maxWidth="md">
                <DialogTitle>Admin - {id ? 'Save' : 'Create'}</DialogTitle>
                <DialogContent>
                    {loading && <LinearProgress />}
                    <Grid container spacing={24}>
                        <Grid item xs={12}>
                            <DefaultTextField label="Login" onChange={this.handleChange('login')} value={input.login} disabled={loading} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <DefaultTextField
                                label="Password"
                                type="password"
                                onChange={this.handleChange('password')}
                                value={input.password}
                                disabled={loading}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <DefaultTextField
                                label="Password again"
                                type="password"
                                onChange={this.handleChange('passwordAgain')}
                                value={input.passwordAgain}
                                disabled={loading}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <DefaultTextField label="First name" onChange={this.handleChange('firstName')} value={input.firstName} disabled={loading} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <DefaultTextField label="Last name" onChange={this.handleChange('lastName')} value={input.lastName} disabled={loading} />
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

const Save = graphql<Props, Admin, SaveAdminMutationAdminArgs, ChildProps>(AdminMutations.admin.save)(Component);

const Create = graphql<Props, Admin, CreateAdminMutationAdminArgs, ChildProps>(AdminMutations.admin.create)(Component);

export const AdminDialog = (props: Omit<Props, 'input'>) =>
    !!props.id ? (
        <ApolloQuery query={AdminQueries.admin} variables={{id: props.id}} fetchPolicy="network-only">
            {({loading, data}) => {
                if (loading || !data) {
                    return <LoadingDialog open={true} />;
                }
                const {__typename, id, ...input} = data.admin.admin;

                return <Save {...props} input={input} />;
            }}
        </ApolloQuery>
    ) : (
        <Create
            {...props}
            input={{
                login: '',
                firstName: '',
                lastName: '',
                password: '',
                passwordAgain: '',
            }}
        />
    );
