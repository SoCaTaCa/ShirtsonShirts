const client = require('./db/client');

const createCart = async ({ userId }) => {
  const query = {
    text: 'INSERT INTO carts(user_id) VALUES($1) RETURNING *',
    values: [userId]
  };

  const { rows } = await client.query(query);
  return rows[0];
};
