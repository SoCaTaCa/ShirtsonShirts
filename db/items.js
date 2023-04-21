const client = require('./client');

//createItem function
const createItem = async ({ name, price, size, categoryId, description }) => {
  const query = {
    text: 'INSERT INTO items(name, price, size, category_id, description) VALUES($1, $2, $3, $4, $5) RETURNING *',
    values: [name, price, size, categoryId, description]
  };

  const { rows } = await client.query(query);
  return rows[0];
};

//getItemsByName function
const getItemsByName = async (name) => {
  const query = {
    text: 'SELECT * FROM items WHERE name ILIKE $1',
    values: [`%${name}%`],
  };

  const { rows } = await client.query(query);
  return rows;
};

module.exports = {
  createItem,
  getItemsByName,
};
