const client = require('../../db/client');
const app = require('../../app')
const request = require('supertest');
const { rebuildDB, seedDB } = require('../../db/seedData');

// Write tests inside of this function.
const test = async () => {
    console.log('--- RUNNING api/cartItems TESTS ---');
    try {
        let loginResponse = await request(app)
            .post('/api/users/login')
            .send({
                username: 'cdoussan',
                password: 'apples45'
            });
        const tokenOne = loginResponse.body.token;

        loginResponse = await request(app)
            .post('/api/users/login')
            .send({
                username: 'tredding',
                password: 'slushies89'
            });
        const tokenTwo = loginResponse.body.token;

        console.log('Testing patch to /:cartItemId');
        const goodResponse = await request(app)
            .patch('/api/cartItems/3')
            .set('Authorization', `Bearer ${tokenOne}`)
            .send({
                quantity: 100
            });

        const badResponseOne = await request(app)
            .patch('/api/cartItems/2')
            .set('Authorization', `Bearer ${tokenOne}`)
            .send({
                quantity: 100
            });

        const badResponseTwo = await request(app)
            .patch('/api/cartItems/2')
            .set('Authorization', `Bearer ${tokenTwo}`)
            .send({
                quantity: 100
            });

        const badResponseThree = await request(app)
            .patch('/api/cartItems/200')
            .set('Authorization', `Bearer ${tokenTwo}`)
            .send({
                quantity: 100
            });

        if (goodResponse.body.cartItem.quantity === 100 &&
            badResponseOne.body.error === 'UnauthorizedUserError' &&
            badResponseTwo.body.error === 'CartAlreadyPurchased' &&
            badResponseThree.body.error === 'InvalidCartItemId') {
            console.log('passed');
        } else {
            console.log('FAILED');
        };

    } catch (err) {
        console.log('Error runnning tests!', err);
    };
    console.log('--- TESTS FINISHED! ---');
};

rebuildDB()
    .then(seedDB)
    .then(test)
    .catch(console.error)
    .finally(() => client.end());