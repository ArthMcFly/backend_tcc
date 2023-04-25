const { Router } = require("express");
var http = require("http");
const Users = require("../controllers/usuarios/index");
const Subjects = require("../controllers/materias/index");
const Posts = require("../controllers/postagens/index");
const routes = new Router();


routes.get('/', (req, res) => {
  res.send('Servidor backend')
});


routes.put("/api/*", (req, res) => {
	return res.status(400).end();
});

routes.get("/api/db", (req, res) => {
	return res.status(404).end(http.STATUS_CODES[404]);
});

routes.post("/api/usuarios", Users.store);
routes.patch("/api/usuarios/:id", Users.update);

routes.post("/api/materias", Subjects.store);
routes.patch("/api/materias/:id", Subjects.update);

routes.post("/api/postagens", Posts.store);
routes.patch("/api/postagens/:id", Posts.update);



module.exports = { routes };
