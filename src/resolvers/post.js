const PostService = require('../services/post');

const postResolvers = {
    Query: {
        posts: (_, { filter }) => PostService.findAll(filter),
        post: (_, { id }) => PostService.findOne({ id })
    }
};

module.exports = postResolvers;
