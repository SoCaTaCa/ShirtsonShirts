const client = require('./client');

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

module.exports = {
  createCart,
  purchaseCart
};