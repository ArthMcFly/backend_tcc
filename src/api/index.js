//Declaração de variáveis
const {create, defaults, router} = require("json-server");
const path = require("path");

const server = create();
const apiEndpoints = router(path.join(__dirname, "..", "data", "db.json"), {
  foreignKeySuffix: "_id"
});

const middlewares = defaults();

//Adição de Middleware
server.use(middlewares)
server.use(apiEndpoints)

//Exportação de módulos
module.exports = { server, apiEndpoints };
