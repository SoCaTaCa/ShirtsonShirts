const express = require("express");
const { getCurrentCart, getPreviousCarts } = require("../db/carts");
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

router.get('/:userId/previous', async (req, res) => {
    const { userId } = req.params;
    const carts = await getPreviousCarts(userId);
    if (carts.length) {
        res.send({
            success: true,
            carts
        });
    } else {
        res.send({
            success: false,
            error: 'NoPreviousCarts',
            message: 'This user does not have any previous orders'
        });
    };
});

module.exports = router;
