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

const getAllCategories = async () => {
    try {
        const { rows: categories } = await client.query(`
            SELECT *
            FROM categories
        `);
        return categories;
    } catch (err) {
        console.log('getAllCategories error', err);
    };
};

module.exports = {
    createCategory,
    getAllCategories
};