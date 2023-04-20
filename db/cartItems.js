const client = require('./client');

const createCartItem = async ({ cartId, itemId, quantity }) => {
  const query = {
    text: 'INSERT INTO cart_items("cartId", "itemId", quantity) VALUES($1, $2, $3) RETURNING *',
    values: [cartId, itemId, quantity]
  };

  const { rows } = await client.query(query);
  return rows[0];
};

const getCartItemsByCartId = async (cartId) => {
  try {
    const { rows: cartItems } = await client.query(`
      SELECT cart_items.*, items.name, items.size
      FROM cart_items
      JOIN items
        ON cart_items."itemId"=items.id
      WHERE cart_items."cartId"=${cartId};
    `);
    return cartItems;
  } catch (error) {
    console.error(error);
  };
};

module.exports = {
  createCartItem,
  getCartItemsByCartId
};
