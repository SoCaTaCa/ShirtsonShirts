const client = require('./client');
const { rebuildDB } = require('./seedData');
const { seedDBProd } = require('./seedDataProd');

rebuildDB()
    .then(seedDBProd)
    .catch(console.error)
    .finally(() => client.end());