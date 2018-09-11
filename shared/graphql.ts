/* tslint:disable */
import {GraphQLResolveInfo} from 'graphql';

export type Resolver<Result, Parent = any, Context = any, Args = any> = (
    parent: Parent,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo,
) => Promise<Result> | Result;

export type SubscriptionResolver<Result, Parent = any, Context = any, Args = any> = {
    subscribe<R = Result, P = Parent>(parent: P, args: Args, context: Context, info: GraphQLResolveInfo): AsyncIterator<R | Result>;
    resolve?<R = Result, P = Parent>(parent: P, args: Args, context: Context, info: GraphQLResolveInfo): R | Result | Promise<R | Result>;
};

export interface Query {
    admin?: AdminQuery | null;
    blog?: BlogQuery | null;
    company: Company;
    pages: Page[];
    page: Page;
    pageContentTextBlock: PageContentTextBlock;
    createInTechnologies: CreateInTechnology[];
    technologies: Technology[];
    technology: Technology;
    ourPeople: Person[];
    trainingReferences: Person[];
    homeReferences: Person[];
    projects: Project[];
    latestRemoteBlogPosts?: RemoteBlog[] | null;
    labels?: Label | null;
    games: Game[];
}

export interface AdminQuery {
    me: Admin;
    admins: Admin[];
    admin: Admin;
    pageContentTextBlocks: PageContentTextBlock[];
    pageContentTextBlock: PageContentTextBlock;
    persons: Person[];
    person: Person;
    projects: Project[];
    project: Project;
    technologies: Technology[];
    technology: Technology;
    companies: Company[];
    company: Company;
    createInTechnologies: CreateInTechnology[];
    createInTechnology: CreateInTechnology;
    pages: Page[];
    page: Page;
    subheaderNotifications: SubheaderNotification[];
    subheaderNotification: SubheaderNotification;
    blogPosts: BlogPost[];
    blogPost: BlogPost;
    labels: Label[];
    label: Label;
}

export interface Admin {
    id: string;
    login: string;
    firstName: string;
    lastName: string;
}

export interface PageContentTextBlock {
    id: string;
    title: string;
    subtitle: string;
    listItems?: string[] | null;
    richText?: RichText | null;
}

export interface RichText {
    id: string;
    blocks: RichTextBlock[];
    entityMap?: RichTextEntity[] | null;
}

export interface RichTextBlock {
    id: string;
    key: string;
    text: string;
    type: string;
    depth: number;
    inlineStyleRanges?: RichTextInlineStyleRange[] | null;
    entityRanges?: RichTextEntityRange[] | null;
    data: RichTextData;
}

export interface RichTextInlineStyleRange {
    id: string;
    offset: number;
    length: number;
    style: string;
}

export interface RichTextEntityRange {
    id: string;
    offset: number;
    length: number;
    key: number;
}

export interface RichTextData {
    id?: string | null;
}

export interface RichTextEntity {
    type?: RichTextEntityType | null;
    mutability?: RichTextEntityMutability | null;
    data?: RichTextEntityData | null;
}

export interface RichTextLinkData {
    type?: string | null;
    href?: string | null;
    target?: string | null;
}

export interface RichTextEmbedData {
    type?: string | null;
    url?: string | null;
    html?: string | null;
}

export interface Person {
    id: string;
    firstName: string;
    lastName: string;
    position: string;
    imageSrc: string;
    fullImageSrc: string;
    description: string;
    our: boolean;
    homeReference: boolean;
    trainingReference: boolean;
    links?: Link[] | null;
    phone?: string | null;
    email?: string | null;
    order: number;
}

export interface Link {
    id: string;
    name: string;
    icon: string;
    url: string;
    external: boolean;
    order: number;
}

export interface Project {
    id: string;
    name: string;
    subtitle: string;
    description: string;
    imageSrc: string;
    fullImageSrc: string;
    links?: Link[] | null;
    order: number;
}

export interface Technology {
    id: string;
    name: string;
    description: string;
    imageSrc: string;
    fullImageSrc: string;
    order: number;
}

export interface Company {
    id: string;
    name: string;
    ic: string;
    dic: string;
    bankAccount: string;
    courtDescription: string;
    phone: string;
    email: string;
    address: CompanyAddress;
    links: Link[];
    default: boolean;
}

export interface CompanyAddress {
    street: string;
    city: string;
    zipPostalCode: string;
}

export interface CreateInTechnology {
    id: string;
    name: string;
    icon: string;
    url: string;
    external: boolean;
    order: number;
}

export interface Page {
    id: string;
    key: string;
    name: string;
    title: string;
    lastWhiteBlock: boolean;
    header: PageHeader;
    subheaderBlocks?: SubheaderBlock[] | null;
    subheaderNotification?: SubheaderNotification | null;
    contentBlocks?: PageContentBlock[] | null;
    order: number;
}

export interface PageHeader {
    id: string;
    descriptions: PageHeaderDescription[];
    imageSrc: string;
    fullImageSrc: string;
    buttons?: PageHeaderButton[] | null;
}

export interface PageHeaderDescription {
    id: string;
    text: string;
    order: number;
}

export interface PageHeaderButton {
    id: string;
    name: string;
    url: string;
    white: boolean;
    external: boolean;
    order: number;
}

export interface SubheaderBlock {
    id: string;
    icon: string;
    title: string;
    subtitle: string;
    order: number;
}

export interface SubheaderNotification {
    id: string;
    text: string;
    links?: SubheaderNotificationLink[] | null;
}

export interface SubheaderNotificationLink {
    id: string;
    name: string;
    url: string;
    external: boolean;
    order: number;
}

export interface PageContentBlock {
    id: string;
    type: PageContentType;
    textBlock?: PageContentTextBlock | null;
    order: number;
}

export interface BlogPost {
    id: string;
    key: string;
    title: string;
    subtitle: string;
    imageSrc: string;
    fullImageSrc: string;
    published: boolean;
    publishedDate: string;
    author: string;
    content: string;
    labels: Label[];
}

export interface Label {
    id: string;
    name: string;
}

export interface BlogQuery {
    latestsPosts?: BlogPost[] | null;
    findPostByKey?: BlogPost | null;
}

export interface RemoteBlog {
    id: string;
    published?: string | null;
    updated?: string | null;
    url?: string | null;
    title?: string | null;
    author?: RemoteBlogAuthor | null;
    imageUrl?: string | null;
    labels?: string[] | null;
}

export interface RemoteBlogAuthor {
    id: string;
    displayName?: string | null;
    url?: string | null;
    image?: RemoteBlogAuthorImage | null;
}

export interface RemoteBlogAuthorImage {
    url?: string | null;
}

export interface Game {
    _id: string;
    title: string;
    perex: string;
    ranking: number;
    platform: string;
}

export interface Mutation {
    admin?: AdminMutation | null;
    game?: MutationGame | null;
}

