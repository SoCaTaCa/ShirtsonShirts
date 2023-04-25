const express = require("express");
const router = express.Router();
const { requireUser } = require('./utils');
const { getCartItemById, updateCartItem, createCartItem, destroyCartItem } = require("../db/cartItems");
const { getCartById, getCurrentCart, createCart } = require('../db/carts');

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
                    error: 'UnauthorizedUpdateError',
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
});

router.post('/', requireUser, async (req, res) => {
    const { itemId, quantity } = req.body;
    try {
        let currentCart = await getCurrentCart(req.user.id);
        if (!currentCart) {
            currentCart = await createCart({ userId: req.user.id });
        };
        const cartItem = await createCartItem({
            cartId: currentCart.id,
            itemId,
            quantity
        });
        if (cartItem) {
            res.send({
                success: true,
                cartItem
            });
        };
    } catch (error) {
        console.error(error);
    };
});

router.delete('/:cartItemId', requireUser, async (req, res) => {
    const { cartItemId } = req.params;
    try {
        const cartItem = await getCartItemById(cartItemId);
        if (cartItem) {
            const cart = await getCartById(cartItem.cartId);
            if (cart.userId === req.user.id) {
                if (cart.isPurchased) {
                    res.send({
                        success: false,
                        error: 'CartAlreadyPurchased',
                        message: 'You can not remove an item from a previous order!'
                    });
                } else {
                    const deletedCartItem = await destroyCartItem(cartItemId);
                    res.send({
                        success: true,
                        deletedCartItem
                    });
                }
            } else {
                res.send({
                    success: false,
                    error: 'UnauthorizedDeleteError',
                    message: 'You do not have permission to remove this item!'
                });
            };
        } else {
            res.send({
                success: false,
                error: 'InvalidCartItemId',
                message: `Can not find a cart item with id ${cartItemId}`
            });
        }
    } catch (error) {
        console.error(error);
    };
});

module.exports = router;
