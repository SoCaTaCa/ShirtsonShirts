const client = require("./db/client");
const PORT = process.env["PORT"] ?? 3000;
const app = require('./app');

app.listen(PORT, () => {
  client.connect();
  console.log(`server listenting on PORT ${PORT}`);
});