export interface AdminMutation {
    admin: AdminMutationAdmin;
    pageContentTextBlock: AdminMutationPageContentTextBlock;
    person: AdminMutationPerson;
    project: AdminMutationProject;
    technology: AdminMutationTechnology;
    company: AdminMutationCompany;
    createInTechnology: AdminMutationCreateInTechnology;
    subheaderNotification: AdminMutationSubheaderNotification;
    page: AdminMutationPage;
    blog: AdminMutationBlog;
    label: AdminMutationLabel;
}

export interface AdminMutationAdmin {
    create: Admin;
    save: Admin;
}

export interface AdminMutationPageContentTextBlock {
    create: PageContentTextBlock;
    save: PageContentTextBlock;
}

export interface AdminMutationPerson {
    create: Person;
    save: Person;
}

export interface AdminMutationProject {
    create: Project;
    save: Project;
}

export interface AdminMutationTechnology {
    create: Technology;
    save: Technology;
}

export interface AdminMutationCompany {
    create: Company;
    save: Company;
}

export interface AdminMutationCreateInTechnology {
    create: CreateInTechnology;
    save: CreateInTechnology;
}

export interface AdminMutationSubheaderNotification {
    create: SubheaderNotification;
    save: SubheaderNotification;
}

export interface AdminMutationPage {
    create: Page;
    save: Page;
}

export interface AdminMutationBlog {
    post: AdminMutationPostBlog;
}

export interface AdminMutationPostBlog {
    create: BlogPost;
    save: BlogPost;
}

export interface AdminMutationLabel {
    create: Label;
    save: Label;
}

export interface MutationGame {
    create: Game;
}

export interface AdminInput {
    login: string;
    firstName: string;
    lastName: string;
    password: string;
    passwordAgain: string;
}

export interface AdminSaveInput {
    login: string;
    firstName: string;
    lastName: string;
    password?: string | null;
    passwordAgain?: string | null;
}

export interface PageContentTextBlockInput {
    title: string;
    subtitle: string;
    listItems?: string[] | null;
    richText?: RichTextInput | null;
}

export interface RichTextInput {
    blocks: RichTextBlockInput[];
    entityMap?: RichTextEntityInput[] | null;
}

export interface RichTextBlockInput {
    key: string;
    text: string;
    type: string;
    depth: number;
    inlineStyleRanges?: RichTextInlineStyleRangeInput[] | null;
    entityRanges?: RichTextEntityRangeInput[] | null;
    data: RichTextDataInput;
}

export interface RichTextInlineStyleRangeInput {
    offset: number;
    length: number;
    style: string;
}

export interface RichTextEntityRangeInput {
    offset: number;
    length: number;
    key: number;
}

export interface RichTextDataInput {
    id?: string | null;
}

export interface RichTextEntityInput {
    type?: RichTextEntityType | null;
    mutability?: RichTextEntityMutability | null;
    data?: RichTextEntityDataInput | null;
}

export interface RichTextEntityDataInput {
    type: string;
    url?: string | null;
    html?: string | null;
    href?: string | null;
    target?: string | null;
}

export interface PersonInput {
    firstName: string;
    lastName: string;
    position: string;
    imageSrc: string;
    description: string;
    our: boolean;
    homeReference: boolean;
    trainingReference: boolean;
    links?: LinkInput[] | null;
    phone?: string | null;
    email?: string | null;
    order: number;
}

export interface LinkInput {
    name: string;
    icon: string;
    url: string;
    external: boolean;
    order: number;
}

export interface ProjectInput {
    name: string;
    subtitle: string;
    description: string;
    imageSrc: string;
    links?: LinkInput[] | null;
    order: number;
}

export interface TechnologyInput {
    name: string;
    description: string;
    imageSrc: string;
    order: number;
}

export interface CompanyInput {
    name: string;
    ic: string;
    dic: string;
    bankAccount: string;
    courtDescription: string;
    phone: string;
    email: string;
    street: string;
    city: string;
    zipPostalCode: string;
    links: LinkInput[];
    default: boolean;
}

export interface CreateInTechnologyInput {
    name: string;
    icon: string;
    url: string;
    external: boolean;
    order: number;
}

export interface SubheaderNotificationInput {
    text: string;
    links?: SubheaderNotificationLinkInput[] | null;
}

export interface SubheaderNotificationLinkInput {
    name: string;
    url: string;
    external: boolean;
    order: number;
}

export interface PageInput {
    key: string;
    title: string;
    name: string;
    lastWhiteBlock: boolean;
    header: PageHeaderInput;
    subheaderBlocks?: PageSubheaderBlockInput[] | null;
    subheaderNotification?: string | null;
    contentBlocks?: PageContentBlockInput[] | null;
    order: number;
}

export interface PageHeaderInput {
    descriptions: PageHeaderDescriptionInput[];
    imageSrc: string;
    buttons?: PageHeaderButtonInput[] | null;
}

export interface PageHeaderDescriptionInput {
    text: string;
    order: number;
}

export interface PageHeaderButtonInput {
    name: string;
    url: string;
    white: boolean;
    external: boolean;
    order: number;
}

export interface PageSubheaderBlockInput {
    icon: string;
    title: string;
    subtitle: string;
    order: number;
}

export interface PageContentBlockInput {
    type: PageContentType;
    textBlock?: string | null;
    order: number;
}

export interface BlogPostInput {
    key: string;
    title: string;
    subtitle: string;
    imageSrc: string;
    published: boolean;
    publishedDate: string;
    author: string;
    content: string;
    labels: string[];
}

export interface LabelInput {
    name: string;
}

export interface GameInput {
    title: string;
    perex: string;
    ranking: number;
    platform: string;
}
export interface PageQueryArgs {
    key: string;
}
export interface PageContentTextBlockQueryArgs {
    id: string;
}
export interface TechnologyQueryArgs {
    id: string;
}
export interface AdminAdminQueryArgs {
    id: string;
}
export interface PageContentTextBlockAdminQueryArgs {
    id: string;
}
export interface PersonAdminQueryArgs {
    id: string;
}
export interface ProjectAdminQueryArgs {
    id: string;
}
export interface TechnologyAdminQueryArgs {
    id: string;
}
export interface CompanyAdminQueryArgs {
    id: string;
}
export interface CreateInTechnologyAdminQueryArgs {
    id: string;
}
export interface PageAdminQueryArgs {
    id: string;
}
export interface SubheaderNotificationAdminQueryArgs {
    id: string;
}
export interface BlogPostAdminQueryArgs {
    id: string;
}
export interface LabelAdminQueryArgs {
    id: string;
}
export interface LatestsPostsBlogQueryArgs {
    limit: number;
}
export interface FindPostByKeyBlogQueryArgs {
    key: string;
}
export interface CreateAdminMutationAdminArgs {
    input: AdminInput;
}
export interface SaveAdminMutationAdminArgs {
    id: string;
    input: AdminSaveInput;
}
export interface CreateAdminMutationPageContentTextBlockArgs {
    input: PageContentTextBlockInput;
}
export interface SaveAdminMutationPageContentTextBlockArgs {
    id: string;
    input: PageContentTextBlockInput;
}
export interface CreateAdminMutationPersonArgs {
    input: PersonInput;
}
export interface SaveAdminMutationPersonArgs {
    id: string;
    input: PersonInput;
}
export interface CreateAdminMutationProjectArgs {
    input: ProjectInput;
}
export interface SaveAdminMutationProjectArgs {
    id: string;
    input: ProjectInput;
}
export interface CreateAdminMutationTechnologyArgs {
    input: TechnologyInput;
}
export interface SaveAdminMutationTechnologyArgs {
    id: string;
    input: TechnologyInput;
}
export interface CreateAdminMutationCompanyArgs {
    input: CompanyInput;
}
export interface SaveAdminMutationCompanyArgs {
    id: string;
    input: CompanyInput;
}
export interface CreateAdminMutationCreateInTechnologyArgs {
    input: CreateInTechnologyInput;
}
export interface SaveAdminMutationCreateInTechnologyArgs {
    id: string;
    input: CreateInTechnologyInput;
}
export interface CreateAdminMutationSubheaderNotificationArgs {
    input: SubheaderNotificationInput;
}
export interface SaveAdminMutationSubheaderNotificationArgs {
    id: string;
    input: SubheaderNotificationInput;
}
export interface CreateAdminMutationPageArgs {
    input: PageInput;
}
export interface SaveAdminMutationPageArgs {
    id: string;
    input: PageInput;
}
export interface CreateAdminMutationPostBlogArgs {
    input: BlogPostInput;
}
export interface SaveAdminMutationPostBlogArgs {
    id: string;
    input: BlogPostInput;
}
export interface CreateAdminMutationLabelArgs {
    input: LabelInput;
}
export interface SaveAdminMutationLabelArgs {
    id: string;
    input: LabelInput;
}
export interface CreateMutationGameArgs {
    input: GameInput;
}

