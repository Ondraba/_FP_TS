import gql from 'graphql-tag';

export const AdminQueries = {
    admins: gql`
        query AdminAdmins {
            admin {
                admins {
                    id
                    login
                    firstName
                    lastName
                }
            }
        }
    `,

    admin: gql`
        query AdminAdmin($id: ID!) {
            admin {
                admin(id: $id) {
                    id
                    login
                    firstName
                    lastName
                }
            }
        }
    `,

    blogPosts: gql`
        query AdminBlogs {
            admin {
                blogPosts {
                    id
                    key
                    author
                    title
                    published
                    publishedDate
                }
            }
        }
    `,

    blogPost: gql`
        query AdminBlog($id: ID!) {
            admin {
                blogPost(id: $id) {
                    id
                    key
                    author
                    title
                    subtitle
                    imageSrc
                    published
                    publishedDate
                    content
                    labels {
                        id
                        name
                    }
                }
            }
        }
    `,

    pageContentTextBlocks: gql`
        query AdminPageContentTextBlocks {
            admin {
                pageContentTextBlocks {
                    id
                    title
                    subtitle
                }
            }
        }
    `,
    pageContentTextBlock: gql`
        query AdminPageContentTextBlock($id: ID!) {
            admin {
                pageContentTextBlock(id: $id) {
                    id
                    title
                    subtitle
                    listItems
                    richText {
                        id
                        blocks {
                            id
                            key
                            text
                            type
                            depth
                            inlineStyleRanges {
                                id
                                offset
                                length
                                style
                            }
                            entityRanges {
                                id
                                offset
                                length
                                key
                            }
                            data {
                                id
                            }
                        }
                        entityMap {
                            type
                            mutability
                            data {
                                __typename
                            }
                        }
                    }
                }
            }
        }
    `,

    persons: gql`
        query AdminPersons {
            admin {
                persons {
                    id
                    firstName
                    lastName
                    position
                    fullImageSrc
                    our
                    homeReference
                    trainingReference
                    phone
                    email
                    order
                }
            }
        }
    `,

    person: gql`
        query AdminPerson($id: ID!) {
            admin {
                person(id: $id) {
                    id
                    firstName
                    lastName
                    position
                    imageSrc
                    description
                    our
                    homeReference
                    trainingReference
                    phone
                    email
                    order
                    links {
                        name
                        icon
                        url
                        external
                        order
                    }
                }
            }
        }
    `,

    projects: gql`
        query AdminProjects {
            admin {
                projects {
                    id
                    name
                    subtitle
                    fullImageSrc
                    order
                    links {
                        id
                        name
                        icon
                        url
                        external
                        order
                    }
                }
            }
        }
    `,

    project: gql`
        query AdminProject($id: ID!) {
            admin {
                project(id: $id) {
                    id
                    name
                    subtitle
                    imageSrc
                    description
                    order
                    links {
                        id
                        name
                        icon
                        url
                        external
                        order
                    }
                }
            }
        }
    `,

    technologies: gql`
        query AdminTechnologies {
            admin {
                technologies {
                    id
                    name
                    fullImageSrc
                    order
                }
            }
        }
    `,

    technology: gql`
        query AdminTechnology($id: ID!) {
            admin {
                technology(id: $id) {
                    id
                    name
                    description
                    imageSrc
                    order
                }
            }
        }
    `,

    companies: gql`
        query AdminCompanies {
            admin {
                companies {
                    id
                    name
                    ic
                    default
                }
            }
        }
    `,

    company: gql`
        query AdminCompany($id: ID!) {
            admin {
                company(id: $id) {
                    id
                    name
                    ic
                    dic
                    bankAccount
                    courtDescription
                    phone
                    email
                    address {
                        city
                        street
                        zipPostalCode
                    }
                    default
                    links {
                        id
                        name
                        icon
                        url
                        external
                        order
                    }
                }
            }
        }
    `,
    createInTechnologies: gql`
        query AdminCreateInTechnologies {
            admin {
                createInTechnologies {
                    id
                    name
                    icon
                    url
                    external
                    order
                }
            }
        }
    `,

    createInTechnology: gql`
        query AdminCreateInTechnology($id: ID!) {
            admin {
                createInTechnology(id: $id) {
                    id
                    name
                    icon
                    url
                    external
                    order
                }
            }
        }
    `,
    subheaderNotifications: gql`
        query AdminSubheaderNotifications {
            admin {
                subheaderNotifications {
                    id
                    text
                }
            }
        }
    `,

    subheaderNotification: gql`
        query AdminSubheaderNotification($id: ID!) {
            admin {
                subheaderNotification(id: $id) {
                    id
                    text
                    links {
                        id
                        name
                        url
                        external
                        order
                    }
                }
            }
        }
    `,
    pages: gql`
        query AdminPages {
            admin {
                pages {
                    id
                    key
                    order
                    title
                    name
                }
            }
        }
    `,

    page: gql`
        query AdminPage($id: ID!) {
            admin {
                page(id: $id) {
                    id
                    key
                    title
                    name
                    lastWhiteBlock
                    order
                    header {
                        id
                        imageSrc
                        descriptions {
                            id
                            text
                            order
                        }
                        buttons {
                            id
                            name
                            url
                            white
                            order
                            external
                        }
                    }
                    subheaderBlocks {
                        id
                        title
                        subtitle
                        icon
                        order
                    }
                    subheaderNotification {
                        id
                    }
                    contentBlocks {
                        id
                        type
                        textBlock {
                            id
                        }
                        order
                    }
                }
            }
        }
    `,

    labels: gql`
        query AdminLabels {
            admin {
                labels {
                    id
                    name
                }
            }
        }
    `,

    label: gql`
        query AdminLabel($id: ID!) {
            admin {
                label(id: $id) {
                    id
                    name
                }
            }
        }
    `,
};
