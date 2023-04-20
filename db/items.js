const client = require('./db/client');

const createItem = async ({ name, price, size, categoryId, description }) => {
  const query = {
    text: 'INSERT INTO items(name, price, size, category_id, description) VALUES($1, $2, $3, $4, $5) RETURNING *',
    values: [name, price, size, categoryId, description]
  };

  const { rows } = await client.query(query);
  return rows[0];
};

  