const { getCurrentCart } = require('../../db/carts');
const client = require('../../db/client');
const { rebuildDB, seedDB } = require('../../db/seedData');

// Write tests inside of this function.
const test = async () => {
    console.log('--- RUNNING db/carts TESTS ---');
    try {
        console.log('Testing getCurrentCart');
        const cart = await getCurrentCart(2);
        if (cart && !cart.isPurchased) {
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