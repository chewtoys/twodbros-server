const { gql } = require('apollo-server');

const query = gql`
    type Mutation {
        createPost(post: PostInput!): Post
    }

    input PostInput {
        title: String!
        tags: [String!]!
        content: String!
    }
`;

module.exports = query;