export enum RichTextEntityType {
    LINK = 'LINK',
    TOKEN = 'TOKEN',
    PHOTO = 'PHOTO',
    IMAGE = 'IMAGE',
    EMBED = 'EMBED',
}

export enum RichTextEntityMutability {
    MUTABLE = 'MUTABLE',
    IMMUTABLE = 'IMMUTABLE',
    SEGMENTED = 'SEGMENTED',
}

export enum PageContentType {
    PROJECTS = 'PROJECTS',
    GOOGLE_MAP = 'GOOGLE_MAP',
    OUR_PEOPLE = 'OUR_PEOPLE',
    TRAINING_REFERENCE = 'TRAINING_REFERENCE',
    HOME_REFERENCE = 'HOME_REFERENCE',
    TECHNOLOGIES = 'TECHNOLOGIES',
    TEXT = 'TEXT',
    BLOG_CAROUSEL = 'BLOG_CAROUSEL',
}

export type RichTextEntityData = RichTextLinkData | RichTextEmbedData;

export interface QueryResolvers<Context = any> {
    admin?: QueryAdminResolver<AdminQuery | null, any, Context>;
    blog?: QueryBlogResolver<BlogQuery | null, any, Context>;
    company?: QueryCompanyResolver<Company, any, Context>;
    pages?: QueryPagesResolver<Page[], any, Context>;
    page?: QueryPageResolver<Page, any, Context>;
    pageContentTextBlock?: QueryPageContentTextBlockResolver<PageContentTextBlock, any, Context>;
    createInTechnologies?: QueryCreateInTechnologiesResolver<CreateInTechnology[], any, Context>;
    technologies?: QueryTechnologiesResolver<Technology[], any, Context>;
    technology?: QueryTechnologyResolver<Technology, any, Context>;
    ourPeople?: QueryOurPeopleResolver<Person[], any, Context>;
    trainingReferences?: QueryTrainingReferencesResolver<Person[], any, Context>;
    homeReferences?: QueryHomeReferencesResolver<Person[], any, Context>;
    projects?: QueryProjectsResolver<Project[], any, Context>;
    latestRemoteBlogPosts?: QueryLatestRemoteBlogPostsResolver<RemoteBlog[] | null, any, Context>;
    labels?: QueryLabelsResolver<Label | null, any, Context>;
    games?: QueryGamesResolver<Game[], any, Context>;
}

export type QueryAdminResolver<R = AdminQuery | null, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type QueryBlogResolver<R = BlogQuery | null, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type QueryCompanyResolver<R = Company, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type QueryPagesResolver<R = Page[], Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type QueryPageResolver<R = Page, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export interface QueryPageArgs {
    key: string;
}

export type QueryPageContentTextBlockResolver<R = PageContentTextBlock, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export interface QueryPageContentTextBlockArgs {
    id: string;
}

export type QueryCreateInTechnologiesResolver<R = CreateInTechnology[], Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type QueryTechnologiesResolver<R = Technology[], Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type QueryTechnologyResolver<R = Technology, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export interface QueryTechnologyArgs {
    id: string;
}

export type QueryOurPeopleResolver<R = Person[], Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type QueryTrainingReferencesResolver<R = Person[], Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type QueryHomeReferencesResolver<R = Person[], Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type QueryProjectsResolver<R = Project[], Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type QueryLatestRemoteBlogPostsResolver<R = RemoteBlog[] | null, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type QueryLabelsResolver<R = Label | null, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type QueryGamesResolver<R = Game[], Parent = any, Context = any> = Resolver<R, Parent, Context>;

export interface AdminQueryResolvers<Context = any> {
    me?: AdminQueryMeResolver<Admin, any, Context>;
    admins?: AdminQueryAdminsResolver<Admin[], any, Context>;
    admin?: AdminQueryAdminResolver<Admin, any, Context>;
    pageContentTextBlocks?: AdminQueryPageContentTextBlocksResolver<PageContentTextBlock[], any, Context>;
    pageContentTextBlock?: AdminQueryPageContentTextBlockResolver<PageContentTextBlock, any, Context>;
    persons?: AdminQueryPersonsResolver<Person[], any, Context>;
    person?: AdminQueryPersonResolver<Person, any, Context>;
    projects?: AdminQueryProjectsResolver<Project[], any, Context>;
    project?: AdminQueryProjectResolver<Project, any, Context>;
    technologies?: AdminQueryTechnologiesResolver<Technology[], any, Context>;
    technology?: AdminQueryTechnologyResolver<Technology, any, Context>;
    companies?: AdminQueryCompaniesResolver<Company[], any, Context>;
    company?: AdminQueryCompanyResolver<Company, any, Context>;
    createInTechnologies?: AdminQueryCreateInTechnologiesResolver<CreateInTechnology[], any, Context>;
    createInTechnology?: AdminQueryCreateInTechnologyResolver<CreateInTechnology, any, Context>;
    pages?: AdminQueryPagesResolver<Page[], any, Context>;
    page?: AdminQueryPageResolver<Page, any, Context>;
    subheaderNotifications?: AdminQuerySubheaderNotificationsResolver<SubheaderNotification[], any, Context>;
    subheaderNotification?: AdminQuerySubheaderNotificationResolver<SubheaderNotification, any, Context>;
    blogPosts?: AdminQueryBlogPostsResolver<BlogPost[], any, Context>;
    blogPost?: AdminQueryBlogPostResolver<BlogPost, any, Context>;
    labels?: AdminQueryLabelsResolver<Label[], any, Context>;
    label?: AdminQueryLabelResolver<Label, any, Context>;
}

