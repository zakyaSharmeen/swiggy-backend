    const express = require('express');
    const app = express();
    const port = 4000;
    const dotEnv = require('dotenv');
    const mongoose = require('mongoose');
    const vendorRoutes = require('./routes/vendorRoutes');
    const firmRoutes = require('./routes/firmRoutes');
    const productRoutes = require('./routes/productRoutes');
    const path = require('path');

    dotEnv.config()
    mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('Database connected');
    })
    .catch((err) => log.error(err));



    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use('/vendor', vendorRoutes);
    app.use('/firm', firmRoutes);
    app.use('/product', productRoutes);
    app.use('/uploads', express.static("uploads"));




    app.get('/home', (req, res) => {
        res.send('Hello World!');
    });

    app.listen(port, () => {        
        console.log(`Server is running on port ${port}`);
    });