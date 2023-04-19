const createCart = (cartData) => {

  const { userId } = cartData; 
  if (!userId || typeof userId !== 'string') {
    throw new Error('Invalid user ID');
  }

  const result = db.query('INSERT INTO carts (user_id) VALUES (?)', [userId]);

  if (result.affectedRows !== 1) {
    throw new Error('Failed to create cart');
  }

  return {
    id: result.insertId,
    userId,
    createdAt: new Date().toISOString() 
  };
}