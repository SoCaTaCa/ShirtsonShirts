const client = require('../db/client');

const createCategory = async (name) => {
    try {
        const { rows: [category] } = await client.query(`
            INSERT INTO categories(name)
            VALUES($1)
            RETURNING *;
        `, [name]);
        return category;
    } catch (err) {
        console.log('createCategory error', err);
    };
};

module.exports = {
    createCategory
};