const PostService = require('../services/mutation');

const postResolvers = {
    Mutation: {
        createPost: (_, { post }) => PostService.create(post),
        updatePost: (_, { id, post }) => PostService.update(id, post),
        removePost: (_, { id }) => PostService.remove(id)
    }
};

module.exports = postResolvers;
