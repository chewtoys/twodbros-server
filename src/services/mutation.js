const { log } = require('@vietduc/common');
const postgres = require('@vietduc/postgres');
const { findOne } = require('./query');
const { sqlFromUpdate } = require('../utils/sql');

const create = async ({ title, tags, content }) => {
    const now = new Date();
    const id = now.getTime();
    const createdAt = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
    const status = 'EDITING';
    const sql = `INSERT INTO posts (id, title, created_at, tags, content, status)
        VALUES (
            '${id}',
            '${title}',
            '${createdAt}',
            '{"${tags.join('", "')}"}',
            '${content}',
            '${status}'
        );`;
    const { err } = await postgres.exec(sql);
    if (err) {
        log.error('Error creating the post');
        log.error(err);
        throw err;
    }
    return {
        id,
        title,
        createdAt,
        tags,
        content,
        status
    };
};

module.exports.create = create;

const update = async (id, updates) => {
    const sql = `UPDATE posts ${sqlFromUpdate(updates)} WHERE id = '${id}';`;
    const { err } = await postgres.exec(sql);
    if (err) {
        log.error('Error updating the post');
        log.error(err);
        throw err;
    }
    const post = await findOne({ id });
    if (!post) {
        const err2 = new Error('Error updating a non-existent post');
        log.error(err2);
        throw err2;
    }
    return post;
};

module.exports.update = update;
