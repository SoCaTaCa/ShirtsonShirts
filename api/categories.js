const express = require("express");
const router = express.Router();
const { getAllCategories } = require('../db/categories');

router.get('/', async (req, res) => {
    try {
        const categories = await getAllCategories();
        res.send(categories);
    } catch (error) {
        console.error(error);
    };
});

module.exports = router;
