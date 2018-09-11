import * as React from 'react';
import {ChangeEvent} from 'react';
import {ChildMutateProps, graphql, Query as ApolloQuery} from 'react-apollo';
import {PureQueryOptions} from 'apollo-boost';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, LinearProgress, List, Omit, Typography} from '@material-ui/core';
import {AdminMutations, AdminQueries} from '@client/admin/graphql';
import {
    CreateAdminMutationPageContentTextBlockArgs,
    PageContentTextBlock,
    PageContentTextBlockInput,
    RichText,
    SaveAdminMutationPageContentTextBlockArgs,
} from '@graphql-model';
import {Remove as RemoveIcon} from '@material-ui/icons';
import {CloseButton, CreateOrSaveButton, DefaultTextField, LoadingDialog, RichTextEditor} from '@client/admin/components';
import {convertFromRaw, convertToRaw, EditorState, RawDraftContentState} from 'draft-js';

interface Props {
    id?: string | null;
    open: boolean;
    onClose: () => void;
    input: PageContentTextBlockInput;
    richText?: RichText | null;
}

interface ChildProps
    extends ChildMutateProps<Props, PageContentTextBlock, CreateAdminMutationPageContentTextBlockArgs | SaveAdminMutationPageContentTextBlockArgs> {}

interface State {
    listItemAdd: string;
    input: PageContentTextBlockInput;
    loading: boolean;
    richTextState: EditorState;
}

const convertRichText = (richText?: any): EditorState => {
    if (!richText) {
        return EditorState.createEmpty();
    }
    const converted: RawDraftContentState = {
        ...richText,
        blocks: richText.blocks!.map(({__typename: t1, data: {__typename: t2, ...data}, ...m}) => ({...m, data: !data.id ? {} : data})),
        entityMap: richText.entityMap || {},
    };
    return EditorState.createWithContent(convertFromRaw(converted));
};

class Component extends React.Component<ChildProps & Props, State> {
    constructor(props: ChildProps & Props, context: any) {
        super(props, context);

        try {
            this.state = {
                listItemAdd: '',
                input: this.props.input,
                loading: false,
                richTextState: convertRichText(props.input.richText),
            };
        } catch (err) {
            this.state = {
                listItemAdd: '',
                input: this.props.input,
                loading: false,
                richTextState: EditorState.createEmpty(),
            };
        }
    }

    getRefetchQueries = (): PureQueryOptions[] => {
        const {id} = this.props;
        const result: PureQueryOptions[] = [];
        result.push({query: AdminQueries.pageContentTextBlocks});
        if (id) {
            result.push({query: AdminQueries.pageContentTextBlock, variables: {id}});
        }

        return result;
    };

    handleSubmit = () => {
        const {mutate, id} = this.props;
        const {input: preInput, richTextState} = this.state;
        const input = {...preInput, richText: convertToRaw(richTextState.getCurrentContent()) as any};
        this.setState({loading: true});
        mutate({variables: id ? {id, input} : {input}, refetchQueries: this.getRefetchQueries(), awaitRefetchQueries: true})
            // mutate({variables: id ? {id, input} : {input}})
            .then(() => {
                this.setState({loading: false});
                this.props.onClose();
            })
            .catch((err) => {
                this.setState({loading: false});
                // tslint:disable-next-line
                console.log('error: ', err);
                alert(`Chyba odeslani: ${err.message}`);
            });
    };

    handleChange = (name: keyof PageContentTextBlockInput) => (e: ChangeEvent<HTMLInputElement>) => {
        const {input} = this.state;
        this.setState({input: {...input, [name]: e.target.value}});
    };

    handleChangeAddListItem = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({listItemAdd: e.target.value});
    };

    handleAddListItem = () => {
        const {input, listItemAdd} = this.state;
        if (listItemAdd) {
            this.setState({input: {...input, listItems: [...(input.listItems || []), listItemAdd]}, listItemAdd: ''});
        }
    };

    handleRemoveListItem = (item: string) => () => {
        const {input} = this.state;
        this.setState({input: {...input, listItems: (input.listItems || []).filter((f) => f !== item)}});
    };

    handleChangeEditorState = (state: EditorState) => {
        this.setState({richTextState: state});
    };

    render() {
        const {open, onClose, id} = this.props;
        const {input, listItemAdd, loading, richTextState} = this.state;
        return (
            <Dialog open={open} fullWidth maxWidth="md">
                <DialogTitle>Page content text block - {id ? 'Save' : 'Create'}</DialogTitle>
                <DialogContent>
                    {loading && <LinearProgress />}
                    <Grid container>
                        <Grid item xs={12}>
                            <DefaultTextField label="Title" onChange={this.handleChange('title')} value={input.title} disabled={loading} />
                        </Grid>
                        <Grid item xs={12}>
                            <DefaultTextField
                                label="Subtitle"
                                onChange={this.handleChange('subtitle')}
                                value={input.subtitle}
                                multiline
                                rows={2}
                                disabled={loading}
                            />
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <RichTextEditor editorState={richTextState} onChange={this.handleChangeEditorState} />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <DefaultTextField label="Add list item" onChange={this.handleChangeAddListItem} value={listItemAdd} disabled={loading} />
                            <Button onClick={this.handleAddListItem}>Add</Button>
                            <ul>
                                {(input.listItems ? input.listItems : []).map((row, index) => (
                                    <li key={index}>
                                        <Typography style={{display: 'inline-block'}}>{row}</Typography>
                                        <IconButton onClick={this.handleRemoveListItem(row)}>
                                            <RemoveIcon />
                                        </IconButton>
                                    </li>
                                ))}
                            </ul>
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

const Save = graphql<Props, PageContentTextBlock, SaveAdminMutationPageContentTextBlockArgs, ChildProps>(AdminMutations.pageContentTextBlock.save)(Component);

const Create = graphql<Props, PageContentTextBlock, CreateAdminMutationPageContentTextBlockArgs, ChildProps>(AdminMutations.pageContentTextBlock.create)(
    Component,
);

export const PageContentTextBlockDialog = (props: Omit<Props, 'input'>) =>
    !!props.id ? (
        <ApolloQuery query={AdminQueries.pageContentTextBlock} variables={{id: props.id}} fetchPolicy="network-only">
            {({loading, data}) => {
                if (loading || !data) {
                    return <LoadingDialog open={true} />;
                }
                const {title, subtitle, listItems, richText} = data.admin.pageContentTextBlock;

                return <Save {...props} input={{title, subtitle, listItems, richText}} />;
            }}
        </ApolloQuery>
    ) : (
        <Create {...props} input={{title: '', subtitle: ''}} />
    );
