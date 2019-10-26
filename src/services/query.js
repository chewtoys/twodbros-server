const { log } = require('@vietduc/common');
const postgres = require('@vietduc/postgres');
const { sqlFromFilter } = require('../utils/sql');

const findAll = async filter => {
    const sql = `SELECT
        id,
        title,
        TO_CHAR(created_at, 'dd/mm/yyyy') AS "createdAt",
        tags,
        content,
        status
        FROM posts
        ${sqlFromFilter(filter)};`;
    const { err, res } = await postgres.exec(sql);
    if (err) {
        log.error('Error querying posts');
        log.error(err);
        throw err;
    }
    if (!Array.isArray(res)) {
        log.error('Error querying posts');
        return [];
    }
    return res;
};

module.exports.findAll = findAll;

const findOne = async ({ id }) => {
    const sql = `SELECT
        id,
        title,
        TO_CHAR(created_at, 'dd/mm/yyyy') AS "createdAt",
        tags,
        content,
        status
        FROM posts
        WHERE id = '${id}';`;
    const { err, res } = await postgres.exec(sql);
    if (err) {
        log.error('Error querying the post');
        log.error(err);
        throw err;
    }
    if (!Array.isArray(res)) {
        log.error('Error querying the post');
        return null;
    }
    return res[0] || null;
};

module.exports.findOne = findOne;
