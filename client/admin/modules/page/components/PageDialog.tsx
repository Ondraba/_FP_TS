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
    FormControl,
    Grid,
    IconButton,
    Input,
    InputLabel,
    LinearProgress,
    List,
    MenuItem,
    Omit,
    Select,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from '@material-ui/core';
import {Delete as DeleteIcon} from '@material-ui/icons';
import {AdminMutations, AdminQueries} from '@client/admin/graphql';
import {
    CreateAdminMutationPageArgs,
    Page,
    PageContentBlockInput,
    PageContentType,
    PageHeaderButtonInput,
    PageHeaderDescriptionInput,
    PageHeaderInput,
    PageInput,
    PageSubheaderBlockInput,
    SaveAdminMutationPageArgs,
} from '@graphql-model';
import {CloseButton, CreateOrSaveButton, DefaultCheckbox, DefaultTextField, LoadingDialog} from '@client/admin/components';

interface Props {
    id?: string | null;
    open: boolean;
    onClose: () => void;
    input: PageInput;
}

interface ChildProps extends ChildMutateProps<Props, Page, CreateAdminMutationPageArgs | SaveAdminMutationPageArgs> {}

interface State {
    input: PageInput;
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
        result.push({query: AdminQueries.pages});
        if (id) {
            result.push({query: AdminQueries.page, variables: {id}});
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

    handleChange = (name: keyof PageInput, nullEmpty: boolean = false) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {input} = this.state;
        this.setState({input: {...input, [name]: nullEmpty && e.target.value === '' ? null : e.target.value}});
    };

    handleChangeHeader = (name: keyof PageHeaderInput) => (e: ChangeEvent<HTMLInputElement>) => {
        const {input} = this.state;
        this.setState({input: {...input, header: {...input.header, [name]: e.target.value}}});
    };

    handleChangeCheckbox = (name: keyof PageInput) => (e: ChangeEvent<HTMLInputElement>) => {
        const {input} = this.state;
        this.setState({input: {...input, [name]: e.target.checked}});
    };

    handleAddDescription = () => {
        const {input} = this.state;
        this.setState({input: {...input, header: {...input.header, descriptions: [...input.header.descriptions, {text: '', order: 1}]}}});
    };

    handleChangeDescription = (index: number, name: keyof PageHeaderDescriptionInput) => (e: ChangeEvent<HTMLInputElement>) => {
        const {input} = this.state;
        this.setState({
            input: {
                ...input,
                header: {
                    ...input.header,
                    descriptions: input.header.descriptions.map((d, i) => (i === index ? {...d, [name]: e.target.value} : d)),
                },
            },
        });
    };

    handleRemoveDescription = (index: number) => () => {
        const {input} = this.state;
        this.setState({input: {...input, header: {...input.header, descriptions: input.header.descriptions.filter((_, i) => i !== index)}}});
    };

    handleAddButton = () => {
        const {input} = this.state;
        this.setState({
            input: {
                ...input,
                header: {
                    ...input.header,
                    buttons: [...(input.header.buttons || []), {name: '', url: '', order: 1, external: false, white: false}],
                },
            },
        });
    };

    handleChangeButton = (index: number, name: keyof PageHeaderButtonInput, checkbox: boolean) => (e: ChangeEvent<HTMLInputElement>) => {
        const {input} = this.state;
        this.setState({
            input: {
                ...input,
                header: {
                    ...input.header,
                    buttons: input.header.buttons!.map((d, i) => (i === index ? {...d, [name]: e.target[checkbox ? 'checked' : 'value']} : d)),
                },
            },
        });
    };

    handleRemoveButton = (index: number) => () => {
        const {input} = this.state;
        this.setState({input: {...input, header: {...input.header, buttons: input.header.buttons!.filter((_, i) => i !== index)}}});
    };

    handleAddSubheaderBlock = () => {
        const {input} = this.state;
        this.setState({
            input: {
                ...input,
                subheaderBlocks: [...(input.subheaderBlocks || []), {title: '', subtitle: '', icon: '', order: 1}],
            },
        });
    };

