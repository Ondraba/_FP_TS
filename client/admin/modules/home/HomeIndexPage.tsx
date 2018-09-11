import * as React from 'react';
import {WithAdminProps} from '@client/with/withAdmin';
import * as Draft from 'draft-js';
import {convertToRaw, Editor, EditorState, RichUtils} from 'draft-js';
import * as Immutable from 'immutable';
import {Button, Grid, Typography} from '@material-ui/core';

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
        wrapper: <Typography />,
    },
    'header-two': {
        wrapper: <Typography component="h2" variant="title" />,
    },
    'header-three': {
        wrapper: <Typography component="h3" variant="body2" />,
    },
});

const extendedBlockRenderMap = Draft.DefaultDraftBlockRenderMap.merge(blockRenderMap);

const initialState = {
    editorState: EditorState.createEmpty(),
};

export class HomeIndexPage extends React.Component<WithAdminProps, typeof initialState> {
    readonly state = initialState;

    handleChange = (editorState: EditorState) => {
        this.setState({editorState});
    };

    handleChangeBlockStyle = (name: string) => () => {
        this.handleChange(RichUtils.toggleBlockType(this.state.editorState, name));
    };

    handleChangeInlineStyle = (name: string) => () => {
        this.handleChange(RichUtils.toggleInlineStyle(this.state.editorState, name));
    };

    render() {
        const {editorState} = this.state;
        return (
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="title">Hello world!</Typography>
                </Grid>
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
                <Grid item xs={12}>
                    <pre>{JSON.stringify(convertToRaw(editorState.getCurrentContent()), null, 2)}</pre>
                </Grid>
            </Grid>
        );
    }
}
