const express = require('express');
const app = express();
const cors = require('cors');


app.use(express.json());
app.use(cors())

const AuthRoutes = require('./Routes/AuthRoutes');
app.use('/api/jewelmart', AuthRoutes);

 const ProductRoutes = require('./Routes/ProductRoutes')
 app.use('/api/jewelmart', ProductRoutes);

const Cart_Route = require('./Routes/CartRoutes')
app.use('/api/jewelmart', Cart_Route);


const OrderRoute = require('./Routes/OrderRoutes.js')
app.use('/api/jewelmart', OrderRoute);

const RatingRoute = require('./Routes/RatingRoutes.js')
app.use('/api/jewelmart', RatingRoute);

const WishlistRoute = require('./Routes/WishlistRoutes.js')
app.use('/api/jewelmart', WishlistRoute);


const ReviewRoute = require('./Routes/ReviewRoutes.js')
app.use('/api/jewelmart', ReviewRoute);


const PaymentRoute = require('./Routes/PaymentRoutes.js')
app.use('/api/jewelmart', PaymentRoute);


module.exports = app;   