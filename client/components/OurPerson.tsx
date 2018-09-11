import * as React from 'react';
import * as classnames from 'classnames';
import {Person} from '@graphql-model';
import {Avatar, IconButton, Paper, Theme, Typography, withStyles} from '@material-ui/core';
import {fade} from '@material-ui/core/styles/colorManipulator';
import {ExpandMore as ExpandMoreIcon} from '@material-ui/icons';

interface Description {
    text: string;
    isLong: boolean;
}

interface OwnProps {
    person: Person;
}

interface Props extends OwnProps {
    showAll: boolean;
    description: Description;
    onClickShow: () => void;
}

const decorate = withStyles((theme: Theme) => ({
    paper: {
        textAlign: 'center' as 'center',
        minWidth: 260,
        height: 340,
        padding: '84px 16px',
        position: 'relative' as 'relative',
        marginTop: 64,
        boxShadow: `0px 8px 10px -5px ${fade(theme.palette.primary.main, 0.2)}, 0px 16px 24px 2px ${fade(
            theme.palette.primary.main,
            0.14,
        )}, 0px 6px 30px 5px ${fade(theme.palette.primary.main, 0.12)}`,
    },

    paperHeightAuto: {
        height: 'auto',
    },

    avatar: {
        width: 120,
        height: 120,
        position: 'absolute' as 'absolute',
        top: -60,
        left: '50%',
        transform: 'translateX(-50%)',
        boxShadow: `0 16px 38px -12px ${fade(theme.palette.common.black, 0.56)}, 0 4px 25px 0px ${fade(
            theme.palette.common.black,
            0.12,
        )}, 0 8px 10px -5px ${fade(theme.palette.common.black, 0.2)}`,
    },

    position: {
        marginBottom: 16,
    },

    linksWrapper: {
        position: 'absolute' as 'absolute',
        bottom: 8,
        left: 8,
    },

    link: {
        margin: 8,
        float: 'left' as 'left',
    },

    linkFacebook: {
        backgroundColor: '#415893',
    },

    linkLinkedIn: {
        backgroundColor: '#3374AF',
    },

    linkIcon: {
        color: theme.palette.common.white,
    },

    description: {
        textAlign: 'left' as any,
        color: theme.palette.grey[600],
        whiteSpace: 'pre-line' as any,
    },

    expand: {
        position: 'absolute' as any,
        right: 16,
        bottom: 12,
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.short,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
}));

const Component = decorate<Props>(({classes, person, description, onClickShow, showAll}) => {
    return (
        <Paper className={classnames(classes.paper, {[classes.paperHeightAuto]: showAll})} elevation={8}>
            <Avatar alt={`${person.firstName} ${person.lastName}`} src={person.fullImageSrc} className={classes.avatar} />
            <Typography variant="title">
                {person.firstName} {person.lastName}
            </Typography>
            <Typography className={classes.position}>{person.position}</Typography>
            <Typography className={classes.description}>{description.text}</Typography>
            {person.links && (
                <div className={classes.linksWrapper}>
                    {person.links.map((link) => (
                        <Avatar
                            key={link.name}
                            className={classnames(classes.link, {
                                [classes.linkFacebook]: link.icon.indexOf('facebook') !== -1,
                                [classes.linkLinkedIn]: link.icon.indexOf('linkedin') !== -1,
                            })}
                        >
                            <a href={link.url} target={link.external ? '_blank' : ''}>
                                <i className={classnames(link.icon, classes.linkIcon)} />
                            </a>
                        </Avatar>
                    ))}
                </div>
            )}

            {description.isLong && (
                <IconButton className={classnames(classes.expand, {[classes.expandOpen]: showAll})} onClick={onClickShow} aria-label="Show more">
                    <ExpandMoreIcon />
                </IconButton>
            )}
        </Paper>
    );
});

const MAX_LENGTH = 150;

const getShortDescription = (text: string): Description => {
    if (text.length > MAX_LENGTH) {
        return {text: `${text.substr(0, MAX_LENGTH)}...`, isLong: true};
    }
    return {text, isLong: false};
};

const withShowFullDescription = (BaseComponent: React.ComponentType<Props>): React.ComponentClass<OwnProps> => {
    interface State {
        description: Description;
        showAll: boolean;
    }

    return class extends React.Component<OwnProps, State> {
        constructor(props: OwnProps, context: any) {
            super(props, context);
            this.state = {
                description: getShortDescription(props.person.description),
                showAll: false,
            };
        }

        handleClickShow = () => {
            const {person} = this.props;
            const {description, showAll} = this.state;
            if (showAll) {
                this.setState({description: {...description, text: getShortDescription(person.description).text}, showAll: false});
            } else {
                this.setState({description: {...description, text: person.description}, showAll: true});
            }
        };

        render() {
            const {description, showAll} = this.state;
            return <BaseComponent {...this.props} description={description} showAll={showAll} onClickShow={this.handleClickShow} />;
        }
    };
};

export const OurPerson = withShowFullDescription(Component);
