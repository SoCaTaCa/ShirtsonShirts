const express = require("express");
const { requireUser, requireAdmin } = require("./utils");
const router = express.Router();
const jwt = require("jsonwebtoken");

const {
  getUser,
  getUserByUsername,
  getUserById,
  createUser,
} = require("../db/users");

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return;
    }
    const user = await getUser({ username, password });
    if (user) {
      const token = jwt.sign(
        {
          id: user.id,
          username,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1w",
        }
      );
      res.send({
        success: true,
        message: "Login succesful!",
        token,
        user,
      });
    } else {
      res.send({
        success: false,
        error: "IncorrectCredentialsError",
        message: "Username and password do not match!",
      });
    }
  } catch (error) {
    console.error(error);
  }
});

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return;
    }
    const existingUser = await getUserByUsername(username);
    if (existingUser) {
      res.send({
        success: false,
        error: "UsernameTakenError",
        message: "Username is already taken.",
      });
    } else if (password.length < 8) {
      res.send({
        success: false,
        error: "PasswordTooShortError",
        message: "Password must be atleast 8 characters long.",
      });
    } else {
      const user = await createUser(req.body);
      if (user) {
        delete user.password;
        const token = jwt.sign(
          {
            id: user.id,
            username,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1w",
          }
        );
        res.send({
          success: true,
          message: "Thank you for signing up!",
          token,
          user,
        });
      }
    }
  } catch (error) {
    console.error(error);
  }
});

router.get("/me", requireUser, async (req, res) => {
  try {
    const user = await getUserById(req.user.id);
    if (user) {
      res.send({
        success: true,
        user,
      });
    } else {
      res.send({ success: false });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
