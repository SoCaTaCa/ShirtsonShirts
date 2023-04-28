const express = require("express");
const { requireUser, requireAdmin } = require("./utils");
const router = express.Router();
const { getAllCategories, createCategory, getCategoryByName } = require("../db/categories");

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

router.get("/:categoryName", async (req, res) => {
  const { categoryName } = req.params;
  try {
    const category = await getCategoryByName(categoryName);
    if (category) {
      res.send({
        success: true,
        category,
      });
    } else {
      res.send({
        success: false,
        error: 'CategoryDoesNotExist',
        message: `The category \"${categoryName}\" does not exist!`
      });
    };
  } catch (error) {
    console.error(error);
  };
});

module.exports = router;
