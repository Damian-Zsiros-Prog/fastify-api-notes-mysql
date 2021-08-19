const path = require("path");
const AutoLoad = require("fastify-autoload");
const fastifyStatic = require("fastify-static");
const fastifyExpress = require("fastify-express");
const cors = require("cors");

module.exports = async function (fastify, opts) {
    await fastify.register(fastifyExpress);
    fastify.use(cors());
    fastify.register(fastifyStatic, {
        root: path.join(__dirname, "html/myapp"),
        prefix: "/myapp",
    });
    fastify.register(AutoLoad, {
        dir: path.join(__dirname, "plugins"),
        options: Object.assign({}, opts),
    });

    fastify.register(AutoLoad, {
        dir: path.join(__dirname, "routes"),
        options: Object.assign({}, opts),
    });
};
