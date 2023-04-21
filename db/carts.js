const client = require('./client');

const createCart = async ({ userId }) => {
  const query = {
    text: 'INSERT INTO carts("userId") VALUES($1) RETURNING *',
    values: [userId]
  };

  const { rows } = await client.query(query);
  return rows[0];
};

module.exports = {
  createCart
};