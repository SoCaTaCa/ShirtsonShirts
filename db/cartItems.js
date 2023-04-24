const client = require('./client');

const createCartItem = async ({ cartId, itemId, quantity }) => {
  const query = {
    text: 'INSERT INTO cart_items("cartId", "itemId", quantity) VALUES($1, $2, $3) RETURNING *',
    values: [cartId, itemId, quantity]
  };

  const { rows } = await client.query(query);
  return rows[0];
};

const getCartItemById = async (id) => {
  try {
    const query = {
      text: 'SELECT * FROM cart_items WHERE id = $1',
      values: [id]
    };

    const { rows } = await client.query(query);
    return rows[0];
  } catch (error) {
    console.error(error);
  };
};

const getCartItemsByCartId = async (cartId) => {
  try {
    const { rows: cartItems } = await client.query(`
      SELECT cart_items.id AS "cartItemId", cart_items."cartId", cart_items."itemId", cart_items.quantity, items.name, items.size
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

const updateCartItem = async (id, quantity) => {
  try {
    const query = {
      text: 'UPDATE cart_items SET quantity=($1) WHERE id=($2) RETURNING *;',
      values: [quantity, id]
    };

    const { rows } = await client.query(query);
    return rows[0];
  } catch (error) {
    console.error(error);
  };
};

const destroyCartItem = async (id) => {
  try {
    const query = {
      text: 'DELETE FROM cart_items WHERE id=($1) RETURNING *;',
      values: [id]
    };

    const { rows } = await client.query(query);
    return rows[0];
  } catch (error) {
    console.error(error);
  };
};

module.exports = {
  createCartItem,
  getCartItemById,
  getCartItemsByCartId,
  updateCartItem,
  destroyCartItem
};
