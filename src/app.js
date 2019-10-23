const { ApolloServer } = require('apollo-server');
const common = require('@vietduc/common');
const { log } = require('@vietduc/common');
const postgres = require('@vietduc/postgres');
const typeDefs = require('./type-defs');
const resolvers = require('./resolvers');

const serviceCfg = common.getConfig('service');
const server = new ApolloServer({ typeDefs, resolvers });

server.listen(serviceCfg.service_port).then(() => {
    log.info(`${serviceCfg.service_name} running on port ${serviceCfg.service_port}`);
});

postgres.init();
