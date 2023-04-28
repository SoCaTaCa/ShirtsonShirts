const client = require('../../db/client');
const app = require('../../app')
const request = require('supertest');
const { rebuildDB, seedDB } = require('../../db/seedData');

// Write tests inside of this function.
const test = async () => {

    const adminLoginResponse = await request(app)
      .post('/api/users/login')
      .send({
        username: 'cdoussan',
        password: 'apples45'
      });
    const adminToken = adminLoginResponse.body.token;

    console.log('--- RUNNING api/categories TESTS ---');
    try {
        console.log('Testing get to /');
        let response = await request(app)
            .get('/api/categories');

        if (response.body.success && response.body.categories.length === 3) {
            console.log('passed');
        } else {
            console.log('FAILED');
        };

        console.log('Testing post route to /');
        response = await request(app)
            .post('/api/categories')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({ name: 'newcategory' })

        if (response.body.success && response.body.category.name === 'newcategory') {
            console.log('passed');
        } else {
            console.log('FAILED');
        };

        console.log('Testing get route to /:categoryName');
        const goodResponse = await request(app)
            .get('/api/categories/tee-shirt');

        const badResponse = await request(app)
            .get('/api/categories/pants')

        if (goodResponse.body.success && badResponse.body.error === 'CategoryDoesNotExist') {
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
