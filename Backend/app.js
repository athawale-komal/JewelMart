const express = require('express');
const app = express();
const cors = require('cors');


app.use(express.json());
app.use(cors())

const AuthRoutes = require('./Routes/AuthRoutes');
app.use('/api/jwellmart', AuthRoutes);

 // Product Routes Api
 const ProductRoutes = require('./Routes/ProductRoutes')
 app.use('/api/jwellmart', ProductRoutes);

// Cart Routes Api
const Cart_Route = require('./Routes/CartRoutes')
app.use('/api/jwellmart', Cart_Route);

// Orders Routing 
const OrderRoute = require('./Routes/OrderRoutes.js')
app.use('/api/jwellmart', OrderRoute);

const PaymentRoute = require('./Routes/paymentRoutes.js')
app.use('/api/jwellmart', PaymentRoute);


module.exports = app;   