import * as React from 'react';
import {ChangeEvent} from 'react';
import {ChildMutateProps, graphql, Query as ApolloQuery} from 'react-apollo';
import {PureQueryOptions} from 'apollo-boost';
import {Dialog, DialogActions, DialogContent, DialogTitle, Grid, LinearProgress, List, Omit} from '@material-ui/core';
import {AdminMutations, AdminQueries} from '@client/admin/graphql';
import {Company, CompanyInput, CreateAdminMutationCompanyArgs, LinkInput, SaveAdminMutationCompanyArgs} from '@graphql-model';
import {
    addLink,
    changeLink,
    CloseButton,
    CreateOrSaveButton,
    DefaultCheckbox,
    DefaultTextField,
    LinkInputBlock,
    LoadingDialog,
    removeLink,
} from '@client/admin/components';

interface Props {
    id?: string | null;
    open: boolean;
    onClose: () => void;
    input: CompanyInput;
}

interface ChildProps extends ChildMutateProps<Props, Company, CreateAdminMutationCompanyArgs | SaveAdminMutationCompanyArgs> {}

interface State {
    input: CompanyInput;
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
        result.push({query: AdminQueries.companies});
        if (id) {
            result.push({query: AdminQueries.company, variables: {id}});
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

    handleChange = (name: keyof CompanyInput) => (e: ChangeEvent<HTMLInputElement>) => {
        const {input} = this.state;
        this.setState({input: {...input, [name]: e.target.value}});
    };

    handleChangeCheckbox = (name: keyof CompanyInput) => (e: ChangeEvent<HTMLInputElement>) => {
        const {input} = this.state;
        this.setState({input: {...input, [name]: e.target.checked}});
    };

    handleAddNewLink = () => {
        const {input} = this.state;
        this.setState({input: {...input, links: addLink(input.links)}});
    };

    handleChangeLink = (index: number, name: keyof LinkInput, value: string | boolean) => {
        const {input} = this.state;
        this.setState({input: {...input, links: changeLink(index, name, value, input.links)}});
    };

    handleRemoveLink = (index: number) => {
        const {input} = this.state;
        this.setState({input: {...input, links: removeLink(index, input.links)}});
    };

    render() {
        const {open, onClose, id} = this.props;
        const {input, loading} = this.state;
        return (
            <Dialog open={open} fullWidth maxWidth="md">
                <DialogTitle>Company - {id ? 'Save' : 'Create'}</DialogTitle>
                <DialogContent>
                    {loading && <LinearProgress />}
                    <Grid container spacing={24}>
                        <Grid item xs={12} md={10}>
                            <DefaultTextField label="Name" onChange={this.handleChange('name')} value={input.name} disabled={loading} />
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <DefaultCheckbox checked={input.default} onChange={this.handleChangeCheckbox('default')} value={'default'} label={'Default'} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <DefaultTextField label="IC" onChange={this.handleChange('ic')} value={input.ic} disabled={loading} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <DefaultTextField label="DIC" onChange={this.handleChange('dic')} value={input.dic} disabled={loading} />
                        </Grid>
                        <Grid item xs={12}>
                            <DefaultTextField label="Bank account" onChange={this.handleChange('bankAccount')} value={input.bankAccount} disabled={loading} />
                        </Grid>
                        <Grid item xs={12}>
                            <DefaultTextField
                                label="Court description"
                                onChange={this.handleChange('courtDescription')}
                                value={input.courtDescription}
                                disabled={loading}
                                multiline
                                rows={2}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <DefaultTextField label="Phone" onChange={this.handleChange('phone')} value={input.phone} disabled={loading} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <DefaultTextField label="Email" onChange={this.handleChange('email')} value={input.email} disabled={loading} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <DefaultTextField label="Street" onChange={this.handleChange('street')} value={input.street} disabled={loading} />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <DefaultTextField label="City" onChange={this.handleChange('city')} value={input.city} disabled={loading} />
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <DefaultTextField
                                label="Zip postal code"
                                onChange={this.handleChange('zipPostalCode')}
                                value={input.zipPostalCode}
                                disabled={loading}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <LinkInputBlock
                                onAddNew={this.handleAddNewLink}
                                onChange={this.handleChangeLink}
                                onRemove={this.handleRemoveLink}
                                links={input.links}
                            />
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

const Save = graphql<Props, Company, SaveAdminMutationCompanyArgs, ChildProps>(AdminMutations.company.save)(Component);

const Create = graphql<Props, Company, CreateAdminMutationCompanyArgs, ChildProps>(AdminMutations.company.create)(Component);

const removeTypename = ({__typename, id, ...m}: any) => ({...m});

export const CompanyDialog = (props: Omit<Props, 'input'>) =>
    !!props.id ? (
        <ApolloQuery query={AdminQueries.company} variables={{id: props.id}} fetchPolicy="network-only">
            {({loading, data}) => {
                if (loading || !data) {
                    return <LoadingDialog open={true} />;
                }
                const {
                    __typename,
                    id,
                    address: {street, city, zipPostalCode},
                    ...input
                } = data.admin.company;

                return <Save {...props} input={{...input, street, city, zipPostalCode, links: (input.links || []).map(removeTypename)}} />;
            }}
        </ApolloQuery>
    ) : (
        <Create
            {...props}
            input={{
                name: '',
                ic: '',
                dic: '',
                bankAccount: '',
                courtDescription: '',
                phone: '',
                email: '',
                street: '',
                city: '',
                zipPostalCode: '',
                links: [],
                default: false,
            }}
        />
    );
