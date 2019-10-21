const { gql } = require('apollo-server');

const query = gql`
  type Query {
    posts: [Post!]!
    post(id: String): Post!
  }
`;

module.exports = query;
