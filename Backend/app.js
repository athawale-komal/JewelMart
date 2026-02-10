const express = require('express');
const app = express();
const cors = require('cors');


app.use(express.json());
app.use(cors())

const AuthRoutes = require('./Routes/AuthRoutes');
app.use('/api/jwellmart', AuthRoutes);

 const ProductRoutes = require('./Routes/ProductRoutes')
 app.use('/api/jwellmart', ProductRoutes);

const Cart_Route = require('./Routes/CartRoutes')
app.use('/api/jwellmart', Cart_Route);


const OrderRoute = require('./Routes/OrderRoutes.js')
app.use('/api/jwellmart', OrderRoute);

const RatingRoute = require('./Routes/RatingRoutes.js')
app.use('/api/jwellmart', RatingRoute);

const WishlistRoute = require('./Routes/WishlistRoutes.js')
app.use('/api/jwellmart', WishlistRoute);


const ReviewRoute = require('./Routes/ReviewRoutes.js')
app.use('/api/jwellmart', ReviewRoute);


const PaymentRoute = require('./Routes/PaymentRoutes.js')
app.use('/api/jwellmart', PaymentRoute);


module.exports = app;   