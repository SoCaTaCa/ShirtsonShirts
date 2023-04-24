const express = require("express");
const router = express.Router();
const { requireUser } = require('./utils');
const { getCartItemById, updateCartItem } = require("../db/cartItems");
const { getCartById } = require('../db/carts');

router.patch('/:cartItemId', requireUser, async (req, res) => {
    const { cartItemId } = req.params;
    const { quantity } = req.body;
    try {
        const _cartItem = await getCartItemById(cartItemId);
        if (_cartItem) {
            const cart = await getCartById(_cartItem.cartId);
            if (cart.userId === req.user.id) {
                if (cart.isPurchased) {
                    res.send({
                        success: false,
                        error: 'CartAlreadyPurchased',
                        message: 'You can not update an item from a previous order!'
                    });
                } else {
                    const cartItem = await updateCartItem(cartItemId, quantity);
                    if (cartItem) {
                        res.send({
                            success: true,
                            cartItem
                        });
                    }
                }
            } else {
                res.send({
                    success: false,
                    error: 'UnauthorizedUserError',
                    message: 'You can not modify an item in a cart that is not yours!'
                });
            };
        } else {
            res.send({
                success: false,
                error: 'InvalidCartItemId',
                message: `Can not find a cart item with id ${cartItemId}`
            })
        }

    } catch (error) {
        console.error(error);
    };

})


module.exports = router;
