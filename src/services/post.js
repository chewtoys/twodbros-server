const postgres = require('@vietduc/postgres');

const findAll = () => {
    const sql = `SELECT * FROM posts;`;
    return postgres.exec(sql);
};

module.exports.findAll = findAll;

const findOne = ({ id }) => {
    const sql = `SELECT * FROM posts WHERE id = '${id}';`;
    return postgres.exec(sql);
};

module.exports.findOne = findOne;