export type AdminQueryMeResolver<R = Admin, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type AdminQueryAdminsResolver<R = Admin[], Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type AdminQueryAdminResolver<R = Admin, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export interface AdminQueryAdminArgs {
    id: string;
}

export type AdminQueryPageContentTextBlocksResolver<R = PageContentTextBlock[], Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type AdminQueryPageContentTextBlockResolver<R = PageContentTextBlock, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export interface AdminQueryPageContentTextBlockArgs {
    id: string;
}

export type AdminQueryPersonsResolver<R = Person[], Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type AdminQueryPersonResolver<R = Person, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export interface AdminQueryPersonArgs {
    id: string;
}

export type AdminQueryProjectsResolver<R = Project[], Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type AdminQueryProjectResolver<R = Project, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export interface AdminQueryProjectArgs {
    id: string;
}

export type AdminQueryTechnologiesResolver<R = Technology[], Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type AdminQueryTechnologyResolver<R = Technology, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export interface AdminQueryTechnologyArgs {
    id: string;
}

export type AdminQueryCompaniesResolver<R = Company[], Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type AdminQueryCompanyResolver<R = Company, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export interface AdminQueryCompanyArgs {
    id: string;
}

export type AdminQueryCreateInTechnologiesResolver<R = CreateInTechnology[], Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type AdminQueryCreateInTechnologyResolver<R = CreateInTechnology, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export interface AdminQueryCreateInTechnologyArgs {
    id: string;
}

export type AdminQueryPagesResolver<R = Page[], Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type AdminQueryPageResolver<R = Page, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export interface AdminQueryPageArgs {
    id: string;
}

export type AdminQuerySubheaderNotificationsResolver<R = SubheaderNotification[], Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type AdminQuerySubheaderNotificationResolver<R = SubheaderNotification, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export interface AdminQuerySubheaderNotificationArgs {
    id: string;
}

export type AdminQueryBlogPostsResolver<R = BlogPost[], Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type AdminQueryBlogPostResolver<R = BlogPost, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export interface AdminQueryBlogPostArgs {
    id: string;
}

export type AdminQueryLabelsResolver<R = Label[], Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type AdminQueryLabelResolver<R = Label, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export interface AdminQueryLabelArgs {
    id: string;
}

export interface AdminResolvers<Context = any> {
    id?: AdminIdResolver<string, any, Context>;
    login?: AdminLoginResolver<string, any, Context>;
    firstName?: AdminFirstNameResolver<string, any, Context>;
    lastName?: AdminLastNameResolver<string, any, Context>;
}

export type AdminIdResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type AdminLoginResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type AdminFirstNameResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type AdminLastNameResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;

export interface PageContentTextBlockResolvers<Context = any> {
    id?: PageContentTextBlockIdResolver<string, any, Context>;
    title?: PageContentTextBlockTitleResolver<string, any, Context>;
    subtitle?: PageContentTextBlockSubtitleResolver<string, any, Context>;
    listItems?: PageContentTextBlockListItemsResolver<string[] | null, any, Context>;
    richText?: PageContentTextBlockRichTextResolver<RichText | null, any, Context>;
}

export type PageContentTextBlockIdResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type PageContentTextBlockTitleResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type PageContentTextBlockSubtitleResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type PageContentTextBlockListItemsResolver<R = string[] | null, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type PageContentTextBlockRichTextResolver<R = RichText | null, Parent = any, Context = any> = Resolver<R, Parent, Context>;

export interface RichTextResolvers<Context = any> {
    id?: RichTextIdResolver<string, any, Context>;
    blocks?: RichTextBlocksResolver<RichTextBlock[], any, Context>;
    entityMap?: RichTextEntityMapResolver<RichTextEntity[] | null, any, Context>;
}

export type RichTextIdResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type RichTextBlocksResolver<R = RichTextBlock[], Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type RichTextEntityMapResolver<R = RichTextEntity[] | null, Parent = any, Context = any> = Resolver<R, Parent, Context>;

export interface RichTextBlockResolvers<Context = any> {
    id?: RichTextBlockIdResolver<string, any, Context>;
    key?: RichTextBlockKeyResolver<string, any, Context>;
    text?: RichTextBlockTextResolver<string, any, Context>;
    type?: RichTextBlockTypeResolver<string, any, Context>;
    depth?: RichTextBlockDepthResolver<number, any, Context>;
    inlineStyleRanges?: RichTextBlockInlineStyleRangesResolver<RichTextInlineStyleRange[] | null, any, Context>;
    entityRanges?: RichTextBlockEntityRangesResolver<RichTextEntityRange[] | null, any, Context>;
    data?: RichTextBlockDataResolver<RichTextData, any, Context>;
}

export type RichTextBlockIdResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type RichTextBlockKeyResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type RichTextBlockTextResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type RichTextBlockTypeResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type RichTextBlockDepthResolver<R = number, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type RichTextBlockInlineStyleRangesResolver<R = RichTextInlineStyleRange[] | null, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type RichTextBlockEntityRangesResolver<R = RichTextEntityRange[] | null, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type RichTextBlockDataResolver<R = RichTextData, Parent = any, Context = any> = Resolver<R, Parent, Context>;

export interface RichTextInlineStyleRangeResolvers<Context = any> {
    id?: RichTextInlineStyleRangeIdResolver<string, any, Context>;
    offset?: RichTextInlineStyleRangeOffsetResolver<number, any, Context>;
    length?: RichTextInlineStyleRangeLengthResolver<number, any, Context>;
    style?: RichTextInlineStyleRangeStyleResolver<string, any, Context>;
}

export type RichTextInlineStyleRangeIdResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type RichTextInlineStyleRangeOffsetResolver<R = number, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type RichTextInlineStyleRangeLengthResolver<R = number, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type RichTextInlineStyleRangeStyleResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;

export interface RichTextEntityRangeResolvers<Context = any> {
    id?: RichTextEntityRangeIdResolver<string, any, Context>;
    offset?: RichTextEntityRangeOffsetResolver<number, any, Context>;
    length?: RichTextEntityRangeLengthResolver<number, any, Context>;
    key?: RichTextEntityRangeKeyResolver<number, any, Context>;
}

export type RichTextEntityRangeIdResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type RichTextEntityRangeOffsetResolver<R = number, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type RichTextEntityRangeLengthResolver<R = number, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type RichTextEntityRangeKeyResolver<R = number, Parent = any, Context = any> = Resolver<R, Parent, Context>;

export interface RichTextDataResolvers<Context = any> {
    id?: RichTextDataIdResolver<string | null, any, Context>;
}

export type RichTextDataIdResolver<R = string | null, Parent = any, Context = any> = Resolver<R, Parent, Context>;

export interface RichTextEntityResolvers<Context = any> {
    type?: RichTextEntityTypeResolver<RichTextEntityType | null, any, Context>;
    mutability?: RichTextEntityMutabilityResolver<RichTextEntityMutability | null, any, Context>;
    data?: RichTextEntityDataResolver<RichTextEntityData | null, any, Context>;
}

