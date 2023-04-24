const client = require('./client');
const { getCartItemsByCartId } = require('./cartItems');

const createCart = async ({ userId }) => {
  const query = {
    text: 'INSERT INTO carts("userId") VALUES($1) RETURNING *',
    values: [userId]
  };

  const { rows } = await client.query(query);
  return rows[0];
};

const purchaseCart = async (id) => {
  try {
    const { rows: [cart] } = await client.query(`
      UPDATE carts
      SET "isPurchased"=true, "purchaseTime"=CURRENT_TIMESTAMP
      WHERE id=${id}
      RETURNING *;
    `);
    return cart;
  } catch (error) {
    console.error(error);
  };
};

const getCurrentCart = async (userId) => {
  try {
    const { rows: [cart] } = await client.query(`
      SELECT *
      FROM carts
      WHERE "userId"=${userId}
      AND "isPurchased"=false
    `);
    if (cart) {
      cart.items = await getCartItemsByCartId(cart.id);
      return cart;
    };
    return null;
  } catch (error) {
    console.error(error);
  };
};

const getPreviousCarts = async (userId) => {
  try {
    const { rows: carts } = await client.query(`
      SELECT *
      FROM carts
      WHERE "userId"=${userId}
      AND "isPurchased"=true
    `);
    if (carts) {
      for (let i = 0; i < carts.length; i++) {
        if (carts[i]) {
          carts[i].items = await getCartItemsByCartId(carts[i].id);
        };
      };
      return carts;
    };
    return null;
  } catch (error) {
    console.error(error);
  };
};

module.exports = {
  createCart,
  purchaseCart,
  getCurrentCart,
  getPreviousCarts
};