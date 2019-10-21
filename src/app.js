const { ApolloServer } = require('apollo-server');
const postgres = require('@vietduc/postgres');
const typeDefs = require('./type-defs');
const resolvers = require('./resolvers');
const { serviceCfg } = require('./config');
const log = require('./utils/log');

const server = new ApolloServer({ typeDefs, resolvers });

server.listen(serviceCfg.service_port).then(() => {
  log.info(`server running on port ${serviceCfg.service_port}`);
});

postgres.setLogger(log);
