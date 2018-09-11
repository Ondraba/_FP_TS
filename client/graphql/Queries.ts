import gql from 'graphql-tag';

export const Queries = {
    contactSubheader: gql`
        query ContactSubheaderQuery {
            company {
                id
                address {
                    street
                    city
                    zipPostalCode
                }
                email
                phone
            }
        }
    `,

    footerAboutCompany: gql`
        query FooterAboutCompanyQuery {
            company {
                id
                name
                ic
                dic
                bankAccount
                courtDescription
            }
        }
    `,

    footerLogo: gql`
        query FooterLogoQuery {
            company {
                id
                name
                links {
                    id
                    name
                    icon
                    url
                    external
                }
            }
            createInTechnologies {
                id
                name
                icon
                url
                external
            }
        }
    `,

    topBar: gql`
        query TopBarQuery {
            pages {
                id
                key
                name
            }
        }
    `,

    footer: gql`
        query FooterQuery($key: String!) {
            page(key: $key) {
                id
                key
                name
                lastWhiteBlock
            }
        }
    `,

    page: gql`
        query PageQuery($key: String!) {
            page(key: $key) {
                id
                key
                title
                header {
                    id
                    descriptions {
                        id
                        text
                        order
                    }
                    fullImageSrc
                    buttons {
                        name
                        url
                        white
                        external
                    }
                }
                subheaderNotification {
                    id
                    text
                    links {
                        id
                        name
                        url
                        external
                    }
                }
                subheaderBlocks {
                    id
                    icon
                    title
                    subtitle
                }
                contentBlocks {
                    id
                    type
                    order
                    textBlock {
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
        }
    `,

    technologies: gql`
        query TechnologiesQuery {
            technologies {
                id
                name
                fullImageSrc
            }
        }
    `,

    technology: gql`
        query TechnologyQuery($id: ID!) {
            technology(id: $id) {
                id
                name
                fullImageSrc
                description
            }
        }
    `,

    ourPeople: gql`
        query OurPeopleQuery {
            ourPeople {
                id
                firstName
                lastName
                fullImageSrc
                position
                email
                phone
                description
                links {
                    name
                    url
                    icon
                    external
                }
            }
        }
    `,

    games: gql`
    query Games {
        games {
            _id
            title
            perex
            ranking
            platform
        }
    }
`,

    trainingReferences: gql`
        query TrainingReferencesQuery {
            trainingReferences {
                id
                firstName
                lastName
                fullImageSrc
                position
                description
            }
        }
    `,

    homeReferences: gql`
        query HomeReferencesQuery {
            homeReferences {
                id
                firstName
                lastName
                fullImageSrc
                position
                description
            }
        }
    `,

    projects: gql`
        query ProjectsQuery {
            projects {
                id
                name
                subtitle
                description
                fullImageSrc
                links {
                    id
                    name
                    url
                    icon
                    external
                }
            }
        }
    `,

    latestRemoteBlogPosts: gql`
        query LatestRemoteBlogPostsQuery {
            latestRemoteBlogPosts {
                id
                published
                updated
                url
                title
                author {
                    id
                    displayName
                    url
                    image {
                        url
                    }
                }
                imageUrl
                labels
            }
        }
    `,

    blog: {
        posts: gql`
            query BlogPosts {
                blog {
                    # TODO - je treba dodelat limit, apod
                    latestsPosts(limit: 1000) {
                        id
                        key
                        author
                        title
                        publishedDate
                        labels {
                            id
                            name
                        }
                    }
                }
            }
        `,
        post: gql`
            query BlogPost($key: String!) {
                blog {
                    findPostByKey(key: $key) {
                        id
                        key
                        title
                        subtitle
                        fullImageSrc
                        publishedDate
                        author
                        content
                        labels {
                            id
                            name
                        }
                    }
                }
            }
        `,
    },
};
