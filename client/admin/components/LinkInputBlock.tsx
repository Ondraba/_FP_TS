import * as React from 'react';
import {ChangeEvent} from 'react';
import {Button, Checkbox, Grid, IconButton, Input, Table, TableBody, TableCell, TableHead, TableRow, Typography, withStyles} from '@material-ui/core';
import {Remove as RemoveIcon} from '@material-ui/icons';
import {LinkInput} from '@graphql-model';

interface Props {
    onAddNew: () => void;
    onChange: (index: number, name: keyof LinkInput, value: string | boolean) => void;
    onRemove: (index: number) => void;
    links?: LinkInput[] | null;
}

const decorate = withStyles(() => ({}));

export const LinkInputBlock = decorate<Props>(({onChange, onAddNew, onRemove, links}) => {
    const handleChangeText = (index: number, name: keyof LinkInput) => (e: ChangeEvent<HTMLInputElement>) => {
        onChange(index, name, e.target.value);
    };
    const handleChangeCheckbox = (index: number, name: keyof LinkInput) => (e: ChangeEvent<HTMLInputElement>) => {
        onChange(index, name, e.target.checked);
    };

    const handleRemove = (index: number) => () => {
        onRemove(index);
    };

    return (
        <Grid>
            <Grid item xs={12}>
                <Typography variant="title">Links</Typography>
                <Button onClick={onAddNew}>Add link</Button>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Icon</TableCell>
                            <TableCell>Url</TableCell>
                            <TableCell>External</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(links || []).map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <Input
                                        placeholder="Name"
                                        inputProps={{'aria-label': 'Name'}}
                                        value={row.name}
                                        onChange={handleChangeText(index, 'name')}
                                        fullWidth
                                    />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        placeholder="Icon"
                                        inputProps={{'aria-label': 'Icon'}}
                                        value={row.icon}
                                        onChange={handleChangeText(index, 'icon')}
                                        fullWidth
                                    />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        placeholder="Url"
                                        inputProps={{'aria-label': 'Url'}}
                                        value={row.url}
                                        onChange={handleChangeText(index, 'url')}
                                        fullWidth
                                    />
                                </TableCell>
                                <TableCell>
                                    <Checkbox checked={row.external} onChange={handleChangeCheckbox(index, 'external')} value="external" />
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={handleRemove(index)}>
                                        <RemoveIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Grid>
        </Grid>
    );
});

export const addLink = (links?: LinkInput[] | null): LinkInput[] => {
    const existLinks = links || [];
    return [...existLinks, {name: '', icon: '', url: '', external: true, order: existLinks.length + 1}];
};

export const changeLink = (index: number, name: keyof LinkInput, value: string | boolean, links?: LinkInput[] | null) => {
    return (links || []).map((m, i) => (i === index ? {...m, [name]: value} : m));
};

export const removeLink = (index, links?: LinkInput[] | null): LinkInput[] => (links || []).filter((_, i) => i !== index);