    handleChangeSubheaderBlock = (index: number, name: keyof PageSubheaderBlockInput) => (e: ChangeEvent<HTMLInputElement>) => {
        const {input} = this.state;
        this.setState({
            input: {
                ...input,
                subheaderBlocks: input.subheaderBlocks!.map((m, i) => (i === index ? {...m, [name]: e.target.value} : m)),
            },
        });
    };

    handleRemoveSubheaderBlock = (index: number) => () => {
        const {input} = this.state;
        this.setState({input: {...input, subheaderBlocks: input.subheaderBlocks!.filter((_, i) => i !== index)}});
    };

    handleAddContentBlock = () => {
        const {input} = this.state;
        this.setState({
            input: {
                ...input,
                contentBlocks: [...(input.contentBlocks || []), {type: PageContentType.TEXT, textBlock: null, order: 1}],
            },
        });
    };

    handleChangeContentBlock = (index: number, name: keyof PageContentBlockInput, nullEmpty: boolean = false) => (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    ) => {
        const {input} = this.state;
        this.setState({
            input: {
                ...input,
                contentBlocks: input.contentBlocks!.map(
                    (m, i) => (i === index ? {...m, [name]: nullEmpty && e.target.value === '' ? null : e.target.value} : m),
                ),
            },
        });
    };

    handleRemoveContentBlock = (index: number) => () => {
        const {input} = this.state;
        this.setState({input: {...input, contentBlocks: input.contentBlocks!.filter((_, i) => i !== index)}});
    };

