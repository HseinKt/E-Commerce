// start server, connect to database
require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db.config');

const PORT = process.env.PORT || 8000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});

