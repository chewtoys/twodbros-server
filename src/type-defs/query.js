const { gql } = require('apollo-server');

const query = gql`
    type Query {
        posts(filter: PostFilter): [Post!]!
        post(id: String!): Post
    }

    input PostFilter {
        status: String
        tag: String
        created_year: Int
        created_month: Int
        created_date: Int
    }
`;

module.exports = query;
