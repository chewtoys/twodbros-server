const { ApolloServer } = require('apollo-server');
const common = require('@vietduc/common');
const postgres = require('@vietduc/postgres');
const typeDefs = require('./type-defs');
const resolvers = require('./resolvers');
const log = require('./utils/log');

const serviceCfg = common.getConfig('service');
const server = new ApolloServer({ typeDefs, resolvers });

server.listen(serviceCfg.service_port).then(() => {
  log.info(`server running on port ${serviceCfg.service_port}`);
});

postgres.init({ logger: log });
