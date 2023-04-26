const express = require("express");
const { requireUser, requireAdmin } = require("./utils");
const { getCurrentCart, getPreviousCarts } = require("../db/carts");
const router = express.Router();

router.get("/:userId/current", requireUser, async (req, res) => {
  const { userId } = req.params;
  const cart = await getCurrentCart(userId);
  if (cart) {
    res.send({
      success: true,
      cart,
    });
  } else {
    res.send({
      success: false,
      error: "NoCurrentCart",
      message: "No current cart! Please create a new one.",
    });
  }
});

router.get("/:userId/previous", requireUser, async (req, res) => {
  const { userId } = req.params;
  const carts = await getPreviousCarts(userId);
  if (carts.length) {
    res.send({
      success: true,
      carts,
    });
  } else {
    res.send({
      success: false,
      error: "NoPreviousCarts",
      message: "This user does not have any previous orders",
    });
  }
});

router.patch("/:cartId", requireUser, async (req, res) => {
  const { userId, isPurchaced } = req.body;
  try {
    const cart = await purchaseCart(userId);
    if (cart) {
      res.send({
        success: true,
        cart,
      });
    } else {
      res.send({ success: false });
    }
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
