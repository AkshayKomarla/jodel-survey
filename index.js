const pino = require("pino");
const swagger = require("fastify-swagger");
const fastifyCors = require("fastify-cors");
const fastifyRoutes = require("fastify-routes");
const fastifyHelmet = require("fastify-helmet");
const routes = require("./src/app/routes");
const { config, swaggerSchema } = require("./src/commons/config");
const { makeAttachLoggerWithRequestContext } = require("./src/lib/appLogging");
const {
  requestSerializer,
  responseSerializer,
} = require("./src/lib/logSerializer");

const logger = pino({
  level: config.LOG_LEVEL || "info",
  messageKey: "message",
  levelKey: "severity",
  useLevelLabels: true,
  serializers: {
    req: requestSerializer,
    res: responseSerializer,
  },
  prettyPrint: process.env.NODE_ENV === "dev",
});

function getSecurityOptions() {
  // Bypass CSP violations in Swagger UI
  // https://github.com/swagger-api/swagger-ui/issues/3370
  const defaultSrc =
    config.ENVIRONMENT === "dev" ? "'self' 'unsafe-inline'" : "'self'";
  return {
    noCache: true,
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [defaultSrc],
      },
    },
    referrerPolicy: {
      policy: "same-origin",
    },
  };
}

function create() {
  // eslint-disable-next-line global-require
  const fastify = require("fastify")({
    logger,
  });

  fastify.register(swagger, swaggerSchema);
  fastify.register(fastifyCors, { origin: true, credentials: true });
  fastify.register(fastifyRoutes);
  fastify.register(fastifyHelmet, getSecurityOptions());

  // Routes
  fastify.register(routes);

  fastify.addHook("onRequest", makeAttachLoggerWithRequestContext(logger));

  return fastify;
}

async function start() {
  const fastify = create();

  try {
    await fastify.listen(config.PORT, config.HOST);
  } catch (error) {
    fastify.log.error(error, "Error starting service");
    process.exit(1);
  }
}

if (process.env.NODE_ENV !== "test") {
  start();
}
