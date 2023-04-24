const client = require('./client');

const createCart = async ({ userId }) => {
  const query = {
    text: 'INSERT INTO carts("userId") VALUES($1) RETURNING *',
    values: [userId]
  };
  // for consistency across our codebase, we should either adjust this to { rows: [ cart ] } or adjust our other sections to match this
  const { rows } = await client.query(query);
  return rows[0];
};

module.exports = {
  createCart
};