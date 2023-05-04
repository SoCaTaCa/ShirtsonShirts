const express = require("express");
const { destroyCartItem, getCartItemsByItemId } = require("../db/cartItems");
const router = express.Router();
const {
  createItem,
  getAllItems,
  getItemById,
  getItemsByName,
  getItemsByCategory,
  updateItem,
  destroyItem,
} = require("../db/items");
const { requireUser, requireAdmin } = require('./utils');

// GET /api/items
router.get("/", async (req, res) => {
  try {
    const items = await getAllItems();
    if (items) {
      res.send({
        success: true,
        items,
      });
    } else {
      res.send({ success: false });
    }
  } catch (error) {
    console.error(error);
  }
});
// POST/api/items
router.post("/", requireUser, requireAdmin, async (req, res) => {
  const { name, price, size, categoryId, description } = req.body;
  let { imageURL } = req.body;
  if (!imageURL) {
    imageURL = './images/default_shirt.png'
  };
  
  try {
    const item = await createItem({ name, price, size, categoryId, description, imageURL });
    if (item) {
      res.send({
        success: true,
        item,
      });
    } else {
      res.send({ success: false });
    }
  } catch (error) {
    console.error(error);
  }
});

// PATCH /api/items
router.patch("/:itemid", requireUser, requireAdmin, async (req, res) => {
  const { name, price, size, categoryId, description, imageURL } = req.body;
  const { itemid } = req.params;
  try {
    const item = await updateItem({
      id: itemid,
      name,
      price,
      size,
      categoryId,
      description,
      imageURL
    });
    if (item) {
      res.send({
        success: true,
        item,
      });
    } else {
      res.send({ success: false });
    }
  } catch (error) {
    console.error(error);
  }
});

// GET /api/items/:itemid
router.get("/:itemid", async (req, res) => {
  const { itemid } = req.params;
  try {
    const item = await getItemById(itemid);
    if (item) {
      res.send({
        success: true,
        item,
      });
    } else {
      res.send({ success: false });
    }
  } catch (error) {
    console.error(error);
  }
});

// DELETE /api/items/:itemid
router.delete("/:itemid", requireUser, requireAdmin, async (req, res) => {
  const { itemid } = req.params;
  try {
    const cartitems = await getCartItemsByItemId(itemid);
    for (let i = 0; i < cartitems.length; i++) {
      await destroyCartItem(cartitems[i].id);
    }
    const item = await destroyItem(itemid);
    if (item) {
      res.send({
        success: true,
        item,
      });
    } else {
      res.send({ success: false });
    }
  } catch (error) {
    console.error(error);
  }
});

// GET /api/items/:categories
router.get("/category/:categoryid", async (req, res) => {
  const { categoryid } = req.params;
  try {
    const items = await getItemsByCategory(categoryid);
    if (items) {
      res.send({
        success: true,
        items,
      });
    } else {
      res.send({ success: false });
    }
  } catch (error) {
    console.error(error);
  }
});

// GET /api/items/:itemname
router.get("/name/:itemname", async (req, res) => {
  const { itemname } = req.params;
  try {
    const items = await getItemsByName(itemname);
    if (items) {
      res.send({
        success: true,
        items,
      });
    } else {
      res.send({ success: false });
    }
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
