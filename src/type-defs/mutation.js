const { gql } = require('apollo-server');

const query = gql`
    type Mutation {
        createPost(post: PostCreateInput!): Post!
        updatePost(id: String!, post: PostUpdateInput!): Post!
    }

    input PostCreateInput {
        title: String!
        tags: [String!]!
        content: String!
    }

    input PostUpdateInput {
        title: String
        tags: [String!]
        content: String
        status: Status
    }
`;

module.exports = query;
