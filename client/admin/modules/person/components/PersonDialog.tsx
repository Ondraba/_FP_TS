import * as React from 'react';
import {ChangeEvent} from 'react';
import {ChildMutateProps, graphql, Query as ApolloQuery} from 'react-apollo';
import {PureQueryOptions} from 'apollo-boost';
import {Dialog, DialogActions, DialogContent, DialogTitle, Grid, LinearProgress, List, Omit} from '@material-ui/core';
import {AdminMutations, AdminQueries} from '@client/admin/graphql';
import {CreateAdminMutationPersonArgs, LinkInput, Person, PersonInput, SaveAdminMutationPersonArgs} from '@graphql-model';
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
    input: PersonInput;
}

interface ChildProps extends ChildMutateProps<Props, Person, CreateAdminMutationPersonArgs | SaveAdminMutationPersonArgs> {}

interface State {
    input: PersonInput;
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
        result.push({query: AdminQueries.persons});
        if (id) {
            result.push({query: AdminQueries.person, variables: {id}});
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

    handleChange = (name: keyof PersonInput) => (e: ChangeEvent<HTMLInputElement>) => {
        const {input} = this.state;
        this.setState({input: {...input, [name]: e.target.value}});
    };

    handleChangeCheckbox = (name: keyof PersonInput) => (e: ChangeEvent<HTMLInputElement>) => {
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
                <DialogTitle>Page content text block - {id ? 'Save' : 'Create'}</DialogTitle>
                <DialogContent>
                    {loading && <LinearProgress />}
                    <Grid container spacing={24}>
                        <Grid item xs={12} md={6}>
                            <DefaultTextField label="First name" onChange={this.handleChange('firstName')} value={input.firstName} disabled={loading} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <DefaultTextField label="Last name" onChange={this.handleChange('lastName')} value={input.lastName} disabled={loading} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <DefaultTextField label="Position" onChange={this.handleChange('position')} value={input.position} disabled={loading} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <DefaultTextField label="Image path" onChange={this.handleChange('imageSrc')} value={input.imageSrc} disabled={loading} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <DefaultTextField label="Phone" onChange={this.handleChange('phone')} value={input.phone || ''} disabled={loading} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <DefaultTextField label="Email" onChange={this.handleChange('email')} value={input.email || ''} disabled={loading} />
                        </Grid>
                        <Grid item xs={12}>
                            <DefaultTextField
                                label="Description"
                                onChange={this.handleChange('description')}
                                value={input.description}
                                disabled={loading}
                                multiline
                                rows={8}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <DefaultCheckbox checked={input.our} onChange={this.handleChangeCheckbox('our')} value={'our'} label={'Our'} />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <DefaultCheckbox
                                checked={input.homeReference}
                                onChange={this.handleChangeCheckbox('homeReference')}
                                value={'homeReference'}
                                label={'Home Reference'}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <DefaultCheckbox
                                checked={input.trainingReference}
                                onChange={this.handleChangeCheckbox('trainingReference')}
                                value={'trainingReference'}
                                label={'Training reference'}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <DefaultTextField label="Order" onChange={this.handleChange('order')} value={input.order} disabled={loading} />
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

const Save = graphql<Props, Person, SaveAdminMutationPersonArgs, ChildProps>(AdminMutations.person.save)(Component);

const Create = graphql<Props, Person, CreateAdminMutationPersonArgs, ChildProps>(AdminMutations.person.create)(Component);

const removeTypename = ({__typename, ...m}: any) => ({...m});

export const PersonDialog = (props: Omit<Props, 'input'>) =>
    !!props.id ? (
        <ApolloQuery query={AdminQueries.person} variables={{id: props.id}} fetchPolicy="network-only">
            {({loading, data}) => {
                if (loading || !data) {
                    return <LoadingDialog open={true} />;
                }
                const {__typename, id, ...input} = data.admin.person;

                return <Save {...props} input={{...input, links: (input.links || []).map(removeTypename)}} />;
            }}
        </ApolloQuery>
    ) : (
        <Create
            {...props}
            input={{
                firstName: '',
                lastName: '',
                position: '',
                imageSrc: '',
                description: '',
                our: false,
                homeReference: false,
                trainingReference: false,
                phone: '',
                email: '',
                links: [],
                order: 1,
            }}
        />
    );
