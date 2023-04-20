const express = require("express");
const router = express.Router();
const {
  createItem,
  getAllItems,
  getItemById,
  getItemsByName,
  getItemsByCategories,
  updateItem,
  destroyItem,
} = require("../db/items");

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
router.post("/", async (req, res) => {
  try {
    const items = await createItem();
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

// PATCH /api/items
router.patch("/", async (req, res) => {
  const { name } = req.body;
  try {
    const item = await updateItem(name);
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
  try {
    const item = await getItemById();
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
router.delete("/:itemid", async (req, res) => {
  const { name } = req.body;
  try {
    const item = await destroyItem(name);
    if (!item) {
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
router.get("/:categories", async (req, res) => {
  try {
    const items = await getItemsByCategories();
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
