//Declaração de variáveis
const {create, defaults, router} = require("json-server");
const path = require("path");

const server = create();
const apiEndpoints = router(
    require(path.join(__dirname, ".." , "data", "db.json"))
);

const middleware = defaults();

//Adição de Middleware
server.use(middleware)
server.use(apiEndpoints)

//Exportação de módulos
module.exports = { server, apiEndpoints };
