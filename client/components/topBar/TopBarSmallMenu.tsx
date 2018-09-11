import * as React from 'react';
import {MouseEvent} from 'react';
import Router from 'next/router';
import {IconButton, Menu, MenuItem, Theme, withStyles} from '@material-ui/core';
import {MoreVert as MoreVertIcon} from '@material-ui/icons';
import {Page} from '@graphql-model';

interface Props {
    pageKey: string;
    pages: Page[];
    isOnTop: boolean;
}

interface ChildProps {
    onClickItem: (key: string) => void;
    anchorEl: EventTarget & HTMLElement | null;
    onClose: () => void;
    onClick: (event: MouseEvent<HTMLElement>) => void;
    loading: boolean;
}

const decorate = withStyles((theme: Theme) => ({
    colorOnTop: {
        color: theme.palette.common.white,
    },
    colorOffTop: {
        color: theme.palette.common.black,
    },
}));

const Component = decorate<Props & ChildProps>(({classes, isOnTop, pages, onClickItem, onClick, anchorEl, onClose, loading}) => {
    const handleClickItem = (key: string) => () => {
        onClickItem(key);
    };

    return (
        <>
            <IconButton
                className={isOnTop ? classes.colorOnTop : classes.colorOffTop}
                aria-label="Menu"
                aria-owns={anchorEl ? 'simple-menu' : undefined}
                aria-haspopup="true"
                onClick={onClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={onClose}>
                {pages.map(({name, key}) => (
                    <MenuItem key={name} onClick={handleClickItem(key)} disabled={loading}>
                        {name}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
});

const withState = (BaseComponent: React.ComponentType<Props & ChildProps>): React.ComponentClass<Props> => {
    interface State {
        anchorEl: EventTarget & HTMLElement | null;
        loading: boolean;
    }

    return class extends React.PureComponent<Props, State> {
        readonly state = {anchorEl: null, loading: false};

        handleClick = (event: MouseEvent<HTMLElement>) => {
            this.setState({anchorEl: event.currentTarget});
        };

        handleClose = () => {
            this.setState({anchorEl: null});
        };

        handleClickItem = (key: string) => {
            this.setState({loading: true});
            Router.push({pathname: '/', query: {id: key}}, `/${key}`).then(() => {
                this.setState({anchorEl: null, loading: false});
            });
        };

        render() {
            const {anchorEl, loading} = this.state;
            return (
                <BaseComponent
                    {...this.props}
                    onClickItem={this.handleClickItem}
                    onClose={this.handleClose}
                    anchorEl={anchorEl}
                    loading={loading}
                    onClick={this.handleClick}
                />
            );
        }
    };
};

export const TopBarSmallMenu = withState(Component);
