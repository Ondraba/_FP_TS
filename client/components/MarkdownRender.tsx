import * as React from 'react';
import {
    Grid,
    Modal,
    Table as MaterialTable,
    TableBody as MaterialTableBody,
    TableCell as MaterialTableCell,
    TableHead as MaterialTableHead,
    TableRow as MaterialTableRow,
    Theme,
    Typography,
    withStyles,
} from '@material-ui/core';
import * as ReactMarkdown from 'react-markdown';
import {TextStyle} from '@material-ui/core/styles/createTypography';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {routeros} from 'react-syntax-highlighter/styles/hljs';

interface Props {
    content: string;
}

/*
const source = `
## Live demo h2

V minulosti jsem se již několikrát zmiňoval, že používat JavaScript bez statických typů, je stejné jako jezdit na kole poslepu. Nemusí se Vám nic stát, ale také si můžete hezky ublížit. Jednou z variant, jak částečně předcházet problémům, je použití staticky typovaného jazyka. Už během psaní kódu je více viditelné, že "něco není v pořádku". TypeScript (dále jen TS) je jazyk, který nám k tomuto účelu může dobře posloužit.

Cílem dnešního **článku jsou příklady**, na kterých se pokusím demonstrovat vlastnosti jazyka, se kterými se lze setkat. Výčet určitě není kompletní, protože TS je velice sofistikovaný jazyk, který se nedá popsat ani jednou knihou.

* Implements [GitHub Flavored Markdown](https://github.github.com/gfm/)
* Renders actual, "native" React DOM elements
* Allows you to escape or skip HTML (try toggling the checkboxes above)
* If you escape or skip the HTML, no \`dangerouslySetInnerHTML\` is used! Yay!

## HTML block below

> This blockquote will change based on the HTML settings above.
> This blockquote will change *based* on the HTML settings above.

![Racing](/static/images/logo_small.png=250x250)

Without height

![Racing](/static/images/browsers/browser-stats.png=250x)


## Tables?

| Feature | Support |
| ------ | ----------- |
| tables | ✔ |
| alignment | ✔ |
| wewt | ✔ |

## How about some code?
\`\`\`js
interface Props {
    firstName: string;
    lastName: string;
}
const User: React.SFC<Props> = ({firstName, lastName}) => (
    <div>
        {firstName} {lastName}
    </div>
);
const App = () => <User firstName={'Ales'} lastName={'Dostal'} />;
\`\`\`
`;
*/

export class MarkdownRender extends React.PureComponent<Props> {
    render() {
        const {content} = this.props;
        return (
            <Grid container>
                <Grid item xs={12} style={{marginBottom: 36}}>
                    <ReactMarkdown
                        escapeHtml={false}
                        source={content}
                        renderers={{
                            blockquote: Blockquote,
                            code: CodeBlock,
                            paragraph: Paragraph,
                            heading: Heading,
                            list: List,
                            listItem: ListItem,
                            table: Table,
                            tableHead: TableHead,
                            tableBody: TableBody,
                            tableRow: TableRow,
                            tableCell: TableCell,
                            link: Link,
                            image: Image,
                        }}
                    />
                </Grid>
            </Grid>
        );
    }
}

const CodeBlock = withStyles((theme: Theme) => ({
    root: {
        padding: `2px 16px`,
        backgroundColor: theme.palette.grey[200],
    },
}))<{language: string; value: string}>(({classes, language, value}) => {
    return (
        <div className={classes.root}>
            <SyntaxHighlighter language={language || 'javascript'} style={routeros} customStyle={{whiteSpace: 'pre-wrap', backgroundColor: '#EEEEEE'}}>
                {value}
            </SyntaxHighlighter>
        </div>
    );
});

const Paragraph = withStyles((theme: Theme) => ({
    root: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
}))<{children: string[]}>(({classes, children}) => {
    return <Typography className={classes.root}>{children}</Typography>;
});

const Heading = withStyles((theme: Theme) => ({
    root: {
        marginTop: theme.spacing.unit * 4,
        marginBottom: theme.spacing.unit * 2,
    },
}))<{children: string[]; level: number}>(({classes, children, level}) => {
    const getVariant = (): TextStyle | undefined => {
        switch (level) {
            case 2:
                return 'title';
            case 3:
                return 'subheading';
            case 4:
                return 'body2';
            default:
                return undefined;
        }
    };
    return (
        <Typography variant={getVariant()} component={`h${level}`} className={classes.root}>
            {children}
        </Typography>
    );
});

