const client = require('./client');
const { createCategory } = require('./categories');
const { createUser } = require('./users');
const { createCart, purchaseCart } = require('./carts');
const { createItem } = require('./items');
const { createCartItem } = require('./cartItems');

const createDefaultUsers = async () => {
    try {
        console.log('Creating default users...');

        const defaultUser = await createUser({
            username: 'janedoe',
            password: 'slushies89',
            isAdmin: false
        });

        const adminUser = await createUser({
            username: 'adminuser',
            password: 'apples45',
            isAdmin: true
        });

        console.log([defaultUser, adminUser])
        console.log('Finished creating users!');
    } catch (err) {
        console.log('Error creating users!');
        console.log(err);
    };
};

const createDefaultCategories = async () => {
    try {
        console.log('Creating initial categoreis...');

        const categoryOne = await createCategory('Tee-Shirt');
        const categoryTwo = await createCategory('Tank-Top');
        const categoryThree = await createCategory('Long-Sleeve');

        console.log([categoryOne, categoryTwo, categoryThree]);

        console.log('Finsihed creating categories!');
    } catch (err) {
        console.log('Error creating initial categories!');
        console.log(err);
    };
};

const createDefaultItems = async () => {
    try {
        console.log('Creating initial items...');

        const smallRedTee = await createItem({
            name: 'Red SoCaTaCa Tee',
            price: '35',
            size: 'S',
            categoryId: 1,
            description: 'Red dyed cotton blend tee-shirt with the SoCaTaCa team logo',
            imageURL: './images/red_socataca_tee.png'
        });

        const medRedTee = await createItem({
            name: 'Red SoCaTaCa Tee',
            price: '35',
            size: 'M',
            categoryId: 1,
            description: 'Red dyed cotton blend tee-shirt with the SoCaTaCa team logo',
            imageURL: './images/red_socataca_tee.png'
        });

        const largeRedTee = await createItem({
            name: 'Red SoCaTaCa Tee',
            price: '35',
            size: 'L',
            categoryId: 1,
            description: 'Red dyed cotton blend tee-shirt with the SoCaTaCa team logo',
            imageURL: './images/red_socataca_tee.png'
        });

        const smallBlueTee = await createItem({
            name: 'Blue SoCaTaCa Tee',
            price: '35',
            size: 'S',
            categoryId: 1,
            description: 'Red dyed cotton blend tee-shirt with the SoCaTaCa team logo',
            imageURL: './images/blue_socataca_tee.png'
        });

        const medBlueTee = await createItem({
            name: 'Blue SoCaTaCa Tee',
            price: '35',
            size: 'M',
            categoryId: 1,
            description: 'Red dyed cotton blend tee-shirt with the SoCaTaCa team logo',
            imageURL: './images/blue_socataca_tee.png'
        });

        const largeBlueTee = await createItem({
            name: 'Blue SoCaTaCa Tee',
            price: '35',
            size: 'L',
            categoryId: 1,
            description: 'Red dyed cotton blend tee-shirt with the SoCaTaCa team logo',
            imageURL: './images/blue_socataca_tee.png'
        });

        const smallTank = await createItem({
            name: 'Blue Tank Top',
            price: '30',
            size: 'S',
            categoryId: 2,
            description: 'Blue dyed cotton blend tank-top',
            imageURL: './images/default_shirt.png'
        });

        const medTank = await createItem({
            name: 'Blue Tank Top',
            price: '30',
            size: 'M',
            categoryId: 2,
            description: 'Blue dyed cotton blend tank-top',
            imageURL: './images/default_shirt.png'
        });

        const medLongSleeve = await createItem({
            name: 'Rainbow Long-sleeve',
            price: '45',
            size: 'M',
            categoryId: 3,
            description: 'Multicolored cotton blend long-sleeve shirt, perfect for cool weather!',
            imageURL: './images/default_shirt.png'
        });

        const largeLongSleeve = await createItem({
            name: 'Rainbow Long-sleeve',
            price: '45',
            size: 'L',
            categoryId: 3,
            description: 'Multicolored cotton blend long-sleeve shirt, perfect for cool weather!',
            imageURL: './images/default_shirt.png'
        });

        console.log([smallRedTee, medRedTee, largeRedTee, smallBlueTee, medBlueTee, largeBlueTee, smallTank, medTank, medLongSleeve, largeLongSleeve]);

        console.log('Finished creating items!');
    } catch (err) {
        console.log('Error creating initial items!');
        console.log(err);
    };
};

const seedDBProd = async () => {
    try {
        console.log('Initializing databse...');
        await createDefaultUsers();
        await createDefaultCategories();
        await createDefaultItems();
        console.log('Finished initializing database!');
    } catch (error) {
        console.log('Error initializing databse!');
        console.error(error);
    };
}

module.exports = {
    seedDBProd
}
