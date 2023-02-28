const express = require('express');
const app = express();
const port = 3000
const { server: api } = require("./src/api/index");

app.get('/', (req, res) => {
  res.send('Servidor backend')
});

app.use("/api", api );

app.listen(port, () => {
  console.log('listening on *:3000');
});
