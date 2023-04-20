const client = require('../../db/client');
const { rebuildDB, seedDB } = require('../../db/seedData');
const { getCartItemsByCartId } = require('../../db/cartItems');

// Write tests inside of this function.
const test = async () => {
    console.log('--- RUNNING db/cartItems TESTS ---');
    try {
        console.log('Testing getCartItemsByCartId')
        const cartItems = await getCartItemsByCartId(1);
        if (cartItems && cartItems.length === 2 && cartItems[0].name && cartItems[0].size) {
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