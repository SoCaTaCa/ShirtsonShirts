const client = require('./client');

const createCartItem = async ({ cartId, itemId, quantity }) => {
  const query = {
    text: 'INSERT INTO cart_items("cartId", "itemId", quantity) VALUES($1, $2, $3) RETURNING *',
    values: [cartId, itemId, quantity]
  };

  const { rows } = await client.query(query);
  return rows[0];
};

module.exports = {
  createCartItem
};
