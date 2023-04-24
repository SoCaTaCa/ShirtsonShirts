const { getCartById, getCurrentCart, getPreviousCarts } = require('../../db/carts');
const client = require('../../db/client');
const { rebuildDB, seedDB } = require('../../db/seedData');

// Write tests inside of this function.
const test = async () => {
    console.log('--- RUNNING db/carts TESTS ---');
    try {
        console.log('Tetsing getCartById');
        const cart1 = await getCartById(1);
        if (cart1 && cart1.id === 1) {
            console.log('passed');
        } else {
            console.log('FAILED');
        };

        console.log('Testing getCurrentCart');
        const cart = await getCurrentCart(2);
        if (cart && !cart.isPurchased) {
            console.log('passed');
        } else {
            console.log('FAILED');
        };

        console.log('Testing getPreviousCarts');
        const carts = await getPreviousCarts(1);
        if (carts.length && carts[0].isPurchased) {
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