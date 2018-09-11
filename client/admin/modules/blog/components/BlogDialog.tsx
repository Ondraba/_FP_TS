import * as React from 'react';
import {ChangeEvent} from 'react';
import {ChildMutateProps, graphql, Query as ApolloQuery} from 'react-apollo';
import {PureQueryOptions} from 'apollo-boost';
import {
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    LinearProgress,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    ListSubheader,
    Omit,
} from '@material-ui/core';
import {AdminMutations, AdminQueries} from '@client/admin/graphql';
import {BlogPost, BlogPostInput, CreateAdminMutationPostBlogArgs, SaveAdminMutationPostBlogArgs} from '@graphql-model';
import {CloseButton, CreateOrSaveButton, DefaultCheckbox, DefaultTextField, LoadingDialog} from '@client/admin/components';
import {DateUtil} from '@client/admin/util';
import {MarkdownRender} from '@client/components/MarkdownRender';

interface Props {
    id?: string | null;
    open: boolean;
    onClose: () => void;
    input: BlogPostInput;
}

interface ChildProps extends ChildMutateProps<Props, BlogPost, CreateAdminMutationPostBlogArgs | SaveAdminMutationPostBlogArgs> {}

interface State {
    input: BlogPostInput;
    loading: boolean;
}

class Component extends React.Component<ChildProps & Props, State> {
    constructor(props: ChildProps & Props, context: any) {
        super(props, context);
        this.state = {
            input: {...this.props.input, publishedDate: DateUtil.actualFormatDate()},
            loading: false,
        };
    }

    getRefetchQueries = (): PureQueryOptions[] => {
        const {id} = this.props;
        const result: PureQueryOptions[] = [];
        result.push({query: AdminQueries.blogPosts});
        if (id) {
            result.push({query: AdminQueries.blogPost, variables: {id}});
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

    handleChange = (name: keyof BlogPostInput) => (e: ChangeEvent<HTMLInputElement>) => {
        const {input} = this.state;
        this.setState({input: {...input, [name]: e.target.value}});
    };

    handleChangeCheckbox = (name: keyof BlogPostInput) => (e: ChangeEvent<HTMLInputElement>) => {
        const {input} = this.state;
        this.setState({input: {...input, [name]: e.target.checked}});
    };

    handleOnChangeLabel = (id: string) => (e: ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        const {input} = this.state;
        if (checked) {
            this.setState({input: {...input, labels: [...input.labels, id]}});
        } else {
            this.setState({input: {...input, labels: input.labels.filter((f) => f !== id)}});
        }
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
                            <DefaultTextField label="Key" onChange={this.handleChange('key')} value={input.key} disabled={loading} />
                        </Grid>
                        <Grid item xs={12}>
                            <DefaultTextField label="Author" onChange={this.handleChange('author')} value={input.author} disabled={loading} />
                        </Grid>
                        <Grid item xs={12}>
                            <DefaultTextField label="Title" onChange={this.handleChange('title')} value={input.title} disabled={loading} />
                        </Grid>
                        <Grid item xs={12}>
                            <DefaultTextField label="Subtitle" onChange={this.handleChange('subtitle')} value={input.subtitle} disabled={loading} />
                        </Grid>
                        <Grid item xs={12}>
                            <DefaultTextField label="Image src" onChange={this.handleChange('imageSrc')} value={input.imageSrc} disabled={loading} />
                        </Grid>
                        <Grid item xs={12}>
                            <List subheader={<ListSubheader>Labels</ListSubheader>} dense>
                                <ApolloQuery query={AdminQueries.labels} fetchPolicy="cache-and-network">
                                    {({data, loading: labelsLoading}) => {
                                        if (labelsLoading || !data || !data.admin.labels) {
                                            return null;
                                        }
                                        return data.admin.labels.map((row) => (
                                            <ListItem key={row.id} dense divider>
                                                <ListItemText primary={row.name} />
                                                <ListItemSecondaryAction>
                                                    <Checkbox onChange={this.handleOnChangeLabel(row.id)} checked={input.labels.includes(row.id)} />
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        ));
                                    }}
                                </ApolloQuery>
                            </List>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <DefaultCheckbox
                                checked={input.published}
                                onChange={this.handleChangeCheckbox('published')}
                                value={'published'}
                                label={'Published'}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <DefaultTextField
                                type="date"
                                label="Published date"
                                onChange={this.handleChange('publishedDate')}
                                value={input.publishedDate}
                                disabled={loading}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <DefaultTextField
                                label="Content"
                                onChange={this.handleChange('content')}
                                value={input.content}
                                disabled={loading}
                                multiline
                                rows={10}
                            />
                            <MarkdownRender content={input.content} />
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

const Save = graphql<Props, BlogPost, SaveAdminMutationPostBlogArgs, ChildProps>(AdminMutations.blog.post.save)(Component);

const Create = graphql<Props, BlogPost, CreateAdminMutationPostBlogArgs, ChildProps>(AdminMutations.blog.post.create)(Component);

export const BlogDialog = (props: Omit<Props, 'input'>) =>
    !!props.id ? (
        <ApolloQuery query={AdminQueries.blogPost} variables={{id: props.id}} fetchPolicy="network-only">
            {({loading, data}) => {
                if (loading || !data) {
                    return <LoadingDialog open={true} />;
                }
                const {__typename, id, labels, ...input} = data.admin.blogPost;

                return <Save {...props} input={{...input, labels: labels.map((m) => m.id), publishedDate: DateUtil.formatFromString(input.publishedDate)}} />;
            }}
        </ApolloQuery>
    ) : (
        <Create
            {...props}
            input={
                {
                    key: '',
                    author: '',
                    title: '',
                    subtitle: '',
                    imageSrc: '',
                    content: '',
                    published: false,
                    publishedDate: '',
                    labels: [],
                } as BlogPostInput
            }
        />
    );