const List = withStyles((_: Theme) => ({
    root: {
        listStyleType: 'square',
    },
}))<{}>(({classes, children}) => <ul className={classes.root}>{children}</ul>);
const ListItem = withStyles((theme: Theme) => ({
    root: {
        color: theme.palette.primary.main,
        marginTop: theme.spacing.unit / 2,
    },
}))<{}>(({classes, children}) => {
    return (
        <li className={classes.root}>
            <Typography>{children}</Typography>
        </li>
    );
});

const Table = withStyles((_: Theme) => ({}))<{}>(({children}) => <MaterialTable padding="dense">{children}</MaterialTable>);
const TableHead = withStyles((_: Theme) => ({}))<{}>(({children}) => <MaterialTableHead>{children}</MaterialTableHead>);
const TableBody = withStyles((_: Theme) => ({}))<{}>(({children}) => <MaterialTableBody>{children}</MaterialTableBody>);
const TableRow = withStyles((_: Theme) => ({}))<{}>(({children}) => <MaterialTableRow>{children}</MaterialTableRow>);
const TableCell = withStyles((_: Theme) => ({}))<{}>(({children}) => <MaterialTableCell padding="dense">{children}</MaterialTableCell>);

const Blockquote = withStyles((theme: Theme) => ({
    root: {
        paddingLeft: theme.spacing.unit * 2,
        borderLeft: `2px solid ${theme.palette.primary.main}`,
        fontStyle: 'italic',
    },
}))<{}>(({classes, children}) => (
    <Typography className={classes.root} component="div">
        {children}
    </Typography>
));

const Link = withStyles((theme: Theme) => ({
    root: {
        color: theme.palette.primary.main,
    },
}))<{href: string}>(({classes, children, href}) => {
    return (
        <a className={classes.root} href={href} target="_blank">
            {children}
        </a>
    );
});

interface ImageComponentProps {
    src: string;
    alt?: string;
    width?: number;
    height?: number;
    onClick: () => void;
}

const ImageComponent = withStyles((_: Theme) => ({
    root: {
        borderRadius: 4,
        cursor: 'pointer',
        maxWidth: '90%',
    },
}))<ImageComponentProps>(({classes, ...props}) => {
    return <img className={classes.root} {...props} />;
});

const ImageModalComponent = withStyles((_: Theme) => ({
    root: {
        maxHeight: '90%',
        borderRadius: 4,
        maxWidth: '90%',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        position: 'absolute' as any,
        outline: 0,
    },
}))<ImageComponentProps>(({classes, ...props}) => {
    return <img className={classes.root} {...props} />;
});

const withImageModal = (BaseComponent: React.ComponentType<ImageComponentProps>): React.ComponentClass<ImageComponentProps> => {
    const parseSrcImage = (src: string): {src: string; width?: number; height?: number} => {
        const parse = src.split('=');
        if (parse.length === 2) {
            const dimension = parse[1].split('x');
            if (dimension.length === 2) {
                return {src: parse[0], width: Number.parseInt(dimension[0], 10) || undefined, height: Number.parseInt(dimension[1], 10) || undefined};
            }
            return {src: parse[0]};
        }
        return {src};
    };

    const initialState = {
        showModalDialog: false,
    };

    return class extends React.Component<ImageComponentProps, typeof initialState> {
        readonly state = initialState;

        handleOpenModal = () => {
            this.setState({showModalDialog: true});
        };
        handleCloseModal = () => {
            this.setState({showModalDialog: false});
        };

        render() {
            const {src, alt} = this.props;
            const parse = parseSrcImage(src);
            const {showModalDialog} = this.state;
            return (
                <>
                    <BaseComponent alt={alt} {...parse} onClick={this.handleOpenModal} />
                    {showModalDialog && (
                        <Modal open={true} onClose={this.handleCloseModal}>
                            <ImageModalComponent src={parse.src} alt={alt} onClick={this.handleCloseModal} />
                        </Modal>
                    )}
                </>
            );
        }
    };
};

const Image = withImageModal(ImageComponent);
