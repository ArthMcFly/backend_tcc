const {create, defaults, router} = require("json-server");
const path = require("path");

const server = create();
const apiEndpoints = router(
    require(path.join(__dirname, ".." , "data", "db.json"))
);

const middleware = defaults();

server.use(middleware)
server.use(apiEndpoints)

module.exports = { server, apiEndpoints };