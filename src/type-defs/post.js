const { gql } = require('apollo-server');

const post = gql`
    type Post {
        id: String!
        title: String!
        createdAt: String!
        tags: [String!]!
        content: String!
        status: Status!
    }

    enum Status {
        EDITING
        PUBLISHED
        REMOVED
    }
`;

module.exports = post;
