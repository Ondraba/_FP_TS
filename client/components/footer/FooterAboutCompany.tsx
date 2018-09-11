import * as React from 'react';
import {Theme, Typography, withStyles} from '@material-ui/core';
import {FooterTitle} from './FooterTitle';
import {DetailValue} from '../DetailValue';
import {ChildDataProps, graphql} from 'react-apollo';
import {Company} from '@graphql-model';
import {Queries} from '../../graphql';
import {Lang} from '../../Lang';

interface Response {
    company: Company;
}

interface Props {}

interface ChildProps extends Props, ChildDataProps<unknown, Response> {}

const decorate = withStyles((theme: Theme) => ({
    description: {
        color: theme.palette.common.white,
        fontStyle: 'italic' as 'italic',
    },
}));

const Component = decorate<ChildProps>(({classes, data: {loading, company}}) => {
    if (loading || !company) {
        return null;
    }
    return (
        <>
            <FooterTitle title={Lang.FOOTER_ABOUT_COMPANY} />
            <DetailValue title={Lang.COMPANY_NAME} value={company.name} />
            <DetailValue title={Lang.COMPANY_IC} value={company.ic} />
            <DetailValue title={Lang.COMPANY_DIC} value={company.dic} />
            <DetailValue title={Lang.COMPANY_BANKACCOUNT} value={company.bankAccount} />
            <Typography className={classes.description}>{company.courtDescription}</Typography>
        </>
    );
});

const withCompany = graphql<Props, Response, {}, ChildProps>(Queries.footerAboutCompany);

export const FooterAboutCompany = withCompany(Component);
