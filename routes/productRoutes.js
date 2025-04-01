const express = require('express');
const productSchema = require('../models/product');
const app = express();

app.get('/products', async (req, res) => {
    const products = await productSchema.find();
    try{
        res.send(products);
    } catch (error) {
        res.status(500).send({error: error.message});
    }
});

app.get('/products/search', async (req, res) => {
    const search = req.query.title; 
 
    // Ensure a valid search term was provided
    if (!search) {
        return res.status(400).send({ error: 'Search term is required' });
    }

    // Create a regular expression that is case-insensitive and allows partial matches
    const regex = new RegExp(search, 'i'); 

    try {
        // Search the products collection where the title matches the regex
        const products = await productSchema.find({ title: regex  });
        const productDescription = await productSchema.find({ description: regex });

        // Send the results back to the client
        if (products.length > 0 ) {
            return res.send(products);
        } if (productDescription.length > 0) {
            return res.send(productDescription);
        } else {
           return res.status(404).send({ message: 'No products found matching the search criteria' });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});


module.exports = app;