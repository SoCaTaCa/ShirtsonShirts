const express = require("express");
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
    const items = await createItem(req.body);
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
    const item = await updateItem(req.body.name);
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
  const { id } = req.params.itemid;
  try {
    const item = await getItemById(id);
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
  const { id } = req.params.itemid;
  try {
    const item = await destroyItem(id);
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
router.get("/category/:categoryid", async (req, res) => {
  try {
    const items = await getItemsByCategory();
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
  const { name } = req.body.name;
  try {
    const items = await getItemsByName(name);
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
