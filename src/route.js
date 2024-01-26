// routes.js
const { app }                                      = require('./server');
const { pgClient }                                 = require('./db');
const { apiKeyMiddleware, errorHandlerMiddleware } = require('./middleware');

app.use(apiKeyMiddleware);

app.post('/save-log', async (req, res, next) => {
  try {
    const { origin, status, sesSendResult, emailBody, event } = req.body;

    if (!origin || !status || !sesSendResult || !emailBody || !event) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    await pgClient.query(
      `
      INSERT INTO asqsserviceslogs (
            origin, 
            status, 
            response, 
            request_body, 
            created_at, 
            updated_at, 
            event
        )
      VALUES (
            $1,
            $2,
            $3,
            $4,
            current_timestamp,
            current_timestamp,
            $5
        )
    `,
      [origin, status, sesSendResult, emailBody, event]
    );

    return res.json({ message: 'Log Saved Successfully!' });
  } catch (error) {
    next(error);
  }
});

app.use(errorHandlerMiddleware);
