const express = require('express');
const cors = require ('cors');
const app = express();
const port = 8080;
const { server: api } = require("./src/api/index");
const { routes } = require("./src/routes/index");

app.use(cors());
app.use(express.json());
app.use(routes);
app.use("/api", api );

app.listen(port, () => {
	console.clear();
	console.log(`listening on port: ${port}`)
});
