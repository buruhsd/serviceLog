// middleware.js
const { app } = require('./server');

const apiKey = 'vamfMTv6qshyTZrXqRVQdqxQ1';

const apiKeyMiddleware = (req, res, next) => {
  const providedKey = req.headers['x-api-key'];

  if (!providedKey || providedKey !== apiKey) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  next();
};

const errorHandlerMiddleware = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
};

app.use(apiKeyMiddleware);

module.exports = { apiKeyMiddleware, errorHandlerMiddleware };
