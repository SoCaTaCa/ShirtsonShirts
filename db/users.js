// inserts data into users table
const createUser = async ({ username, password, isAdmin }) => {
  try {
    const {
      roes: [user],
    } = await client.query(
      `
    INSERT INTO users(username, password, isAdmin)
    VALUES (${username}, ${password}, ${isAdmin})
    RETURNING id, username, password, isAdmin;
    `
    );
    return user;
  } catch {
    console.log("createUser error", err);
  }
};

// takes in a user ID and returns the corresponding user
const getUserById = async (userId) => {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT *
      FROM users
      WHERE id= ${userId}
    `,
      [userId]
    );
    return user;
  } catch (err) {
    console.log("getUserByID error", err);
  }
};

// takes in a username and returns the corresponding user
const getUserByUsername = async (username) => {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT *
      FROM users
      WHERE username=${username}
    `
    );
    return user;
  } catch (err) {
    console.log("getUserByUsername error", err);
  }
};
