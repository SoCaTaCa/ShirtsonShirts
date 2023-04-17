const client = require('../../db/client');
const { createCategory } = require('../../db/categories');

// Write tests inside of this function.
const test = async () => {
    try {
        console.log('Testing createCategory');
        const fakeCategory = await createCategory("fakecat");
        if (typeof fakeCategory === "object" && fakeCategory.name === "fakecat") {
            console.log("passed");
        } else {
            console.log("failed");
        };
    } catch (err) {
        console.log('Error runnning tests!', err);
    };
};

client.connect()
    .then(test)
    .catch(console.error)
    .finally(() => client.end());