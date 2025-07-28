const express = require('express');
const connectDB = require('./db/connection');
const productRoutes = require('./routes/productRoutes');
const userRoute = require('./routes/userRoute');
//for the token
require('dotenv').config();

connectDB();

const app = express();
app.use(express.json());
app.use('/api/products', productRoutes);
app.use('/api/users', userRoute);
app.use('/api/order', userRoute);



app.listen(4000, () => {
  console.log('Server running on port 4000' );
});

module.exports = app;
