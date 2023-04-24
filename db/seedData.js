const client = require('./client');
const { createCategory } = require('./categories');
const { createUser } = require('./users');
const { createCart, purchaseCart } = require('./carts');
const { createItem } = require('./items');
const { createCartItem } = require('./cartItems');

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
                "purchaseTime" TIMESTAMPTZ
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

const createInitialCarts = async () => {
    try {
        console.log('Creating initial carts...');

        const cartOne = await createCart({ userId: 1 });
        const cartTwo = await createCart({ userId: 2 });
        const cartThree = await createCart({ userId: 3 });
        const cartFour = await createCart({ userId: 4 });

        console.log([cartOne, cartTwo, cartThree, cartFour]);

        console.log('Finsihed creating carts!');
    } catch (err) {
        console.log('Error creating initial carts!');
        console.log(err);
    };
};

const updateInitialCarts = async () => {
    try {
        console.log('Setting some carts to purchased...');

        const updatedCartOne = await purchaseCart(1);
        const updatedCartTwo = await purchaseCart(3);

        console.log([updatedCartOne, updatedCartTwo]);

        console.log('Finished updating carts!');
    } catch (err) {
        console.log('Error updating carts!');
        console.log(err);
    };
};

const createInitialItems = async () => {
    try {
        console.log('Creating initial items...');

        const itemOne = await createItem({
            name: 'Red SoCaTaCa Tee',
            price: '500',
            size: 'S',
            categoryId: 1,
            description: 'Red dyed cotton blend tee-shirt with the SoCaTaCa team logo'
        });

        const itemTwo = await createItem({
            name: 'Red SoCaTaCa Tee',
            price: '500',
            size: 'M',
            categoryId: 3,
            description: 'Red dyed cotton blend tee-shirt with the SoCaTaCa team logo'
        });

        const itemThree = await createItem({
            name: 'Red SoCaTaCa Tee',
            price: '500',
            size: 'L',
            categoryId: 1,
            description: 'Red dyed cotton blend tee-shirt with the SoCaTaCa team logo'
        });

        const itemFour = await createItem({
            name: 'Blue Tank',
            price: '300',
            size: 'M',
            categoryId: 2,
            description: 'Blue dyed cotton blend tank-top'
        });

        const itemFive = await createItem({
            name: 'Rainbow Long-sleeve',
            price: '500',
            size: 'L',
            categoryId: 3,
            description: 'Multicolored cotton blend long-sleeve shirt, perfect for cool weather!'
        });

        console.log([itemOne, itemTwo, itemThree, itemFour, itemFive]);

        console.log('Finished creating items!');
    } catch (err) {
        console.log('Error creating initial items!');
        console.log(err);
    };
};

const createInitialCartItems = async () => {
    try {
        console.log('Creating initial cart_items...');

        const cartItemOne = await createCartItem({
            cartId: 1,
            itemId: 3,
            quantity: 4
        });

        const cartItemTwo = await createCartItem({
            cartId: 1,
            itemId: 4,
            quantity: 2
        });

        const cartItemThree = await createCartItem({
            cartId: 2,
            itemId: 2,
            quantity: 2
        });

        const cartItemFour = await createCartItem({
            cartId: 2,
            itemId: 5,
            quantity: 1
        });

        const cartItemFive = await createCartItem({
            cartId: 3,
            itemId: 4,
            quantity: 18
        });

        const cartItemSix = await createCartItem({
            cartId: 3,
            itemId: 1,
            quantity: 7
        });

        const cartItemSeven = await createCartItem({
            cartId: 4,
            itemId: 5,
            quantity: 3
        });

        const cartItemEight = await createCartItem({
            cartId: 4,
            itemId: 2,
            quantity: 3
        });

        console.log([
            cartItemOne,
            cartItemTwo,
            cartItemThree,
            cartItemFour,
            cartItemFive,
            cartItemSix,
            cartItemSeven,
            cartItemEight
        ]);

        console.log('Finished creating cart_items!');
    } catch (err) {
        console.log('Error creating cart_items!');
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
        await createInitialCarts();
        await updateInitialCarts();
        await createInitialItems();
        await createInitialCartItems();
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