const client = require('../../db/client');
const { rebuildDB, seedDB } = require('../../db/seedData');
const { createUser, getUserById, getUserByUsername, getUser } = require('../../db/users');

// Write tests inside of this function.
const test = async () => {
    console.log('--- RUNNING db/users TESTS ---');
    try {
        console.log('Testing createUser');
        const fakeUser = await createUser({
            username: 'fakeuser',
            password: 'password1234',
            isAdmin: true
        });
        if (typeof fakeUser === "object" && Object.keys(fakeUser).length && fakeUser.password === undefined) {
            console.log('passed');
        } else {
            console.log('FAILED');
        };

        console.log('Testing getUserById');
        const testUser = await getUserById(fakeUser.id);
        if (typeof testUser === "object" && fakeUser.username === testUser.username) {
            console.log('passed');
        } else {
            console.log('FAILED');
        };

        console.log('Testing getUserByUsername');
        const testUserTwo = await getUserByUsername('fakeuser');
        if (typeof testUserTwo === "object" && fakeUser.id === testUserTwo.id) {
            console.log('passed');
        } else {
            console.log('FAILED');
        };

        console.log('Testing getUser');
        const testUserThree = await getUser({
            username: 'fakeuser',
            password: 'password1234'
        });
        if (typeof testUserThree === "object" && fakeUser.id === testUserThree.id) {
            console.log('passed');
        } else {
            console.log('FAILED');
        }

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