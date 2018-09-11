import * as React from 'react';
import {MouseEvent} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, LinearProgress, Slide, Theme, withStyles} from '@material-ui/core';
import {TransitionProps} from '@material-ui/core/transitions/transition';
import {fade} from '@material-ui/core/styles/colorManipulator';
import {Query as ApolloQuery} from 'react-apollo';
import {Technology, TechnologyQueryArgs} from '@graphql-model';
import {Queries} from '../graphql';
import {WrapperBlock} from '@client/components/WrapperBlock';

interface TechnologiesResponse {
    technologies: Technology[];
}

class TechnologiesQuery extends ApolloQuery<TechnologiesResponse> {}

interface TechnologyResponse {
    technology: Technology;
}

class TechnologyQuery extends ApolloQuery<TechnologyResponse, TechnologyQueryArgs> {}

interface Props {
    readonly onClick: (id: string) => void;
    readonly selectedId?: string;
    readonly onCloseDialog: () => void;
    readonly open: boolean;
}

const decorate = withStyles(({spacing: {unit}, palette: {common: {white, black}, primary}}: Theme) => ({
    techBlock: {
        padding: unit * 2,
        background: white,
        margin: 8,
        borderRadius: 3,
        boxShadow: `0px 8px 10px -5px ${fade(primary.main, 0.2)}, 0px 16px 24px 2px ${fade(primary.main, 0.14)}, 0px 6px 30px 5px ${fade(primary.main, 0.12)}`,
        transition: '.2s all',
        '&:hover': {
            cursor: 'pointer',
            boxShadow: `0px 5px 5px -3px ${fade(black, 0.2)}, 0px 8px 10px 1px ${fade(black, 0.14)}, 0px 3px 14px 2px ${fade(black, 0.12)}`,
        },
    } as any,

    techImg: {
        maxHeight: '100%',
        maxWidth: '100%',
    },

    '@keyframes fadeInSlow': {
        '0%': {opacity: 0},
        '50%': {opacity: 0},
        '100%': {opacity: 1},
    },

    techDetailImg: {
        maxWidth: '30%',
        float: 'left' as any,
        margin: 16,
    },
}));

const animation = (index: number) => `fadeInSlow ${1 + (index + 1) / 8}s`;

const TransitionUp = (props: TransitionProps) => <Slide direction="up" {...props} />;

const Component = decorate<Props>(({classes, onClick, selectedId, onCloseDialog, open}) => {
    const handleOnClick = (id: string) => (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
        onClick(id);
    };

    return (
        <>
            <WrapperBlock paperBackground>
                <TechnologiesQuery query={Queries.technologies}>
                    {({loading, data}) => {
                        if (loading || !data || !data.technologies) {
                            return null;
                        }
                        return (
                            <Grid container spacing={8}>
                                {data.technologies.map(({id, name, fullImageSrc}, index) => (
                                    <Grid
                                        key={id}
                                        item
                                        className={classes.techBlock}
                                        style={{height: 50, animation: animation(index)}}
                                        onClick={handleOnClick(id)}
                                    >
                                        <img src={fullImageSrc} className={classes.techImg} title={name} alt={name} />
                                    </Grid>
                                ))}
                            </Grid>
                        );
                    }}
                </TechnologiesQuery>
            </WrapperBlock>
            {!!selectedId && (
                <TechnologyQuery query={Queries.technology} variables={{id: selectedId}}>
                    {({loading, data}) => {
                        return (
                            <Dialog open={open} onClose={onCloseDialog} TransitionComponent={TransitionUp}>
                                {loading && <LinearProgress />}
                                {data &&
                                    data.technology && (
                                        <>
                                            <DialogTitle>{data.technology.name}</DialogTitle>
                                            <DialogContent>
                                                <img
                                                    src={data.technology.fullImageSrc}
                                                    className={classes.techDetailImg}
                                                    title={data.technology.name}
                                                    alt={data.technology.name}
                                                />
                                                <DialogContentText>{data.technology.description}</DialogContentText>
                                            </DialogContent>
                                        </>
                                    )}
                                <DialogActions>
                                    <Button color="primary" onClick={onCloseDialog}>
                                        Zavřít
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        );
                    }}
                </TechnologyQuery>
            )}
        </>
    );
});

interface WithStateProps {}

const withState = (BaseComponent: React.ComponentType<Props>): React.ComponentClass<WithStateProps> => {
    const initialState = {
        isOpenModal: false,
        selectedId: undefined,
    };

    interface State {
        isOpenModal: boolean;
        selectedId?: string;
    }

    return class extends React.PureComponent<WithStateProps, State> {
        readonly state = initialState;

        handleClickBlock = (id: string) => {
            this.setState({isOpenModal: true, selectedId: id});
        };

        handleCloseDialogBlock = () => {
            this.setState({isOpenModal: false, selectedId: undefined});
        };

        render() {
            const {isOpenModal, selectedId} = this.state;
            return <BaseComponent open={isOpenModal} onCloseDialog={this.handleCloseDialogBlock} onClick={this.handleClickBlock} selectedId={selectedId} />;
        }
    };
};

export const Technologies = withState(Component);
