const PostService = require('../services/post');

const postResolvers = {
    Query: {
        posts: () => PostService.findAll(),
        post: (_, { id }) => PostService.findOne({ id })
    }
};

module.exports = postResolvers;
