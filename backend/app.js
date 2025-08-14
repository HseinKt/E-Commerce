const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);

const productRoutes = require('./routes/product.routes');
app.use('/api', productRoutes);

const categoryRoutes = require('./routes/category.routes');
app.use('/api', categoryRoutes);

const adminRoutes = require('./routes/admin.routes');
app.use('/api', adminRoutes);

app.use('/uploads', express.static('uploads')); // Make the uploads folder public so images can be accessed

// Example default route
app.get('/', (_, res) => {
    res.send('Rooted API Running 🍃');
});

module.exports = app;