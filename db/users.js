const client = require('./client');
const bcrypt = require('bcrypt');

// inserts data into users table
const createUser = async ({ username, password, isAdmin }) => {
  try {
    password = await bcrypt.hash(password, 10);
    const {
      rows: [user],
    } = await client.query(
      `
    INSERT INTO users(username, password, "isAdmin")
    VALUES ($1, $2, $3)
    RETURNING id, username, "isAdmin";
    `,
      [username, password, isAdmin]
    );
    return user;
  } catch (err) {
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
      WHERE id=${userId}
    `
    );
    delete user.password;
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
      WHERE username='${username}'
    `
    );
    delete user.password;
    return user;
  } catch (err) {
    console.log("getUserByUsername error", err);
  }
};

const getUser = async ({ username, password }) => {
  try {
    const { rows: [user] } = await client.query(`
      SELECT *
      FROM users
      WHERE username='${username}'
    `);
    if (user && await bcrypt.compare(password, user.password)) {
      delete user.password;
      return user;
    }
    return null;
  } catch (err) {
    console.log("getUser error", err);
  };
};

module.exports = {
  createUser,
  getUserById,
  getUserByUsername,
  getUser
};