export type RichTextEntityTypeResolver<R = RichTextEntityType | null, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type RichTextEntityMutabilityResolver<R = RichTextEntityMutability | null, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type RichTextEntityDataResolver<R = RichTextEntityData | null, Parent = any, Context = any> = Resolver<R, Parent, Context>;

export interface RichTextLinkDataResolvers<Context = any> {
    type?: RichTextLinkDataTypeResolver<string | null, any, Context>;
    href?: RichTextLinkDataHrefResolver<string | null, any, Context>;
    target?: RichTextLinkDataTargetResolver<string | null, any, Context>;
}

export type RichTextLinkDataTypeResolver<R = string | null, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type RichTextLinkDataHrefResolver<R = string | null, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type RichTextLinkDataTargetResolver<R = string | null, Parent = any, Context = any> = Resolver<R, Parent, Context>;

export interface RichTextEmbedDataResolvers<Context = any> {
    type?: RichTextEmbedDataTypeResolver<string | null, any, Context>;
    url?: RichTextEmbedDataUrlResolver<string | null, any, Context>;
    html?: RichTextEmbedDataHtmlResolver<string | null, any, Context>;
}

export type RichTextEmbedDataTypeResolver<R = string | null, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type RichTextEmbedDataUrlResolver<R = string | null, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type RichTextEmbedDataHtmlResolver<R = string | null, Parent = any, Context = any> = Resolver<R, Parent, Context>;

export interface PersonResolvers<Context = any> {
    id?: PersonIdResolver<string, any, Context>;
    firstName?: PersonFirstNameResolver<string, any, Context>;
    lastName?: PersonLastNameResolver<string, any, Context>;
    position?: PersonPositionResolver<string, any, Context>;
    imageSrc?: PersonImageSrcResolver<string, any, Context>;
    fullImageSrc?: PersonFullImageSrcResolver<string, any, Context>;
    description?: PersonDescriptionResolver<string, any, Context>;
    our?: PersonOurResolver<boolean, any, Context>;
    homeReference?: PersonHomeReferenceResolver<boolean, any, Context>;
    trainingReference?: PersonTrainingReferenceResolver<boolean, any, Context>;
    links?: PersonLinksResolver<Link[] | null, any, Context>;
    phone?: PersonPhoneResolver<string | null, any, Context>;
    email?: PersonEmailResolver<string | null, any, Context>;
    order?: PersonOrderResolver<number, any, Context>;
}

export type PersonIdResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type PersonFirstNameResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type PersonLastNameResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type PersonPositionResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type PersonImageSrcResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type PersonFullImageSrcResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type PersonDescriptionResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type PersonOurResolver<R = boolean, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type PersonHomeReferenceResolver<R = boolean, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type PersonTrainingReferenceResolver<R = boolean, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type PersonLinksResolver<R = Link[] | null, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type PersonPhoneResolver<R = string | null, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type PersonEmailResolver<R = string | null, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type PersonOrderResolver<R = number, Parent = any, Context = any> = Resolver<R, Parent, Context>;

export interface LinkResolvers<Context = any> {
    id?: LinkIdResolver<string, any, Context>;
    name?: LinkNameResolver<string, any, Context>;
    icon?: LinkIconResolver<string, any, Context>;
    url?: LinkUrlResolver<string, any, Context>;
    external?: LinkExternalResolver<boolean, any, Context>;
    order?: LinkOrderResolver<number, any, Context>;
}

export type LinkIdResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type LinkNameResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type LinkIconResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type LinkUrlResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type LinkExternalResolver<R = boolean, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type LinkOrderResolver<R = number, Parent = any, Context = any> = Resolver<R, Parent, Context>;

export interface ProjectResolvers<Context = any> {
    id?: ProjectIdResolver<string, any, Context>;
    name?: ProjectNameResolver<string, any, Context>;
    subtitle?: ProjectSubtitleResolver<string, any, Context>;
    description?: ProjectDescriptionResolver<string, any, Context>;
    imageSrc?: ProjectImageSrcResolver<string, any, Context>;
    fullImageSrc?: ProjectFullImageSrcResolver<string, any, Context>;
    links?: ProjectLinksResolver<Link[] | null, any, Context>;
    order?: ProjectOrderResolver<number, any, Context>;
}

export type ProjectIdResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type ProjectNameResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type ProjectSubtitleResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type ProjectDescriptionResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type ProjectImageSrcResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type ProjectFullImageSrcResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type ProjectLinksResolver<R = Link[] | null, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type ProjectOrderResolver<R = number, Parent = any, Context = any> = Resolver<R, Parent, Context>;

export interface TechnologyResolvers<Context = any> {
    id?: TechnologyIdResolver<string, any, Context>;
    name?: TechnologyNameResolver<string, any, Context>;
    description?: TechnologyDescriptionResolver<string, any, Context>;
    imageSrc?: TechnologyImageSrcResolver<string, any, Context>;
    fullImageSrc?: TechnologyFullImageSrcResolver<string, any, Context>;
    order?: TechnologyOrderResolver<number, any, Context>;
}

export type TechnologyIdResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type TechnologyNameResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type TechnologyDescriptionResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type TechnologyImageSrcResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type TechnologyFullImageSrcResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type TechnologyOrderResolver<R = number, Parent = any, Context = any> = Resolver<R, Parent, Context>;

export interface CompanyResolvers<Context = any> {
    id?: CompanyIdResolver<string, any, Context>;
    name?: CompanyNameResolver<string, any, Context>;
    ic?: CompanyIcResolver<string, any, Context>;
    dic?: CompanyDicResolver<string, any, Context>;
    bankAccount?: CompanyBankAccountResolver<string, any, Context>;
    courtDescription?: CompanyCourtDescriptionResolver<string, any, Context>;
    phone?: CompanyPhoneResolver<string, any, Context>;
    email?: CompanyEmailResolver<string, any, Context>;
    address?: CompanyAddressResolver<CompanyAddress, any, Context>;
    links?: CompanyLinksResolver<Link[], any, Context>;
    default?: CompanyDefaultResolver<boolean, any, Context>;
}

export type CompanyIdResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type CompanyNameResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type CompanyIcResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type CompanyDicResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type CompanyBankAccountResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type CompanyCourtDescriptionResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type CompanyPhoneResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type CompanyEmailResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type CompanyAddressResolver<R = CompanyAddress, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type CompanyLinksResolver<R = Link[], Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type CompanyDefaultResolver<R = boolean, Parent = any, Context = any> = Resolver<R, Parent, Context>;

export interface CompanyAddressResolvers<Context = any> {
    street?: CompanyAddressStreetResolver<string, any, Context>;
    city?: CompanyAddressCityResolver<string, any, Context>;
    zipPostalCode?: CompanyAddressZipPostalCodeResolver<string, any, Context>;
}

export type CompanyAddressStreetResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type CompanyAddressCityResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type CompanyAddressZipPostalCodeResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;

