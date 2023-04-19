const express = require("express");
const router = express.Router();
const { getAllCategories, createCategory } = require('../db/categories');

router.get('/', async (req, res) => {
    try {
        const categories = await getAllCategories();
        res.send(categories);
    } catch (error) {
        console.error(error);
    };
});

router.post('/', async (req, res) => {
    const { name } = req.body;
    try {
        const category = await createCategory(name);
        res.send(category);
    } catch (error) {
        console.error(error);
    };
});

module.exports = router;
