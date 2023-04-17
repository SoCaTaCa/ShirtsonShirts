const client = require('./client');
const { rebuildDB, seedDB } = require('./seedData');

rebuildDB()
    .then(seedDB)
    .catch(console.error)
    .finally(() => client.end());