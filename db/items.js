const createItem = (itemData) => {
    const { name, price } = itemData; 
    if (!name || typeof name !== 'string') {
      throw new Error('Invalid item name');
    }
    if (!price || typeof price !== 'number' || price <= 0) {
      throw new Error('Invalid item price');
    }
    const result = db.query('INSERT INTO items (name, price) VALUES (?, ?)', [name, price]);
    if (result.affectedRows !== 1) {
      throw new Error('Failed to create item');
    }
    return {
      id: result.insertId,
      name,
      price,
      createdAt: new Date().toISOString() 
    };
  };
  