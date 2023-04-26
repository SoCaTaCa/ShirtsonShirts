const client = require('../../db/client');
const app = require('../../app')
const request = require('supertest');
const { rebuildDB, seedDB } = require('../../db/seedData');

// Write tests inside of this function.
const test = async () => {
    console.log('--- RUNNING api/users TESTS ---');
    try {

        const loginResponse = await request(app)
            .post('/api/users/login')
            .send({
                username: 'cdoussan',
                password: 'apples45'
            });
        const token = loginResponse.body.token;

        console.log('Testing /register');
        const goodResponse = await request(app)
            .post('/api/users/register')
            .send({
                username: 'newguy',
                password: 'password1234',
                isAdmin: true
            });

        const badResponse = await request(app)
            .post('/api/users/register')
            .send({
                username: 'tredding',
                password: 'password1234',
                isAdmin: true
            });

        if (goodResponse.body.success && !badResponse.body.success) {
            console.log('passed');
        } else {
            console.log('FAILED');
        };

        console.log('Testing /me');
        const userResponse = await request(app)
            .get('/api/users/me')
            .set('Authorization', `Bearer ${token}`);

        if (userResponse && userResponse.body.username === loginResponse.body.user.username) {
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