// inserts data into users table
const createUser = async ({ username, password, isAdmin }) => {
  try {
    const user = await client.query(
      `
    INSERT INTO users(username, password, isAdmin)
    VALUES ($1, $2, $3)
    RETURNING id, username, password, isAdmin;
    `,
      [username, password, isAdmin]
    );
    return user;
  } catch {
    console.log("createUser error");
  }
};
// createUser test
console.log(createUser("jimmothy", "password", false));

// takes in a user ID and returns the corresponding user
const getUserById = async (userId) => {
  try {
    const user = await client.query(
      `
      SELECT *
      FROM users
      WHERE id=$1
    `,
      [userId]
    );
    return user;
  } catch (err) {
    console.log("getUserByID error");
  }
};
// getUserById test
// will only work if createUser is functional
console.log(getUserById(createUser("jimothy", "password", false).id));

// takes in a username and returns the corresponding user
const getUserByUsername = async (username) => {
  try {
    const user = await client.query(
      `
      SELECT *
      FROM users
      WHERE username=$1
    `,
      [username]
    );
    return user;
  } catch (err) {
    console.log("getUserByUsername error");
  }
};
// getUserByUsername test
// will only work if createUser is functional
console.log(getUserByUsername(createUser("jimothy", "password", false).id));
