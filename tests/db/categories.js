const client = require('../../db/client');
const { rebuildDB, seedDB } = require('../../db/seedData');
const { createCategory, getAllCategories } = require('../../db/categories');

// Write tests inside of this function.
const test = async () => {
    console.log('--- RUNNING db/categories TESTS ---');
    try {
        console.log('Testing createCategory');
        const fakeCategory = await createCategory("fakecat");
        if (typeof fakeCategory === "object" && fakeCategory.name === "fakecat") {
            console.log("passed");
        } else {
            console.log("failed");
        };

        console.log('Testing getAllCategories');
        const categories = await getAllCategories();
        if (typeof categories === "object" && categories.length === 4) {
            console.log("passed");
        } else {
            console.log("FAILED");
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