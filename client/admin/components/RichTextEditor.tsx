import * as React from 'react';
import * as Draft from 'draft-js';
import {convertFromRaw, convertToRaw, Editor, EditorState, RawDraftContentState, RichUtils} from 'draft-js';
import * as Immutable from 'immutable';
import {Button, Grid, Typography} from '@material-ui/core';

interface Props {
    editorState: EditorState;
    onChange: (state: EditorState) => void;
    showJSON?: boolean;
}

const styleMap = {
    CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        display: 'block',
        padding: 2,
    },
    H1: {},
};

const blockRenderMap = Immutable.Map({
    unstyled: {
        element: 'div',
        wrapper: <Typography component="div" />,
    },
    'header-two': {
        wrapper: <Typography component="h2" variant="title" />,
    },
    'header-three': {
        wrapper: <Typography component="h3" variant="body2" />,
    },
});

const extendedBlockRenderMap = Draft.DefaultDraftBlockRenderMap.merge(blockRenderMap);

export class RichTextEditor extends React.Component<Props> {
    handleChange = (editorState: EditorState) => {
        this.props.onChange(editorState);
    };

    handleChangeBlockStyle = (name: string) => () => {
        this.props.onChange(RichUtils.toggleBlockType(this.props.editorState, name));
    };

    handleChangeInlineStyle = (name: string) => () => {
        this.props.onChange(RichUtils.toggleInlineStyle(this.props.editorState, name));
    };

    render() {
        const {editorState, showJSON} = this.props;
        return (
            <Grid container>
                <Grid item xs={12}>
                    <Button onClick={this.handleChangeBlockStyle('header-two')}>H2</Button>
                    <Button onClick={this.handleChangeBlockStyle('header-three')}>H3</Button>
                    <Button onClick={this.handleChangeInlineStyle('UNDERLINE')}>Underline</Button>
                    <Button onClick={this.handleChangeInlineStyle('BOLD')}>Bold</Button>
                    <Button onClick={this.handleChangeInlineStyle('ITALIC')}>Italic</Button>
                    <Button onClick={this.handleChangeBlockStyle('code-block')}>Code</Button>
                    <div style={{border: '1px solid black', padding: 10, backgroundColor: 'white'}}>
                        <Editor editorState={editorState} onChange={this.handleChange} customStyleMap={styleMap} blockRenderMap={extendedBlockRenderMap} />
                    </div>
                </Grid>
                {showJSON && (
                    <Grid item xs={12}>
                        <pre>{JSON.stringify(convertToRaw(editorState.getCurrentContent()), null, 2)}</pre>
                    </Grid>
                )}
            </Grid>
        );
    }
}

export const convertFromGraphql = (richText?: any): EditorState => {
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
