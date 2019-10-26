const { log } = require('@vietduc/common');
const postgres = require('@vietduc/postgres');

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
        return null;
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
