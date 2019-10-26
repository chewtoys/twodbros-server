const common = require('@vietduc/common');

let resolvers = {};
const resolverArr = common.requireDir(__dirname, ['index.js']);

for (const resolver of resolverArr) {
    resolvers = {
        ...resolvers,
        ...resolver
    };
}

module.exports = resolvers;
