// tslint:disable-next-line
const fetch = require('isomorphic-unfetch');

const getImage = (content: string): string | null => {
    const regex = /(href=")([^"]*\.(?:png|jpg))(")/g;
    const match = regex.exec(content);
    if (match) {
        return match[2];
    }
    return null;
};

const fetchBlogger = async (url: string) => fetch(url).then((res) => res.json());

export const RemoteBlogService = {
    findLatests: async () => {
        const {BLOG_BASE_URL, BLOG_API_KEY} = process.env;
        if (!BLOG_BASE_URL || !BLOG_API_KEY) {
            return [];
        }
        const bloggerUrl = `${BLOG_BASE_URL}/posts?key=${BLOG_API_KEY}`;
        return fetchBlogger(bloggerUrl).then((res) => {
            if (!res.items) {
                return [];
            }
            return res.items.map(({id, published, updated, url, title, author, content, labels}: any) => ({
                id,
                published,
                updated,
                url,
                title,
                author,
                imageUrl: getImage(content),
                labels,
            }));
        });
    },
};
