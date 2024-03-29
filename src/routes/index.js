//Validação de variáveis
const { Router } = require("express");
var http = require("http");
const { storage, uploadFolder } = require("../config/upload");
const multer = require("multer");
const Users = require("../controllers/usuarios/index");
const Subjects = require("../controllers/materias/index");
const Posts = require("../controllers/postagens/index");
const routes = new Router();
const upload = multer({ storage });

//Rota raiz
routes.get('/', (req, res) => {
	res.send('Servidor backend')
});

//Rota da api
routes.put("/api/*", (req, res) => {
	return res.status(400).end();
});

//Rota do banco
routes.get("/api/db", (req, res) => {
	return res.status(404).end(http.STATUS_CODES[404]);
});

//Rota da entidade de usuários
routes.post("/api/usuarios", Users.store);
routes.patch("/api/usuarios/:id", Users.update);
routes.post("/auth", Users.auth);
routes.post("/signup", Users.signup);
routes.get("/activate/:chave", Users.activate);
routes.patch("/api/avatar/:id", upload.single("avatar"), Users.uploadPhoto);

//Rota da entidade de materias 
routes.post("/api/materias", Subjects.store);
routes.patch("/api/materias/:id", Subjects.update);

//Rota da entidade de postagens 
routes.post("/api/postagens", Posts.store);
routes.patch("/api/postagens/:id", Posts.update);




//Exportação de módulos
module.exports = { routes };
