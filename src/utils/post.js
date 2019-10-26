const ensureLength = (num, length) => {
    const str = num.toString();
    return str.padStart(length, '0');
};

const sqlFromFilter = f => {
    if (typeof f !== 'object' || Object.keys(f).length === 0) return '';

    const conds = [];
    if (f.status) conds.push(`status = '${f.status}'`);
    if (f.tag) conds.push(`'${f.tag}' = ANY (tags)`);
    if (f.created_year && f.created_month && f.created_date) {
        conds.push(`created_at = '${f.created_year}-${ensureLength(f.created_month, 2)}-${f.created_date}'`);
    }
    if (f.created_year && f.created_month) {
        conds.push(`created_at >= '${f.created_year}-${ensureLength(f.created_month, 2)}-01'
            AND created_at < '${f.created_year}-${ensureLength(f.created_month + 1, 2)}-01'`);
    }
    if (f.created_year) {
        conds.push(`created_at >= '${f.created_year}-01-01' AND created_at < '${f.created_year + 1}-01-01'`);
    }

    if (conds.length === 0) return '';

    return ` WHERE ${conds.join(' AND ')} `;
};

module.exports.sqlFromFilter = sqlFromFilter;
