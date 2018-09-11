import {
    AdminQueryBlogPostArgs,
    BlogQueryFindPostByKeyArgs,
    BlogQueryLatestsPostsArgs,
    CreateAdminMutationPostBlogArgs,
    SaveAdminMutationPostBlogArgs,
} from '../../shared/graphql';
import {BlogPostModel} from '../database/schema';

export const BlogService = {
    findAllPosts: async () => await BlogPostModel.find().populate('labels'),
    findPostById: ({id}: AdminQueryBlogPostArgs) => BlogPostModel.findById(id).populate('labels'),
    createPost: ({input}: CreateAdminMutationPostBlogArgs) => new BlogPostModel(input).save(),
    savePost: ({id, input}: SaveAdminMutationPostBlogArgs) => BlogPostModel.findByIdAndUpdate(id, input),

    latestsPosts: (_: BlogQueryLatestsPostsArgs) => {
        return BlogPostModel.find({published: true})
            .populate('labels')
            .sort({publishedDate: -1});
    },
    findPostByKey: ({key}: BlogQueryFindPostByKeyArgs) => {
        return BlogPostModel.findOne({key, published: true}).populate('labels');
    },
};