export interface CreateInTechnologyResolvers<Context = any> {
    id?: CreateInTechnologyIdResolver<string, any, Context>;
    name?: CreateInTechnologyNameResolver<string, any, Context>;
    icon?: CreateInTechnologyIconResolver<string, any, Context>;
    url?: CreateInTechnologyUrlResolver<string, any, Context>;
    external?: CreateInTechnologyExternalResolver<boolean, any, Context>;
    order?: CreateInTechnologyOrderResolver<number, any, Context>;
}

export type CreateInTechnologyIdResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type CreateInTechnologyNameResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type CreateInTechnologyIconResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type CreateInTechnologyUrlResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type CreateInTechnologyExternalResolver<R = boolean, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type CreateInTechnologyOrderResolver<R = number, Parent = any, Context = any> = Resolver<R, Parent, Context>;

export interface PageResolvers<Context = any> {
    id?: PageIdResolver<string, any, Context>;
    key?: PageKeyResolver<string, any, Context>;
    name?: PageNameResolver<string, any, Context>;
    title?: PageTitleResolver<string, any, Context>;
    lastWhiteBlock?: PageLastWhiteBlockResolver<boolean, any, Context>;
    header?: PageHeaderResolver<PageHeader, any, Context>;
    subheaderBlocks?: PageSubheaderBlocksResolver<SubheaderBlock[] | null, any, Context>;
    subheaderNotification?: PageSubheaderNotificationResolver<SubheaderNotification | null, any, Context>;
    contentBlocks?: PageContentBlocksResolver<PageContentBlock[] | null, any, Context>;
    order?: PageOrderResolver<number, any, Context>;
}

export type PageIdResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type PageKeyResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type PageNameResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type PageTitleResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type PageLastWhiteBlockResolver<R = boolean, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type PageHeaderResolver<R = PageHeader, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type PageSubheaderBlocksResolver<R = SubheaderBlock[] | null, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type PageSubheaderNotificationResolver<R = SubheaderNotification | null, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type PageContentBlocksResolver<R = PageContentBlock[] | null, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type PageOrderResolver<R = number, Parent = any, Context = any> = Resolver<R, Parent, Context>;

export interface PageHeaderResolvers<Context = any> {
    id?: PageHeaderIdResolver<string, any, Context>;
    descriptions?: PageHeaderDescriptionsResolver<PageHeaderDescription[], any, Context>;
    imageSrc?: PageHeaderImageSrcResolver<string, any, Context>;
    fullImageSrc?: PageHeaderFullImageSrcResolver<string, any, Context>;
    buttons?: PageHeaderButtonsResolver<PageHeaderButton[] | null, any, Context>;
}

export type PageHeaderIdResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type PageHeaderDescriptionsResolver<R = PageHeaderDescription[], Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type PageHeaderImageSrcResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type PageHeaderFullImageSrcResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type PageHeaderButtonsResolver<R = PageHeaderButton[] | null, Parent = any, Context = any> = Resolver<R, Parent, Context>;

export interface PageHeaderDescriptionResolvers<Context = any> {
    id?: PageHeaderDescriptionIdResolver<string, any, Context>;
    text?: PageHeaderDescriptionTextResolver<string, any, Context>;
    order?: PageHeaderDescriptionOrderResolver<number, any, Context>;
}

export type PageHeaderDescriptionIdResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type PageHeaderDescriptionTextResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type PageHeaderDescriptionOrderResolver<R = number, Parent = any, Context = any> = Resolver<R, Parent, Context>;

export interface PageHeaderButtonResolvers<Context = any> {
    id?: PageHeaderButtonIdResolver<string, any, Context>;
    name?: PageHeaderButtonNameResolver<string, any, Context>;
    url?: PageHeaderButtonUrlResolver<string, any, Context>;
    white?: PageHeaderButtonWhiteResolver<boolean, any, Context>;
    external?: PageHeaderButtonExternalResolver<boolean, any, Context>;
    order?: PageHeaderButtonOrderResolver<number, any, Context>;
}

export type PageHeaderButtonIdResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type PageHeaderButtonNameResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type PageHeaderButtonUrlResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type PageHeaderButtonWhiteResolver<R = boolean, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type PageHeaderButtonExternalResolver<R = boolean, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type PageHeaderButtonOrderResolver<R = number, Parent = any, Context = any> = Resolver<R, Parent, Context>;

export interface SubheaderBlockResolvers<Context = any> {
    id?: SubheaderBlockIdResolver<string, any, Context>;
    icon?: SubheaderBlockIconResolver<string, any, Context>;
    title?: SubheaderBlockTitleResolver<string, any, Context>;
    subtitle?: SubheaderBlockSubtitleResolver<string, any, Context>;
    order?: SubheaderBlockOrderResolver<number, any, Context>;
}

export type SubheaderBlockIdResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type SubheaderBlockIconResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type SubheaderBlockTitleResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type SubheaderBlockSubtitleResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type SubheaderBlockOrderResolver<R = number, Parent = any, Context = any> = Resolver<R, Parent, Context>;

export interface SubheaderNotificationResolvers<Context = any> {
    id?: SubheaderNotificationIdResolver<string, any, Context>;
    text?: SubheaderNotificationTextResolver<string, any, Context>;
    links?: SubheaderNotificationLinksResolver<SubheaderNotificationLink[] | null, any, Context>;
}

export type SubheaderNotificationIdResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type SubheaderNotificationTextResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type SubheaderNotificationLinksResolver<R = SubheaderNotificationLink[] | null, Parent = any, Context = any> = Resolver<R, Parent, Context>;

export interface SubheaderNotificationLinkResolvers<Context = any> {
    id?: SubheaderNotificationLinkIdResolver<string, any, Context>;
    name?: SubheaderNotificationLinkNameResolver<string, any, Context>;
    url?: SubheaderNotificationLinkUrlResolver<string, any, Context>;
    external?: SubheaderNotificationLinkExternalResolver<boolean, any, Context>;
    order?: SubheaderNotificationLinkOrderResolver<number, any, Context>;
}

export type SubheaderNotificationLinkIdResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type SubheaderNotificationLinkNameResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type SubheaderNotificationLinkUrlResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type SubheaderNotificationLinkExternalResolver<R = boolean, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type SubheaderNotificationLinkOrderResolver<R = number, Parent = any, Context = any> = Resolver<R, Parent, Context>;

export interface PageContentBlockResolvers<Context = any> {
    id?: PageContentBlockIdResolver<string, any, Context>;
    type?: PageContentBlockTypeResolver<PageContentType, any, Context>;
    textBlock?: PageContentBlockTextBlockResolver<PageContentTextBlock | null, any, Context>;
    order?: PageContentBlockOrderResolver<number, any, Context>;
}

export type PageContentBlockIdResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type PageContentBlockTypeResolver<R = PageContentType, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type PageContentBlockTextBlockResolver<R = PageContentTextBlock | null, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type PageContentBlockOrderResolver<R = number, Parent = any, Context = any> = Resolver<R, Parent, Context>;

