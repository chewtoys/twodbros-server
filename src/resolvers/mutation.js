const PostService = require('../services/mutation');

const postResolvers = {
    Mutation: {
        createPost: (_, { post }) => PostService.create(post)
    }
};

module.exports = postResolvers;
