const express = require("express");
const { getCurrentCart } = require("../db/carts");
const router = express.Router();

router.get('/:userId/current', async (req, res) => {
    const { userId } = req.params;
    const cart = await getCurrentCart(userId);
    if (cart) {
        res.send({
            success: true,
            cart
        });
    } else {
        res.send({
            success: false,
            error: 'NoCurrentCart',
            message: 'No current cart! Please create a new one.'
        });
    };
});

module.exports = router;