export interface BlogPostResolvers<Context = any> {
    id?: BlogPostIdResolver<string, any, Context>;
    key?: BlogPostKeyResolver<string, any, Context>;
    title?: BlogPostTitleResolver<string, any, Context>;
    subtitle?: BlogPostSubtitleResolver<string, any, Context>;
    imageSrc?: BlogPostImageSrcResolver<string, any, Context>;
    fullImageSrc?: BlogPostFullImageSrcResolver<string, any, Context>;
    published?: BlogPostPublishedResolver<boolean, any, Context>;
    publishedDate?: BlogPostPublishedDateResolver<string, any, Context>;
    author?: BlogPostAuthorResolver<string, any, Context>;
    content?: BlogPostContentResolver<string, any, Context>;
    labels?: BlogPostLabelsResolver<Label[], any, Context>;
}

export type BlogPostIdResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type BlogPostKeyResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type BlogPostTitleResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type BlogPostSubtitleResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type BlogPostImageSrcResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type BlogPostFullImageSrcResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type BlogPostPublishedResolver<R = boolean, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type BlogPostPublishedDateResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type BlogPostAuthorResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type BlogPostContentResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type BlogPostLabelsResolver<R = Label[], Parent = any, Context = any> = Resolver<R, Parent, Context>;

export interface LabelResolvers<Context = any> {
    id?: LabelIdResolver<string, any, Context>;
    name?: LabelNameResolver<string, any, Context>;
}

export type LabelIdResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type LabelNameResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;

export interface BlogQueryResolvers<Context = any> {
    latestsPosts?: BlogQueryLatestsPostsResolver<BlogPost[] | null, any, Context>;
    findPostByKey?: BlogQueryFindPostByKeyResolver<BlogPost | null, any, Context>;
}

export type BlogQueryLatestsPostsResolver<R = BlogPost[] | null, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export interface BlogQueryLatestsPostsArgs {
    limit: number;
}

export type BlogQueryFindPostByKeyResolver<R = BlogPost | null, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export interface BlogQueryFindPostByKeyArgs {
    key: string;
}

export interface RemoteBlogResolvers<Context = any> {
    id?: RemoteBlogIdResolver<string, any, Context>;
    published?: RemoteBlogPublishedResolver<string | null, any, Context>;
    updated?: RemoteBlogUpdatedResolver<string | null, any, Context>;
    url?: RemoteBlogUrlResolver<string | null, any, Context>;
    title?: RemoteBlogTitleResolver<string | null, any, Context>;
    author?: RemoteBlogAuthorResolver<RemoteBlogAuthor | null, any, Context>;
    imageUrl?: RemoteBlogImageUrlResolver<string | null, any, Context>;
    labels?: RemoteBlogLabelsResolver<string[] | null, any, Context>;
}

export type RemoteBlogIdResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type RemoteBlogPublishedResolver<R = string | null, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type RemoteBlogUpdatedResolver<R = string | null, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type RemoteBlogUrlResolver<R = string | null, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type RemoteBlogTitleResolver<R = string | null, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type RemoteBlogAuthorResolver<R = RemoteBlogAuthor | null, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type RemoteBlogImageUrlResolver<R = string | null, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type RemoteBlogLabelsResolver<R = string[] | null, Parent = any, Context = any> = Resolver<R, Parent, Context>;

export interface RemoteBlogAuthorResolvers<Context = any> {
    id?: RemoteBlogAuthorIdResolver<string, any, Context>;
    displayName?: RemoteBlogAuthorDisplayNameResolver<string | null, any, Context>;
    url?: RemoteBlogAuthorUrlResolver<string | null, any, Context>;
    image?: RemoteBlogAuthorImageResolver<RemoteBlogAuthorImage | null, any, Context>;
}

export type RemoteBlogAuthorIdResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type RemoteBlogAuthorDisplayNameResolver<R = string | null, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type RemoteBlogAuthorUrlResolver<R = string | null, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type RemoteBlogAuthorImageResolver<R = RemoteBlogAuthorImage | null, Parent = any, Context = any> = Resolver<R, Parent, Context>;

export interface RemoteBlogAuthorImageResolvers<Context = any> {
    url?: RemoteBlogAuthorImageUrlResolver<string | null, any, Context>;
}

export type RemoteBlogAuthorImageUrlResolver<R = string | null, Parent = any, Context = any> = Resolver<R, Parent, Context>;

export interface GameResolvers<Context = any> {
    _id?: GameIdResolver<string, any, Context>;
    title?: GameTitleResolver<string, any, Context>;
    perex?: GamePerexResolver<string, any, Context>;
    ranking?: GameRankingResolver<number, any, Context>;
    platform?: GamePlatformResolver<string, any, Context>;
}

export type GameIdResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type GameTitleResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type GamePerexResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type GameRankingResolver<R = number, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type GamePlatformResolver<R = string, Parent = any, Context = any> = Resolver<R, Parent, Context>;

export interface MutationResolvers<Context = any> {
    admin?: MutationAdminResolver<AdminMutation | null, any, Context>;
    game?: MutationGameResolver<MutationGame | null, any, Context>;
}

export type MutationAdminResolver<R = AdminMutation | null, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type MutationGameResolver<R = MutationGame | null, Parent = any, Context = any> = Resolver<R, Parent, Context>;

export interface AdminMutationResolvers<Context = any> {
    admin?: AdminMutationAdminResolver<AdminMutationAdmin, any, Context>;
    pageContentTextBlock?: AdminMutationPageContentTextBlockResolver<AdminMutationPageContentTextBlock, any, Context>;
    person?: AdminMutationPersonResolver<AdminMutationPerson, any, Context>;
    project?: AdminMutationProjectResolver<AdminMutationProject, any, Context>;
    technology?: AdminMutationTechnologyResolver<AdminMutationTechnology, any, Context>;
    company?: AdminMutationCompanyResolver<AdminMutationCompany, any, Context>;
    createInTechnology?: AdminMutationCreateInTechnologyResolver<AdminMutationCreateInTechnology, any, Context>;
    subheaderNotification?: AdminMutationSubheaderNotificationResolver<AdminMutationSubheaderNotification, any, Context>;
    page?: AdminMutationPageResolver<AdminMutationPage, any, Context>;
    blog?: AdminMutationBlogResolver<AdminMutationBlog, any, Context>;
    label?: AdminMutationLabelResolver<AdminMutationLabel, any, Context>;
}

export type AdminMutationAdminResolver<R = AdminMutationAdmin, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type AdminMutationPageContentTextBlockResolver<R = AdminMutationPageContentTextBlock, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type AdminMutationPersonResolver<R = AdminMutationPerson, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type AdminMutationProjectResolver<R = AdminMutationProject, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type AdminMutationTechnologyResolver<R = AdminMutationTechnology, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type AdminMutationCompanyResolver<R = AdminMutationCompany, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type AdminMutationCreateInTechnologyResolver<R = AdminMutationCreateInTechnology, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type AdminMutationSubheaderNotificationResolver<R = AdminMutationSubheaderNotification, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type AdminMutationPageResolver<R = AdminMutationPage, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type AdminMutationBlogResolver<R = AdminMutationBlog, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export type AdminMutationLabelResolver<R = AdminMutationLabel, Parent = any, Context = any> = Resolver<R, Parent, Context>;

