import * as React from 'react';
import * as Draft from 'draft-js';
import {convertFromRaw, Editor, EditorState, RawDraftContentState} from 'draft-js';
import * as Immutable from 'immutable';
import {Grid, Theme, Typography, withStyles} from '@material-ui/core';
import {RichText} from '@graphql-model';

interface Props {
    data?: RichText | null;
}

const styleMap = {
    CODE: {
        border: '1px solid red',
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        display: 'block',
        padding: 2,
    },
};

const CodeBlock = withStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing.unit,
        whiteSpace: 'pre-wrap' as any,
        backgroundColor: theme.palette.grey[300],
    },
}))(({classes, children}) => {
    return <pre className={classes.root}>{children}</pre>;
});

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
    'code-block': {
        wrapper: <CodeBlock />,
    },
});

const extendedBlockRenderMap = Draft.DefaultDraftBlockRenderMap.merge(blockRenderMap);

const convertRichText = (richText: any): EditorState => {
    const converted: RawDraftContentState = {
        ...richText,
        blocks: richText.blocks!.map(({__typename: t1, data: {__typename: t2, ...data}, ...m}) => ({...m, data: !data.id ? {} : data})),
        entityMap: richText.entityMap || {},
    };
    return EditorState.createWithContent(convertFromRaw(converted));
};

export class RichTextRender extends React.PureComponent<Props> {
    handleChange = (_: EditorState) => {
        // nothing
    };

    render() {
        const {data} = this.props;
        if (!data) {
            return null;
        }
        return (
            <Grid container>
                <Grid item xs={12}>
                    <Editor
                        editorState={convertRichText(data)}
                        onChange={this.handleChange}
                        customStyleMap={styleMap}
                        blockRenderMap={extendedBlockRenderMap}
                        readOnly
                    />
                </Grid>
            </Grid>
        );
    }
}
