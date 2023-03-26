const express = require('express');
const cors = require ('cors');
const app = express();
const port = 8080;
const { server: api } = require("./src/api/index");

app.get('/', (req, res) => {
  res.send('Servidor backend')
});

app.use("/api", api );
app.use(cors());
app.use(express.json());

app.listen(port, () => {
	console.clear();
	console.log('listening on port:8080');
});
