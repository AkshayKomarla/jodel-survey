const surveyRoutes = require("./survey/routes");
const userRoutes = require("./users/routes");

async function routes(fastify) {
  fastify.register(surveyRoutes, { prefix: "/v1/survey" });
  fastify.register(userRoutes, { prefix: "/v1/users" });
}

module.exports = routes;
