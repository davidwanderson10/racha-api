const express = require('express');
const sequelize = require('./config/database');
const playerRoutes = require('./routes/playerRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use('/api', playerRoutes);

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully');
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

startServer();