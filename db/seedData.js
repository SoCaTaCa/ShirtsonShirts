const client = require('./client');
const { createCategory } = require('./categories');
const { createUser } = require('./users');

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
                password VARCHAR(255) NOT NULL,
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
        console.log('Error creating tables!');
        console.error(error);
    };

};

const createInitialUsers = async () => {
    try {
        console.log('Creating initial users...');

        const tate = await createUser({
            username: 'tredding',
            password: 'slushies89',
            isAdmin: false
        });

        const cass = await createUser({
            username: 'cdoussan',
            password: 'apples45',
            isAdmin: true
        });

        const soren = await createUser({
            username: 'saxelson',
            password: 'saxman33',
            isAdmin: false
        });

        const caro = await createUser({
            username: 'cpruna',
            password: 'shirtsarethefuture',
            isAdmin: true
        });

        console.log([tate, cass, soren, caro])
        console.log('Finished creating users!');
    } catch (err) {
        console.log('Error creating users!');
        console.log(err);
    }
}

const createInitialCategories = async () => {
    try {
        console.log('Creating initial categoreis...');

        const categoryOne = await createCategory('tee-shirt');
        const categoryTwo = await createCategory('tank-top');
        const categoryThree = await createCategory('long-sleeve');

        console.log([categoryOne, categoryTwo, categoryThree]);

        console.log('Finsihed creating categories!');
    } catch (err) {
        console.log('Error creating initial categories!');
        console.log(err);
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
        await createInitialCategories();
        await createInitialUsers();
        console.log('Finished seeding database!');
    } catch (error) {
        console.log('Error seeding databse!');
        console.error(error);
    };
};

module.exports = {
    rebuildDB,
    seedDB
}