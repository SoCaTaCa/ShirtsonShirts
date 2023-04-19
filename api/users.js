const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');

const { getUser } = require('../db/users');

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        if (!username || !password) {
            return;
        };
        const user = await getUser({ username, password })
        if (user) {
            const token = jwt.sign({
                id: user.id,
                username
            }, process.env.JWT_SECRET, {
                expiresIn: '1w'
            });
            res.send({
                success: true,
                message: 'Login succesful!',
                token,
                user
            });
        } else {
            res.send({
                success: false,
                error: 'IncorrectCredentialsError',
                message: 'Username and password do not match!'
            });
        }
    } catch (error) {
        console.error(error);
    };
});

module.exports = router;
