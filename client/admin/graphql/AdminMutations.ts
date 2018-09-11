import gql from 'graphql-tag';

export const AdminMutations = {
    admin: {
        create: gql`
            mutation AdminAdminCreate($input: AdminInput!) {
                admin {
                    admin {
                        create(input: $input) {
                            id
                        }
                    }
                }
            }
        `,
        save: gql`
            mutation AdminAdminSave($id: ID!, $input: AdminSaveInput!) {
                admin {
                    admin {
                        save(id: $id, input: $input) {
                            id
                        }
                    }
                }
            }
        `,
    },
    blog: {
        post: {
            create: gql`
                mutation AdminBlogPostCreate($input: BlogPostInput!) {
                    admin {
                        blog {
                            post {
                                create(input: $input) {
                                    id
                                }
                            }
                        }
                    }
                }
            `,
            save: gql`
                mutation AdminBlogPostSave($id: ID!, $input: BlogPostInput!) {
                    admin {
                        blog {
                            post {
                                save(id: $id, input: $input) {
                                    id
                                }
                            }
                        }
                    }
                }
            `,
        },
    },
    pageContentTextBlock: {
        create: gql`
            mutation AdminPageContentTextBlockCreate($input: PageContentTextBlockInput!) {
                admin {
                    pageContentTextBlock {
                        create(input: $input) {
                            id
                        }
                    }
                }
            }
        `,
        save: gql`
            mutation AdminPageContentTextBlockSave($id: ID!, $input: PageContentTextBlockInput!) {
                admin {
                    pageContentTextBlock {
                        save(id: $id, input: $input) {
                            id
                        }
                    }
                }
            }
        `,
    },

    person: {
        create: gql`
            mutation AdminPersonCreate($input: PersonInput!) {
                admin {
                    person {
                        create(input: $input) {
                            id
                        }
                    }
                }
            }
        `,
        save: gql`
            mutation AdminPersonSave($id: ID!, $input: PersonInput!) {
                admin {
                    person {
                        save(id: $id, input: $input) {
                            id
                        }
                    }
                }
            }
        `,
    },
    project: {
        create: gql`
            mutation AdminProjectCreate($input: ProjectInput!) {
                admin {
                    project {
                        create(input: $input) {
                            id
                        }
                    }
                }
            }
        `,
        save: gql`
            mutation AdminProjectSave($id: ID!, $input: ProjectInput!) {
                admin {
                    project {
                        save(id: $id, input: $input) {
                            id
                        }
                    }
                }
            }
        `,
    },
    technology: {
        create: gql`
            mutation AdminTechnologyCreate($input: TechnologyInput!) {
                admin {
                    technology {
                        create(input: $input) {
                            id
                        }
                    }
                }
            }
        `,
        save: gql`
            mutation AdminTechnologySave($id: ID!, $input: TechnologyInput!) {
                admin {
                    technology {
                        save(id: $id, input: $input) {
                            id
                        }
                    }
                }
            }
        `,
    },
    company: {
        create: gql`
            mutation AdminCompanyCreate($input: CompanyInput!) {
                admin {
                    company {
                        create(input: $input) {
                            id
                        }
                    }
                }
            }
        `,
        save: gql`
            mutation AdminCompanySave($id: ID!, $input: CompanyInput!) {
                admin {
                    company {
                        save(id: $id, input: $input) {
                            id
                        }
                    }
                }
            }
        `,
    },
    createInTechnology: {
        create: gql`
            mutation AdminCreateInTechnologyCreate($input: CreateInTechnologyInput!) {
                admin {
                    createInTechnology {
                        create(input: $input) {
                            id
                        }
                    }
                }
            }
        `,
        save: gql`
            mutation AdminCreateInTechnologySave($id: ID!, $input: CreateInTechnologyInput!) {
                admin {
                    createInTechnology {
                        save(id: $id, input: $input) {
                            id
                        }
                    }
                }
            }
        `,
    },
    subheaderNotification: {
        create: gql`
            mutation AdminSubheaderNotificationCreate($input: SubheaderNotificationInput!) {
                admin {
                    subheaderNotification {
                        create(input: $input) {
                            id
                        }
                    }
                }
            }
        `,
        save: gql`
            mutation AdminSubheaderNotificationSave($id: ID!, $input: SubheaderNotificationInput!) {
                admin {
                    subheaderNotification {
                        save(id: $id, input: $input) {
                            id
                        }
                    }
                }
            }
        `,
    },
    page: {
        create: gql`
            mutation AdminPageCreate($input: PageInput!) {
                admin {
                    page {
                        create(input: $input) {
                            id
                        }
                    }
                }
            }
        `,
        save: gql`
            mutation AdminPageSave($id: ID!, $input: PageInput!) {
                admin {
                    page {
                        save(id: $id, input: $input) {
                            id
                        }
                    }
                }
            }
        `,
    },

    label: {
        create: gql`
            mutation AdminLabelCreate($input: LabelInput!) {
                admin {
                    label {
                        create(input: $input) {
                            id
                        }
                    }
                }
            }
        `,
        save: gql`
            mutation AdminLabelSave($id: ID!, $input: LabelInput!) {
                admin {
                    label {
                        save(id: $id, input: $input) {
                            id
                        }
                    }
                }
            }
        `,
    },
};
