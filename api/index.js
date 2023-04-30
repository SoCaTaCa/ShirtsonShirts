require("dotenv").config();

const express = require("express");
const apiRouter = express.Router();
const jwt = require("jsonwebtoken");
const { getUserById } = require("../db/users.js");
const { JWT_SECRET } = process.env;

apiRouter.use(async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");

  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const { id } = jwt.verify(token, JWT_SECRET);

      if (id) {
        req.user = await getUserById(id);
        next();
      }
    } catch (err) {
      next(err);
    }
  } else {
    next({
      name: "AuthorizationHeaderError",
      message: `Authorization token must start with ${prefix}`,
    });
  }
});

// ROUTER: /api/cartItems
const cartItemsRouter = require("./cartItems");
apiRouter.use("/cartitems", cartItemsRouter);

// ROUTER: /api/carts
const cartsRouter = require("./carts");
apiRouter.use("/carts", cartsRouter);

// ROUTER: /api/categories
const categoriesRouter = require("./categories");
apiRouter.use("/categories", categoriesRouter);

// ROUTER: /api/items
const itemsRouter = require("./items");
apiRouter.use("/items", itemsRouter);

// ROUTER: /api/users
const usersRouter = require("./users");
apiRouter.use("/users", usersRouter);

module.exports = apiRouter;