    render() {
        const {open, onClose, id} = this.props;
        const {input, loading} = this.state;
        return (
            <Dialog open={open} fullScreen>
                <DialogTitle>Page - {id ? 'Save' : 'Create'}</DialogTitle>
                <DialogContent>
                    {loading && <LinearProgress />}
                    <Grid container spacing={24}>
                        <Grid item xs={12} md={6}>
                            <DefaultTextField label="Key" onChange={this.handleChange('key')} value={input.key} disabled={loading} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <DefaultTextField label="Name" onChange={this.handleChange('name')} value={input.name} disabled={loading} />
                        </Grid>
                        <Grid item xs={12}>
                            <DefaultTextField label="Title" onChange={this.handleChange('title')} value={input.title} disabled={loading} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <DefaultTextField label="Order" onChange={this.handleChange('order')} value={input.order} disabled={loading} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <DefaultCheckbox
                                checked={input.lastWhiteBlock}
                                onChange={this.handleChangeCheckbox('lastWhiteBlock')}
                                value={'lastWhiteBlock'}
                                label={'Last white block'}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="title">Header</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <DefaultTextField
                                label="Image src"
                                onChange={this.handleChangeHeader('imageSrc')}
                                value={input.header.imageSrc}
                                disabled={loading}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <ApolloQuery query={AdminQueries.subheaderNotifications} fetchPolicy="cache-and-network">
                                {({data, loading: subheaderNotificationLoading}) => {
                                    if (subheaderNotificationLoading || !data || !data.admin.subheaderNotifications) {
                                        return null;
                                    }
                                    return (
                                        <FormControl disabled={loading || subheaderNotificationLoading} fullWidth>
                                            <InputLabel htmlFor="subheader-notification">Subheader notification</InputLabel>
                                            <Select value={input.subheaderNotification || ''} onChange={this.handleChange('subheaderNotification', true)}>
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                {data.admin.subheaderNotifications.map((row) => (
                                                    <MenuItem key={row.id} value={row.id}>
                                                        {row.text}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    );
                                }}
                            </ApolloQuery>
                        </Grid>
                        <Grid item xs={12}>
                            <Button onClick={this.handleAddDescription}>Add description</Button>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Text</TableCell>
                                        <TableCell>Order</TableCell>
                                        <TableCell />
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {input.header.descriptions.map((d, index) => (
                                        <TableRow key={index}>
                                            <TableCell component="th" scope="row">
                                                <Input
                                                    placeholder="Popis"
                                                    inputProps={{'aria-label': 'Popis'}}
                                                    onChange={this.handleChangeDescription(index, 'text')}
                                                    value={d.text}
                                                    disabled={loading}
                                                    fullWidth
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Input
                                                    placeholder="Order"
                                                    inputProps={{'aria-label': 'Order'}}
                                                    onChange={this.handleChangeDescription(index, 'order')}
                                                    value={d.order}
                                                    disabled={loading}
                                                    fullWidth
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <IconButton aria-label="Delete" onClick={this.handleRemoveDescription(index)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Grid>
                        <Grid item xs={12}>
                            <Button onClick={this.handleAddButton}>Add button</Button>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Order</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>URL</TableCell>
                                        <TableCell>White</TableCell>
                                        <TableCell>External</TableCell>
                                        <TableCell />
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {input.header.buttons &&
                                        input.header.buttons.map((d, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    <Input
                                                        placeholder="Order"
                                                        inputProps={{'aria-label': 'URL'}}
                                                        onChange={this.handleChangeButton(index, 'order', false)}
                                                        value={d.order}
                                                        disabled={loading}
                                                        fullWidth
                                                    />
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    <Input
                                                        placeholder="Name"
                                                        inputProps={{'aria-label': 'Name'}}
                                                        onChange={this.handleChangeButton(index, 'name', false)}
                                                        value={d.name}
                                                        disabled={loading}
                                                        fullWidth
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Input
                                                        placeholder="URL"
                                                        inputProps={{'aria-label': 'URL'}}
                                                        onChange={this.handleChangeButton(index, 'url', false)}
                                                        value={d.url}
                                                        disabled={loading}
                                                        fullWidth
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Checkbox checked={d.white} onChange={this.handleChangeButton(index, 'white', true)} value="white" />
                                                </TableCell>
                                                <TableCell>
                                                    <Checkbox
                                                        checked={d.external}
                                                        onChange={this.handleChangeButton(index, 'external', true)}
                                                        value="external"
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <IconButton aria-label="Delete" onClick={this.handleRemoveButton(index)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </Grid>
                        <Grid item xs={12}>
                            <Button onClick={this.handleAddSubheaderBlock}>Add subheader block</Button>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Order</TableCell>
                                        <TableCell>Title</TableCell>
                                        <TableCell>Subtitle</TableCell>
                                        <TableCell>Icon</TableCell>
                                        <TableCell />
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {input.subheaderBlocks &&
                                        input.subheaderBlocks.map((d, index) => (
                                            <TableRow key={index}>
                                                <TableCell component="th" scope="row">
                                                    <Input
                                                        placeholder="Order"
                                                        inputProps={{'aria-label': 'Order'}}
                                                        onChange={this.handleChangeSubheaderBlock(index, 'order')}
                                                        value={d.order}
                                                        disabled={loading}
                                                        fullWidth
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Input
                                                        placeholder="Title"
                                                        inputProps={{'aria-label': 'Title'}}
                                                        onChange={this.handleChangeSubheaderBlock(index, 'title')}
                                                        value={d.title}
                                                        disabled={loading}
                                                        fullWidth
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Input
                                                        placeholder="Subtitle"
                                                        inputProps={{'aria-label': 'Subtitle'}}
                                                        onChange={this.handleChangeSubheaderBlock(index, 'subtitle')}
                                                        value={d.subtitle}
                                                        disabled={loading}
                                                        fullWidth
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Input
                                                        placeholder="Icon"
                                                        inputProps={{'aria-label': 'Icon'}}
                                                        onChange={this.handleChangeSubheaderBlock(index, 'icon')}
                                                        value={d.icon}
                                                        disabled={loading}
                                                        fullWidth
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <IconButton aria-label="Delete" onClick={this.handleRemoveSubheaderBlock(index)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </Grid>
                        <Grid item xs={12}>
                            <Button onClick={this.handleAddContentBlock}>Add content block</Button>
                            <ApolloQuery query={AdminQueries.pageContentTextBlocks}>
                                {({data, loading: loadingTextBlock}) => {
                                    if (loadingTextBlock || !data || !data.admin || !data.admin.pageContentTextBlocks) {
                                        return null;
                                    }
                                    return (
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Order</TableCell>
                                                    <TableCell>Type</TableCell>
                                                    <TableCell>Text block</TableCell>
                                                    <TableCell />
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {input.contentBlocks &&
                                                    input.contentBlocks.map((d, index) => (
                                                        <TableRow key={index}>
                                                            <TableCell component="th" scope="row">
                                                                <Input
                                                                    placeholder="Order"
                                                                    inputProps={{'aria-label': 'Order'}}
                                                                    onChange={this.handleChangeContentBlock(index, 'order')}
                                                                    value={d.order}
                                                                    disabled={loading}
                                                                    fullWidth
                                                                />
                                                            </TableCell>
                                                            <TableCell>
                                                                <FormControl disabled={loading || loadingTextBlock} fullWidth>
                                                                    <InputLabel htmlFor="subheader-notification">Type</InputLabel>
                                                                    <Select value={d.type} onChange={this.handleChangeContentBlock(index, 'type')}>
                                                                        <MenuItem value="">
                                                                            <em>None</em>
                                                                        </MenuItem>
                                                                        {Object.values(PageContentType).map((row) => (
                                                                            <MenuItem key={row} value={row}>
                                                                                {row}
                                                                            </MenuItem>
                                                                        ))}
                                                                    </Select>
                                                                </FormControl>
                                                            </TableCell>
                                                            <TableCell>
                                                                <FormControl disabled={loading || loadingTextBlock} fullWidth>
                                                                    <InputLabel htmlFor="subheader-notification">Text block</InputLabel>
                                                                    <Select
                                                                        value={d.textBlock || ''}
                                                                        onChange={this.handleChangeContentBlock(index, 'textBlock', true)}
                                                                    >
                                                                        <MenuItem value="">
                                                                            <em>None</em>
                                                                        </MenuItem>
                                                                        {data.admin.pageContentTextBlocks.map((row) => (
                                                                            <MenuItem key={row.id} value={row.id}>
                                                                                {row.title}
                                                                            </MenuItem>
                                                                        ))}
                                                                    </Select>
                                                                </FormControl>
                                                            </TableCell>
                                                            <TableCell>
                                                                <IconButton aria-label="Delete" onClick={this.handleRemoveContentBlock(index)}>
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                            </TableBody>
                                        </Table>
                                    );
                                }}
                            </ApolloQuery>
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

const Save = graphql<Props, Page, SaveAdminMutationPageArgs, ChildProps>(AdminMutations.page.save)(Component);

const Create = graphql<Props, Page, CreateAdminMutationPageArgs, ChildProps>(AdminMutations.page.create)(Component);

const omitTypename = (key, value) => (key === '__typename' || key === 'id' ? undefined : value);
const removeTypeNameAndId = (payload: any) => JSON.parse(JSON.stringify(payload), omitTypename);

export const PageDialog = (props: Omit<Props, 'input'>) =>
    !!props.id ? (
        <ApolloQuery query={AdminQueries.page} variables={{id: props.id}} fetchPolicy="network-only">
            {({loading, data}) => {
                if (loading || !data) {
                    return <LoadingDialog open={true} />;
                }
                const {page} = data.admin;
                return (
                    <Save
                        {...props}
                        input={{
                            ...removeTypeNameAndId(page),
                            subheaderNotification: page.subheaderNotification ? page.subheaderNotification.id : '',
                            contentBlocks: page.contentBlocks
                                ? page.contentBlocks.map(({id, __typename, ...m}) => ({...m, textBlock: m.textBlock ? m.textBlock.id : null}))
                                : [],
                        }}
                    />
                );
            }}
        </ApolloQuery>
    ) : (
        <Create
            {...props}
            input={{
                key: '',
                title: '',
                name: '',
                lastWhiteBlock: false,
                order: 1,
                header: {
                    descriptions: [],
                    imageSrc: '',
                    buttons: [],
                },
            }}
        />
    );
