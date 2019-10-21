const { requireDir } = require('../utils/loader');

const resolvers = requireDir(__dirname, ['index.js']);

module.exports = resolvers;
