const express = require('express');
const app = express();
const mySql = require('mysql');
const bodyParser = require('body-parser');

//configure environment variables (env file for database connection)
require('dotenv').config();

//middleware to parse JSON request bodies
const productController = require('./controllers/ProductController');
app.use(bodyParser.json());

//create connection to database
const connectDB = mySql.createConnection({

  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306

})

//connect to database
connectDB.connect((err) => {
  if(err){
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});


//middleware to parse JSON request bodies
const productRoutes = productController(connectDB);
app.use('/api', productRoutes);


const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

