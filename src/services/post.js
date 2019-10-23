const { log } = require('@vietduc/common');
const postgres = require('@vietduc/postgres');

const findAll = async () => {
    const sql = `SELECT * FROM posts;`;
    const { err, res } = await postgres.exec(sql);
    if (err || !Array.isArray(res)) {
        if (err) log.error('Error querying posts');
        return [];
    }
    return res;
};

module.exports.findAll = findAll;

const findOne = async ({ id }) => {
    const sql = `SELECT * FROM posts WHERE id = '${id}';`;
    const { err, res } = await postgres.exec(sql);
    if (err || !Array.isArray(res) || !res[0]) {
        if (err) log.error('Error querying posts');
        return null;
    }
    return res[0];
};

module.exports.findOne = findOne;
