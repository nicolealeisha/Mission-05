const mongoose = require('mongoose');
const express = require('express');
const productRoutes = require('./routes/productRoutes');

const app = express();
app.use(express.json()); 

// Map global promise - get rid of warning
mongoose.Promise = global.Promise;

// Connect to the database using ipv4 address specifically
// explicitly set the server selection timeout to 30 seconds to avoid the error "Server selection timed out after 30000 ms"
mongoose.connect('mongodb://127.0.0.1:27017/mission-05', {
    serverSelectionTimeoutMS: 30000,
    // newUrlParser: true,
    // useUnifiedTopology: true,
    // useFindAndModify: false
})
    // .then(() => {
    //     console.log("Connected to MongoDB successfully!");
    // })
    .catch(err => {
        console.error("Error connecting to MongoDB:", err);
    });

// Import model
const Product = require('./models/product');

// Add product
const addProduct = (productData) => {
    Product.create(productData)
        .then(product => {
            console.info('New Product Added:', product);
            mongoose.connection.close();  // Close the database connection after the operation
        })
        .catch(err => {
            console.error('Error adding product:', err);
            mongoose.connection.close();  // Close the database connection on error as well
        });
}

// Find product
const findProduct = (title) => {
    // Make case insensitive
    const search = new RegExp(title, 'i');
    Product.find({ title: search })
        .then(products => {
            console.info(products);
            console.info(`${products.length} matches`);
            mongoose.connection.close();  // Close the database connection after the operation
        })
        .catch(err => {
            console.error('Error finding product:', err);
            mongoose.connection.close();  // Close the database connection on error as well
        });
}

//update product
const updateProduct = (_id, title) => {
    Product.updateOne({_id}, title)
    .then(title => {
        console.info('Product Updated:', title);
        mongoose.connection.close();  // Close the database connection after the operation
    })
    .catch(err => {
        console.error('Error updating product:', err);
        mongoose.connection.close();  // Close the database connection on error as well
    });
}

// Delete product
const removeProduct = (_id) => {
    Product.deleteOne({_id})
        .then(() => {
            console.info('Product Deleted');
            mongoose.connection.close();  // Close the database connection after the operation
        })
        .catch(err => {
            console.error('Error deleting product:', err);
            mongoose.connection.close();  // Close the database connection on error as well
        });
}

// List all products
const listProducts = () => {
    Product.find()
        .then(products => {
            console.info(products);
            console.info(`${products.length} products found`);
            mongoose.connection.close();  // Close the database connection after the operation
        })
        .catch(err => {
            console.error('Error listing products:', err);
            mongoose.connection.close();  // Close the database connection on error as well
        });
}


// Export all methods
module.exports = {
    addProduct,
    findProduct,
    updateProduct,
    removeProduct,
    listProducts
}

// Set up routes
app.use(productRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});