export interface AdminMutationAdminResolvers<Context = any> {
    create?: AdminMutationAdminCreateResolver<Admin, any, Context>;
    save?: AdminMutationAdminSaveResolver<Admin, any, Context>;
}

export type AdminMutationAdminCreateResolver<R = Admin, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export interface AdminMutationAdminCreateArgs {
    input: AdminInput;
}

export type AdminMutationAdminSaveResolver<R = Admin, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export interface AdminMutationAdminSaveArgs {
    id: string;
    input: AdminSaveInput;
}

export interface AdminMutationPageContentTextBlockResolvers<Context = any> {
    create?: AdminMutationPageContentTextBlockCreateResolver<PageContentTextBlock, any, Context>;
    save?: AdminMutationPageContentTextBlockSaveResolver<PageContentTextBlock, any, Context>;
}

export type AdminMutationPageContentTextBlockCreateResolver<R = PageContentTextBlock, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export interface AdminMutationPageContentTextBlockCreateArgs {
    input: PageContentTextBlockInput;
}

export type AdminMutationPageContentTextBlockSaveResolver<R = PageContentTextBlock, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export interface AdminMutationPageContentTextBlockSaveArgs {
    id: string;
    input: PageContentTextBlockInput;
}

export interface AdminMutationPersonResolvers<Context = any> {
    create?: AdminMutationPersonCreateResolver<Person, any, Context>;
    save?: AdminMutationPersonSaveResolver<Person, any, Context>;
}

export type AdminMutationPersonCreateResolver<R = Person, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export interface AdminMutationPersonCreateArgs {
    input: PersonInput;
}

export type AdminMutationPersonSaveResolver<R = Person, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export interface AdminMutationPersonSaveArgs {
    id: string;
    input: PersonInput;
}

export interface AdminMutationProjectResolvers<Context = any> {
    create?: AdminMutationProjectCreateResolver<Project, any, Context>;
    save?: AdminMutationProjectSaveResolver<Project, any, Context>;
}

export type AdminMutationProjectCreateResolver<R = Project, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export interface AdminMutationProjectCreateArgs {
    input: ProjectInput;
}

export type AdminMutationProjectSaveResolver<R = Project, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export interface AdminMutationProjectSaveArgs {
    id: string;
    input: ProjectInput;
}

export interface AdminMutationTechnologyResolvers<Context = any> {
    create?: AdminMutationTechnologyCreateResolver<Technology, any, Context>;
    save?: AdminMutationTechnologySaveResolver<Technology, any, Context>;
}

export type AdminMutationTechnologyCreateResolver<R = Technology, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export interface AdminMutationTechnologyCreateArgs {
    input: TechnologyInput;
}

export type AdminMutationTechnologySaveResolver<R = Technology, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export interface AdminMutationTechnologySaveArgs {
    id: string;
    input: TechnologyInput;
}

export interface AdminMutationCompanyResolvers<Context = any> {
    create?: AdminMutationCompanyCreateResolver<Company, any, Context>;
    save?: AdminMutationCompanySaveResolver<Company, any, Context>;
}

export type AdminMutationCompanyCreateResolver<R = Company, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export interface AdminMutationCompanyCreateArgs {
    input: CompanyInput;
}

export type AdminMutationCompanySaveResolver<R = Company, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export interface AdminMutationCompanySaveArgs {
    id: string;
    input: CompanyInput;
}

export interface AdminMutationCreateInTechnologyResolvers<Context = any> {
    create?: AdminMutationCreateInTechnologyCreateResolver<CreateInTechnology, any, Context>;
    save?: AdminMutationCreateInTechnologySaveResolver<CreateInTechnology, any, Context>;
}

export type AdminMutationCreateInTechnologyCreateResolver<R = CreateInTechnology, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export interface AdminMutationCreateInTechnologyCreateArgs {
    input: CreateInTechnologyInput;
}

export type AdminMutationCreateInTechnologySaveResolver<R = CreateInTechnology, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export interface AdminMutationCreateInTechnologySaveArgs {
    id: string;
    input: CreateInTechnologyInput;
}

export interface AdminMutationSubheaderNotificationResolvers<Context = any> {
    create?: AdminMutationSubheaderNotificationCreateResolver<SubheaderNotification, any, Context>;
    save?: AdminMutationSubheaderNotificationSaveResolver<SubheaderNotification, any, Context>;
}

export type AdminMutationSubheaderNotificationCreateResolver<R = SubheaderNotification, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export interface AdminMutationSubheaderNotificationCreateArgs {
    input: SubheaderNotificationInput;
}

export type AdminMutationSubheaderNotificationSaveResolver<R = SubheaderNotification, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export interface AdminMutationSubheaderNotificationSaveArgs {
    id: string;
    input: SubheaderNotificationInput;
}

export interface AdminMutationPageResolvers<Context = any> {
    create?: AdminMutationPageCreateResolver<Page, any, Context>;
    save?: AdminMutationPageSaveResolver<Page, any, Context>;
}

export type AdminMutationPageCreateResolver<R = Page, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export interface AdminMutationPageCreateArgs {
    input: PageInput;
}

export type AdminMutationPageSaveResolver<R = Page, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export interface AdminMutationPageSaveArgs {
    id: string;
    input: PageInput;
}

export interface AdminMutationBlogResolvers<Context = any> {
    post?: AdminMutationBlogPostResolver<AdminMutationPostBlog, any, Context>;
}

export type AdminMutationBlogPostResolver<R = AdminMutationPostBlog, Parent = any, Context = any> = Resolver<R, Parent, Context>;

export interface AdminMutationPostBlogResolvers<Context = any> {
    create?: AdminMutationPostBlogCreateResolver<BlogPost, any, Context>;
    save?: AdminMutationPostBlogSaveResolver<BlogPost, any, Context>;
}

export type AdminMutationPostBlogCreateResolver<R = BlogPost, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export interface AdminMutationPostBlogCreateArgs {
    input: BlogPostInput;
}

export type AdminMutationPostBlogSaveResolver<R = BlogPost, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export interface AdminMutationPostBlogSaveArgs {
    id: string;
    input: BlogPostInput;
}

export interface AdminMutationLabelResolvers<Context = any> {
    create?: AdminMutationLabelCreateResolver<Label, any, Context>;
    save?: AdminMutationLabelSaveResolver<Label, any, Context>;
}

export type AdminMutationLabelCreateResolver<R = Label, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export interface AdminMutationLabelCreateArgs {
    input: LabelInput;
}

export type AdminMutationLabelSaveResolver<R = Label, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export interface AdminMutationLabelSaveArgs {
    id: string;
    input: LabelInput;
}

export interface MutationGameResolvers<Context = any> {
    create?: MutationGameCreateResolver<Game, any, Context>;
}

export type MutationGameCreateResolver<R = Game, Parent = any, Context = any> = Resolver<R, Parent, Context>;
export interface MutationGameCreateArgs {
    input: GameInput;
}
