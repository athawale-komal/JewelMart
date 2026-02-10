const express = require('express');
const app = express();
const cors = require('cors');


app.use(express.json());
app.use(cors())

const AuthRoutes = require('./Routes/AuthRoutes');
app.use('/api/auth', AuthRoutes);

const UserRoutes = require('./Routes/UserRoutes');
app.use('/api/users', UserRoutes);

 // Product Routes Api
 const ProductRoutes = require('./Routes/ProductRoutes')
 app.use('/api/product', ProductRoutes);

// Product Routing 
const Product = require ('./Routes/ProductRoutes.js')
app.use('/api/products', Product);

// Cart Routes Api
const Cart_Route = require('./Routes/CartRoutes')
app.use('/api/cart', Cart_Route);

// // Orders Routing 
const OrderRoute = require('./Routes/OrderRoutes.js')
app.use('/api/order', OrderRoute);


module.exports = app;   