const { requireDir } = require('../utils/loader');

const typeDefs = requireDir(__dirname, ['index.js']);

module.exports = typeDefs;
