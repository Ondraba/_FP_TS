import * as React from 'react';
import Head from 'next/head';
import {Grid, withStyles} from '@material-ui/core';
import {TopBar} from './topBar';
import {AppFrame} from './AppFrame';
import {Header} from './Header';
import {Footer} from './footer';
import {BlogPost, Page, PageContentBlock, PageContentType, PageQueryArgs} from '@graphql-model';
import {ChildDataProps, graphql} from 'react-apollo';
import {Queries} from '../graphql';
import {TextBlock} from './TextBlock';
import {Projects} from './Projects';
import {OurPeople} from './OurPeople';
import {TrainingReferences} from './TrainingReferences';
import {Technologies} from './Technologies';
import {ContactMap} from './ContactMap';
import {HomeReferences} from './HomeReferences';
import {RemoteBlogCarousel} from './RemoteBlogCarousel';
import {BlogPosts} from '@client/components/BlogPosts';
import {BlogPostDetail} from '@client/components/BlogPostDetail';
import {HeaderSubtitleBlogPost} from '@client/components/HeaderSubtitleBlogPost';

interface Props {
    page: Page;
    blogPost?: BlogPost | null;
}

const decorate = withStyles(() => ({
    main: {
        minHeight: 'calc(100vh - 100px)',
    },
}));

const getBlock = (block: PageContentBlock): JSX.Element | null => {
    switch (block.type) {
        case PageContentType.TEXT:
            if (!block.textBlock) {
                return null;
            }
            return <TextBlock data={block.textBlock} />;
        case PageContentType.BLOG_CAROUSEL:
            return <RemoteBlogCarousel />;
        case PageContentType.PROJECTS:
            return <Projects />;
        case PageContentType.OUR_PEOPLE:
            return <OurPeople />;
        case PageContentType.HOME_REFERENCE:
            return <HomeReferences />;
        case PageContentType.TRAINING_REFERENCE:
            return <TrainingReferences />;
        case PageContentType.TECHNOLOGIES:
            return <Technologies />;
        case PageContentType.GOOGLE_MAP:
            return <ContactMap />;
        default:
            return <div style={{color: 'red', fontWeight: 'bold'}}>Not implement yet</div>;
    }
};

const Component = decorate<Props>(({classes, page, blogPost}) => {
    const title = blogPost ? `${blogPost.title} - ApiTree` : page.title;
    const headerTitle = blogPost ? blogPost.title : page.header.descriptions[0].text;
    const subtitle = blogPost ? <HeaderSubtitleBlogPost blogPost={blogPost} /> : undefined;
    return (
        <AppFrame>
            <Head>
                <title>{title}</title>
            </Head>
            <TopBar pageKey={page.key} />
            <Header
                header={page.header}
                notification={page.subheaderNotification}
                subheaderBlocks={page.subheaderBlocks}
                title={headerTitle}
                subtitle={subtitle}
                imageSrc={blogPost ? blogPost.fullImageSrc : page.header.fullImageSrc}
            />
            <Grid container direction="column" justify="space-between" alignItems="stretch" className={classes.main} spacing={0}>
                {blogPost && (
                    <Grid item xs={12}>
                        <BlogPostDetail data={blogPost} />
                    </Grid>
                )}
                {!blogPost && page.key === 'blog' && <BlogPosts />}
                {!blogPost &&
                    page.contentBlocks &&
                    page.contentBlocks.map((block) => (
                        <Grid item xs={12} key={block.id}>
                            {getBlock(block)}
                        </Grid>
                    ))}
                <Grid item xs={12}>
                    <Footer pageKey={page.key} />
                </Grid>
            </Grid>
        </AppFrame>
    );
});

interface Response {
    page: Page;
}

interface WithGraphqlProps {
    pageKey: string;
    blogPost?: BlogPost | null;
}

interface ChildProps extends WithGraphqlProps, ChildDataProps<PageQueryArgs, Response> {}

const withGraphql = (BaseComponent: React.ComponentType<Props>): React.ComponentClass<ChildProps> => {
    return class extends React.PureComponent<ChildProps> {
        render() {
            const {
                data: {loading, page},
                blogPost,
                children,
            } = this.props;
            if (loading || !page) {
                return null;
            }
            return <BaseComponent page={page} children={children} blogPost={blogPost} />;
        }
    };
};

const withQuery = graphql<WithGraphqlProps, Response, PageQueryArgs, ChildProps>(Queries.page, {
    options: ({pageKey}) => ({variables: {key: pageKey}}),
});

export const Layout = withQuery(withGraphql(Component));
