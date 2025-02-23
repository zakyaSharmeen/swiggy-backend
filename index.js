    const express = require('express');
    const app = express();
    const dotEnv = require('dotenv');
    const mongoose = require('mongoose');
    const vendorRoutes = require('./routes/vendorRoutes');
    const firmRoutes = require('./routes/firmRoutes');
    const productRoutes = require('./routes/productRoutes');
    const path = require('path');
    const cors = require('cors');
    
    const PORT = process.env.PORT || 4000;


    dotEnv.config()
    mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('Database connected');
    })
    .catch((err) => log.error(err));



    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());



    app.use('/vendor', vendorRoutes);
    app.use('/firm', firmRoutes);
    app.use('/product', productRoutes);
    app.use('/uploads', express.static("uploads"));




    app.get('/', (req, res) => {
        res.send('Hello to the swizzy backend!');
    });

    app.listen(PORT, () => {        
        console.log(`Server is running on PORT ${PORT}`);
    });