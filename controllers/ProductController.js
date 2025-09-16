const express = require('express');

module.exports = function(connectDB){

    const app = express.Router();

    //create CRUD routes for products


    //CREATE endpoint
    app.post('/products', (req, res ) => {

        const { ProductName, VendorID, CategoryID, UnitPrice, QuantityInStock } = req.body;

        connectDB.query('insert into Product (ProductName, VendorID, CategoryID, UnitPrice, QuantityInStock) VALUES (?, ?, ?, ?, ?)',
        [ProductName, VendorID, CategoryID, UnitPrice, QuantityInStock],
        (err, result) => {

            if(err){

                console.error('Error inserting product:', err);
                res.status(500).json({ error: 'Error inserting product' });
                return;
            }
            else{
                res.status(201).json({ message: 'Product created successfully'
                    , productId: result.insertId });
            }

        });

    });

    //READ endpoint - get all products
    app.get('/products', (req, res) => {

        connectDB.query('SELECT * FROM Product', (err, results) => {                        
            if(err){
                console.error('Error fetching products:', err);
                res.status(500).json({ error: 'Error fetching products' });
                return;
            }       
            res.status(200).json(results);
        });
    });

    //UPDATE endpoint
    app.put('/products/:id', (req, res) => {

        const productId = req.params.id;

        const { ProductName, VendorID, CategoryID, UnitPrice, QuantityInStock } = req.body;
        connectDB.query('UPDATE Product SET ProductName = ?, VendorID = ?, CategoryID = ?, UnitPrice = ?, QuantityInStock = ? WHERE ProductID = ?',
        [ProductName, VendorID, CategoryID, UnitPrice, QuantityInStock, productId],
        (err, result) => {
            if(err){
                console.error('Error updating product:', err);
                res.status(500).json({ error: 'Error updating product' });
                return;
            }               
        }
        );
        res.status(200).json({ message: 'Product updated successfully' });
    });

    //DELETE endpoint
    app.delete('/products/:id', (req, res) => {

        const productId = req.params.id;
                    
        connectDB.query('DELETE FROM Product WHERE ProductID = ?', [productId], (err, result) => {
            if(err){
                console.error('Error deleting product:', err);      
                res.status(500).json({ error: 'Error deleting product' });
                return;
            }


            res.status(200).json({ message: 'Product deleted successfully' });
        });
    });

    return app;
}