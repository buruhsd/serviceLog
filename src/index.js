// index.js
const { app, port } = require('./server');

require('./middleware');
require('./route');
require('./db');

process.on('SIGINT', async () => {
  process.exit(0);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
