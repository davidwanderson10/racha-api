const express = require('express');
const sequelize = require('./config/database');
const apiRoutes = require('./routes/apiRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use('/api', apiRoutes);

const PORT = process.env.PORT || 10000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully');
    
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

startServer();
