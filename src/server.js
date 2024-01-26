// server.js
const express    = require('express');
const bodyParser = require('body-parser');
const dotenv     = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.server_port || 3000;

app.use(bodyParser.json());

module.exports = { app, port };
