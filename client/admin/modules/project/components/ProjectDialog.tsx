import * as React from 'react';
import {ChangeEvent} from 'react';
import {ChildMutateProps, graphql, Query as ApolloQuery} from 'react-apollo';
import {PureQueryOptions} from 'apollo-boost';
import {Dialog, DialogActions, DialogContent, DialogTitle, Grid, LinearProgress, List, Omit} from '@material-ui/core';
import {AdminMutations, AdminQueries} from '@client/admin/graphql';
import {CreateAdminMutationProjectArgs, LinkInput, Project, ProjectInput, SaveAdminMutationProjectArgs} from '@graphql-model';
import {addLink, changeLink, CloseButton, CreateOrSaveButton, DefaultTextField, LinkInputBlock, LoadingDialog, removeLink} from '@client/admin/components';

interface Props {
    id?: string | null;
    open: boolean;
    onClose: () => void;
    input: ProjectInput;
}

interface ChildProps extends ChildMutateProps<Props, Project, CreateAdminMutationProjectArgs | SaveAdminMutationProjectArgs> {}

interface State {
    input: ProjectInput;
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
        result.push({query: AdminQueries.projects});
        if (id) {
            result.push({query: AdminQueries.project, variables: {id}});
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

    handleChange = (name: keyof ProjectInput) => (e: ChangeEvent<HTMLInputElement>) => {
        const {input} = this.state;
        this.setState({input: {...input, [name]: e.target.value}});
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
                        <Grid item xs={12}>
                            <DefaultTextField label="Name" onChange={this.handleChange('name')} value={input.name} disabled={loading} />
                        </Grid>
                        <Grid item xs={12}>
                            <DefaultTextField label="Subtitle" onChange={this.handleChange('subtitle')} value={input.subtitle} disabled={loading} />
                        </Grid>
                        <Grid item xs={12}>
                            <DefaultTextField label="Image path" onChange={this.handleChange('imageSrc')} value={input.imageSrc} disabled={loading} />
                        </Grid>
                        <Grid item xs={12}>
                            <DefaultTextField
                                label="Description"
                                onChange={this.handleChange('description')}
                                value={input.description}
                                multiline
                                rows={8}
                                disabled={loading}
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

const Save = graphql<Props, Project, SaveAdminMutationProjectArgs, ChildProps>(AdminMutations.project.save)(Component);

const Create = graphql<Props, Project, CreateAdminMutationProjectArgs, ChildProps>(AdminMutations.project.create)(Component);

const removeTypename = ({__typename, id, ...m}: any) => ({...m});

export const ProjectDialog = (props: Omit<Props, 'input'>) =>
    !!props.id ? (
        <ApolloQuery query={AdminQueries.project} variables={{id: props.id}} fetchPolicy="network-only">
            {({loading, data}) => {
                if (loading || !data) {
                    return <LoadingDialog open={true} />;
                }
                const {__typename, id, ...input} = data.admin.project;

                return <Save {...props} input={{...input, links: (input.links || []).map(removeTypename)}} />;
            }}
        </ApolloQuery>
    ) : (
        <Create
            {...props}
            input={{
                name: '',
                subtitle: '',
                imageSrc: '',
                description: '',
                links: [],
                order: 1,
            }}
        />
    );
