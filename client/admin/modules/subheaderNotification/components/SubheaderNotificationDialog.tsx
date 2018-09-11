import * as React from 'react';
import {ChangeEvent} from 'react';
import {ChildMutateProps, graphql, Query as ApolloQuery} from 'react-apollo';
import {PureQueryOptions} from 'apollo-boost';
import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    Input,
    LinearProgress,
    List,
    Omit,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from '@material-ui/core';
import {AdminMutations, AdminQueries} from '@client/admin/graphql';
import {
    CreateAdminMutationSubheaderNotificationArgs,
    SaveAdminMutationSubheaderNotificationArgs,
    SubheaderNotification,
    SubheaderNotificationInput,
    SubheaderNotificationLinkInput,
} from '@graphql-model';
import {Remove as RemoveIcon} from '@material-ui/icons';
import {CloseButton, CreateOrSaveButton, DefaultTextField, LoadingDialog} from '@client/admin/components';

interface Props {
    id?: string | null;
    open: boolean;
    onClose: () => void;
    input: SubheaderNotificationInput;
}

interface ChildProps
    extends ChildMutateProps<Props, SubheaderNotification, CreateAdminMutationSubheaderNotificationArgs | SaveAdminMutationSubheaderNotificationArgs> {}

interface State {
    input: SubheaderNotificationInput;
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
        result.push({query: AdminQueries.subheaderNotifications});
        if (id) {
            result.push({query: AdminQueries.subheaderNotification, variables: {id}});
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

    handleChange = (name: keyof SubheaderNotificationInput) => (e: ChangeEvent<HTMLInputElement>) => {
        const {input} = this.state;
        this.setState({input: {...input, [name]: e.target.value}});
    };

    handleAddLink = () => {
        const {input} = this.state;
        this.setState({input: {...input, links: [...(input.links || []), {name: '', url: '', external: true, order: 1}]}});
    };

    handleChangeLink = (index: number, name: keyof SubheaderNotificationLinkInput) => (e: ChangeEvent<HTMLInputElement>) => {
        const {input} = this.state;
        this.setState({
            input: {
                ...input,
                links: (input.links || []).map((m, i) => {
                    if (i === index) {
                        return {...m, [name]: e.target.value};
                    }
                    return m;
                }),
            },
        });
    };

    handleChangeLinkCheckbox = (index: number, name: keyof SubheaderNotificationLinkInput) => (e: ChangeEvent<HTMLInputElement>) => {
        const {input} = this.state;
        this.setState({
            input: {
                ...input,
                links: (input.links || []).map((m, i) => {
                    if (i === index) {
                        return {...m, [name]: e.target.checked};
                    }
                    return m;
                }),
            },
        });
    };

    handleRemoveLink = (index: number) => () => {
        const {input} = this.state;
        this.setState({input: {...input, links: (input.links || []).filter((_, i) => i !== index)}});
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
                            <DefaultTextField label="Text" onChange={this.handleChange('text')} value={input.text} multiline rows={4} disabled={loading} />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="title">Links</Typography>
                            <Button onClick={this.handleAddLink}>Add link</Button>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Order</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Url</TableCell>
                                        <TableCell>External</TableCell>
                                        <TableCell />
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(input.links || []).map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                <Input
                                                    placeholder="Order"
                                                    inputProps={{'aria-label': 'Order'}}
                                                    value={row.order}
                                                    onChange={this.handleChangeLink(index, 'order')}
                                                    fullWidth
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Input
                                                    placeholder="Name"
                                                    inputProps={{'aria-label': 'Name'}}
                                                    value={row.name}
                                                    onChange={this.handleChangeLink(index, 'name')}
                                                    fullWidth
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Input
                                                    placeholder="Url"
                                                    inputProps={{'aria-label': 'Url'}}
                                                    value={row.url}
                                                    onChange={this.handleChangeLink(index, 'url')}
                                                    fullWidth
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Checkbox checked={row.external} onChange={this.handleChangeLinkCheckbox(index, 'external')} value="external" />
                                            </TableCell>
                                            <TableCell>
                                                <IconButton onClick={this.handleRemoveLink(index)}>
                                                    <RemoveIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
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

const Save = graphql<Props, SubheaderNotification, SaveAdminMutationSubheaderNotificationArgs, ChildProps>(AdminMutations.subheaderNotification.save)(
    Component,
);

const Create = graphql<Props, SubheaderNotification, CreateAdminMutationSubheaderNotificationArgs, ChildProps>(AdminMutations.subheaderNotification.create)(
    Component,
);

const removeTypename = ({__typename, id, ...m}: any) => ({...m});

export const SubheaderNotificationDialog = (props: Omit<Props, 'input'>) =>
    !!props.id ? (
        <ApolloQuery query={AdminQueries.subheaderNotification} variables={{id: props.id}} fetchPolicy="network-only">
            {({loading, data}) => {
                if (loading || !data) {
                    return <LoadingDialog open={true} />;
                }
                const {__typename, id, ...input} = data.admin.subheaderNotification;

                return <Save {...props} input={{...input, links: (input.links || []).map(removeTypename)}} />;
            }}
        </ApolloQuery>
    ) : (
        <Create {...props} input={{text: '', links: []}} />
    );
