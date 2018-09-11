import {ApolloServer, Config, gql} from 'apollo-server-express';
import * as jwt from 'jsonwebtoken';
import {importSchema} from 'graphql-import';
import {
    AdminService,
    BlogService,
    CompanyService,
    CreateInTechnologyService,
    LabelService,
    PageContentTextBlockService,
    PageService,
    PersonService,
    ProjectService,
    RemoteBlogService,
    SubheaderNotificationService,
    TechnologyService,
    GameService,
} from '../services';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

const resolvers = {
    Query: {
        games: () => GameService.findAllGames(),
        company: () => CompanyService.findDefault(),
        pages: () => PageService.findAll(),
        page: (_: any, {key}: any) => PageService.findByKey(key),
        pageContentTextBlock: (_: any, {id}: any) => PageContentTextBlockService.findById(id),
        createInTechnologies: () => CreateInTechnologyService.findAll(),
        technologies: () => TechnologyService.findAll(),
        technology: (_: any, {id}: any) => TechnologyService.findById(id),
        ourPeople: () => PersonService.findAllOurPeople(),
        homeReferences: () => PersonService.findAllHomeReferences(),
        trainingReferences: () => PersonService.findAllTrainingReferences(),
        projects: () => ProjectService.findAll(),
        latestRemoteBlogPosts: () => RemoteBlogService.findLatests(),
        admin: (_: any, __: any, context) => {
            if (!context.authAdmin || !context.authAdmin.login || !context.authAdmin.id) {
                throw new Error('Admin user is not logged');
            }
            return {
                me: () => AdminService.findById(context.authAdmin.id),
                admins: () => AdminService.findAll(),
                admin: ({id}: any) => AdminService.findById(id),
                pageContentTextBlocks: () => PageContentTextBlockService.findAll(),
                pageContentTextBlock: ({id}: any) => PageContentTextBlockService.findById(id),
                persons: () => PersonService.findAll(),
                person: ({id}: any) => PersonService.findById(id),
                projects: () => ProjectService.findAll(),
                project: ({id}) => ProjectService.findById(id),
                technologies: () => TechnologyService.findAll(),
                technology: ({id}) => TechnologyService.findById(id),
                companies: () => CompanyService.findAll(),
                company: ({id}) => CompanyService.findById(id),
                createInTechnologies: () => CreateInTechnologyService.findAll(),
                createInTechnology: ({id}) => CreateInTechnologyService.findById(id),
                pages: () => PageService.findAll(),
                page: ({id}) => PageService.findById(id),
                subheaderNotifications: () => SubheaderNotificationService.findAll(),
                subheaderNotification: ({id}) => SubheaderNotificationService.findById(id),
                blogPosts: BlogService.findAllPosts,
                blogPost: BlogService.findPostById,
                labels: LabelService.findAll,
                label: LabelService.findById,
            };
        },
        blog: () => {
            return {
                latestsPosts: BlogService.latestsPosts,
                findPostByKey: BlogService.findPostByKey,
            };
        },
    },
    Mutation: {
        game: () => {
            return {
                create:(input: any) => GameService.create(input)
            }
        },
        admin: (_: any, __: any, context) => {
            if (!context.authAdmin || !context.authAdmin.login) {
                throw new Error('Admin user is not logged');
            }
            return {
                admin: {
                    create: ({input}: any) => AdminService.create(input),
                    save: ({id, input}: any) => AdminService.save(id, input),
                },
                pageContentTextBlock: {
                    create: ({input}: any) => PageContentTextBlockService.create(input),
                    save: ({id, input}: any) => PageContentTextBlockService.save(id, input),
                },
                person: {
                    create: ({input}: any) => PersonService.create(input),
                    save: ({id, input}: any) => PersonService.save(id, input),
                },
                project: {
                    create: ({input}: any) => ProjectService.create(input),
                    save: ({id, input}: any) => ProjectService.save(id, input),
                },
                technology: {
                    create: ({input}: any) => TechnologyService.create(input),
                    save: ({id, input}: any) => TechnologyService.save(id, input),
                },
                company: {
                    create: ({input}: any) => CompanyService.create(input),
                    save: ({id, input}: any) => CompanyService.save(id, input),
                },
                createInTechnology: {
                    create: ({input}: any) => CreateInTechnologyService.create(input),
                    save: ({id, input}: any) => CreateInTechnologyService.save(id, input),
                },
                page: {
                    create: ({input}: any) => PageService.create(input),
                    save: ({id, input}: any) => PageService.save(id, input),
                },
                subheaderNotification: {
                    create: ({input}: any) => SubheaderNotificationService.create(input),
                    save: ({id, input}: any) => SubheaderNotificationService.save(id, input),
                },
                blog: {
                    post: {
                        create: BlogService.createPost,
                        save: BlogService.savePost,
                    },
                },
                label: {
                    create: LabelService.create,
                    save: LabelService.save,
                },
            };
        },
    },
};

export const createApolloServer = (secret: string, config?: Omit<Config, 'resolvers' | 'typeDefs'>): ApolloServer => {
    return new ApolloServer({
        ...config,
        playground: {
            settings: {
                // FIXME https://github.com/prisma/graphql-playground/issues/790
                'editor.cursorShape': 'line',
            } as any,
        },
        typeDefs: gql`
            ${importSchema('schema/root.graphql')}
        `,
        resolvers,
        context: async (context) => {
            // FIXME - doplnit kontrolu pres prihlaseni do databaze
            if (!!context.req.headers.authorization) {
                const decoded = jwt.verify(context.req.headers.authorization.replace('Bearer ', ''), secret);
                if (!!decoded) {
                    context.authAdmin = decoded;
                }
            }
            return context;
        },
    });
};
