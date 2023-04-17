const client = require('./client');

const dropTables = async () => {
    try {
        console.log('Dropping tables...');
        await client.query(`
            DROP TABLE IF EXISTS cart_items;
            DROP TABLE IF EXISTS carts;
            DROP TABLE IF EXISTS items;
            DROP TABLE IF EXISTS categories;
            DROP TABLE IF EXISTS users;
        `);
        console.log('Finished dropping tables.');
    } catch (error) {
        console.log('Error dropping tables!');
        console.error(error);
    };
};

const createTables = async () => {
    try {
        console.log('Creating tables...');
        await client.query(`
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(50) NOT NULL,
                "isAdmin" BOOLEAN DEFAULT FALSE
            );

            CREATE TABLE categories (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255)
            );

            CREATE TABLE items (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                size VARCHAR(10) NOT NULL,
                "categoryId" INTEGER REFERENCES categories(id),
                description TEXT NOT NULL,
                "imageURL" TEXT,
                price INTEGER NOT NULL,
                UNIQUE (name, size)
            );

            CREATE TABLE carts (
                id SERIAL PRIMARY KEY,
                "userId" INTEGER REFERENCES users(id),
                "isPurchased" BOOLEAN DEFAULT false,
                purchaseTime TIMESTAMPTZ
            );
 
 
            CREATE TABLE cart_items (
                id SERIAL PRIMARY KEY,
                "cartId" INTEGER REFERENCES carts(id),
                "itemId" INTEGER REFERENCES items(id),
                quantity INTEGER NOT NULL,
                UNIQUE ("cartId", "itemId")
            );
 
        `)
        console.log('Finished creating tables!');
    } catch (error) {
        console.error(error);
    };

};

const rebuildDB = async () => {
    try {
        client.connect();
        await dropTables();
        await createTables();
    } catch (error) {
        console.error(error);
    };
};

const seedDB = async () => {
    try {
        console.log('Seeding databse...');
        
        console.log('Finished seeding database!');
    } catch (error) {
        console.log('Error seeding databse!');
        console.error(error);
    };
};

rebuildDB()
    .then(seedDB)
    .catch(console.error)
    .finally(() => client.end());

module.exports = {
    rebuildDB,
    seedDB
};