const createCartItem = (itemData) => {
    
    if (!itemData || typeof itemData !== 'object') {
      throw new Error('Invalid item data');
    }
    if (!itemData.productId || typeof itemData.productId !== 'string') {
      throw new Error('Invalid product ID');
    }
    if (!itemData.quantity || typeof itemData.quantity !== 'number' || itemData.quantity <= 0) {
      throw new Error('Invalid item quantity');
    }
    // This is for a database connection object named 'db' or something like that. Remember SKELETONSSSSSS
    const result = db.query('INSERT INTO cart_items (product_id, quantity) VALUES (?, ?)', [itemData.productId, itemData.quantity]);
    
    if (result.affectedRows !== 1) {
      throw new Error('Failed to create cart item');
    }
    
    return {
      id: result.insertId,
      productId: itemData.productId,
      quantity: itemData.quantity
    };
  }