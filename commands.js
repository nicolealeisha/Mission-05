#!/usr/bin/env node
const { Command } = require('commander');
const { addProduct, findProduct, updateProduct, removeProduct, listProducts } = require('./index');
const { input } = require('@inquirer/prompts');  


// Product detail questions in an object for easy reuse
const productQuestions = {
    title: 'Enter the product title:',
    description: 'Enter the product description:',
    start_price: 'Enter the starting price:',
    reserve_price: 'Enter the reserve price:'
};

const program = new Command();

program
    .version('1.0.0')
    .description('Trademe Product Management System');

// Add command to add a new product
program
    .command('add')
    .alias('a')
    .description('Add a new product')
    .action(async () => {
        try {
            // Ask for product details using the questions object
            const title = await input({message: productQuestions.title});
            const description = await input({message: productQuestions.description});
            const start_price = await input({message: productQuestions.start_price});
            const reserve_price = await input({message: productQuestions.reserve_price});

            // Ensure we parse the numeric inputs as floats
            const product = {
                title,
                description,
                start_price: parseFloat(start_price),
                reserve_price: parseFloat(reserve_price)
            };

            // Pass the collected answers to the addProduct function
            await addProduct(product);
        } catch (error) {
            console.error('Error during input:', error);
        }
    });

// Command to find a product by title
program
    .command('find <title>')
    .alias('f')
    .description('Find a product')
    .action(async (title) => {
        try {
            await findProduct(title);
        } catch (error) {
            console.error('Error finding product:', error);
        }
    });

// Command to update a product by ID
program
    .command('update <_id>')
    .alias('u')
    .description('Update a product')
    .action(async (_id) => {
        try {
            // Ask for product details using the questions object
            const title = await input({message: productQuestions.title});
            const description = await input({message: productQuestions.description});
            const start_price = await input({message: productQuestions.start_price});
            const reserve_price = await input({message: productQuestions.reserve_price});

            // Ensure we parse the numeric inputs as floats
            const product = {
                title,
                description,
                start_price: parseFloat(start_price),
                reserve_price: parseFloat(reserve_price)
            };

            // Pass the collected answers to the updateProduct function
            await updateProduct(_id, product);
        } catch (error) {
            console.error('Error during update:', error);
        }
    });

// Command to remove a product by ID
program
    .command('remove <_id>')
    .alias('r')
    .description('Remove a product')
    .action(async (_id) => {
        try {
            await removeProduct(_id);
        } catch (error) {
            console.error('Error removing product:', error);
        }
    });

// Command to list all products
program
    .command('list')
    .alias('l')
    .description('List all products')
    .action(async () => {
        try {
            await listProducts();
        } catch (error) {
            console.error('Error listing products:', error);
        }
    });


program.parse(process.argv);
