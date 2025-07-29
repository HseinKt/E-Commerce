// Setup Express, middlewares 
const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

// Example default route
app.get('/', (_, res) => {
    res.send('Rooted API Running 🍃');
});

module.exports = app;