const client = require('../../db/client');
const app = require('../../app')
const request = require('supertest');
const { rebuildDB, seedDB } = require('../../db/seedData');

// Write tests inside of this function.
const test = async () => {
    console.log('--- RUNNING api/categories TESTS ---');
    try {
        console.log('Testing get to /');
        let response = await request(app)
            .get('/api/categories');

        if (response.body && response.body.length === 3) {
            console.log('passed');
        } else {
            console.log('FAILED');
        };

        console.log('Testing post route to /');
        response = await request(app)
            .post('/api/categories')
            .send({ name: 'newcategory' })

        if (typeof response.body === 'object' && response.body.name === 'newcategory') {
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
