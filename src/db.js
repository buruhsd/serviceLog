// db.js
const { Client } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pgClient = new Client({
  host    : process.env.DB_HOST,
  port    : process.env.DB_PORT,
  user    : process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

pgClient.connect()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((err) => {
    console.error('Error connecting to the database', err);
    process.exit(1);
  });

module.exports = { pgClient };
