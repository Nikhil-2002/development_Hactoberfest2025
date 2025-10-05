require('dotenv').config();
const express = require('express');
const bodyParser = require('express').json;
const { sequelize } = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser());

// routes
const authRoutes = require('./routes/auth.js');
app.use('/api/auth', authRoutes);

// health
app.get('/', (req, res) => res.json({ status: 'ok' }));

// start after DB connection
async function start() {
  try {
    await sequelize.authenticate();
    console.log('DB connected ✅');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Unable to connect to DB:', err);
    process.exit(1);
  }
}

start();
