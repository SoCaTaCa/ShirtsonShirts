const client = require('./client');

const createItem = async ({ name, price, size, categoryId, description }) => {
  const query = {
    text: 'INSERT INTO items(name, price, size, category_id, description) VALUES($1, $2, $3, $4, $5) RETURNING *',
    values: [name, price, size, categoryId, description]
  };

  const { rows } = await client.query(query);
  return rows[0];
};

const getAllItems = async () => {
  const query = {
    text: 'SELECT * FROM items',
  };

  const { rows } = await client.query(query);
  return rows;
};

const getItemById = async (id) => {
  const query = {
    text: 'SELECT * FROM items WHERE id = $1',
    values: [id],
  };

  const { rows } = await client.query(query);
  return rows[0];
};

const getItemsByCategory = async (categoryId) => {
  const query = {
    text: 'SELECT * FROM items WHERE category_id = $1',
    values: [categoryId],
  };

  const { rows } = await client.query(query);
  return rows;
};

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
  getAllItems,
  getItemById,
  getItemsByCategory,
  getItemsByName,
};
