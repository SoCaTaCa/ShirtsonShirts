const client = require('../../db/client');

// Write tests inside of this function.
const test = async () => {
    try {

    } catch (err) {
        console.log('Error runnning tests!', err);
    };
};

client.connect()
    .then(test)
    .catch(console.error)
    .finally(() => client.end());
