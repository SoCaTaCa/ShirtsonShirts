const { rebuildDB, seedDB } = require('../../db/seedData');
// Re-initialize database
rebuildDB();
seedDB();

// Write tests below

// Clear database of test information
rebuildDB();
seedDB();
