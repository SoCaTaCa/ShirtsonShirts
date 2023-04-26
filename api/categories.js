const express = require("express");
const { requireUser, requireAdmin } = require("./utils");
const router = express.Router();
const { getAllCategories, createCategory } = require("../db/categories");

router.get("/", async (req, res) => {
  try {
    const categories = await getAllCategories();
    if (categories) {
      res.send({
        success: true,
        categories,
      });
    } else {
      res.send({ success: false });
    }
  } catch (error) {
    console.error(error);
  }
});

router.post("/", requireUser, requireAdmin, async (req, res) => {
  const { name } = req.body;
  try {
    const category = await createCategory(name);
    if (category) {
      res.send({
        success: true,
        category,
      });
    } else {
      res.send({ success: false });
    }
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
