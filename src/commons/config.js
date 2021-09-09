const envSchema = require("env-schema");

const swaggerSchema = {
  routePrefix: "/documentation",
  swagger: {
    info: {
      title: "Jodel's Survey API Documentation",
      description: "API docs for taking survey",
      version: "0.1.0",
    },
    externalDocs: {
      url: "https://swagger.io",
      description: "Find more info here",
    },
    host: "localhost:4444",
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
    tags: [{ name: "Survey", description: "Survey related end-points" }],
  },
  definitions: {
    User: {
      type: "object",
      required: ["id", "email"],
      properties: {
        id: { type: "string", format: "uuid" },
        firstName: { type: "string" },
        lastName: { type: "string" },
        email: { type: "string", format: "email" },
      },
    },
  },
  securityDefinitions: {
    apiKey: {
      type: "apiKey",
      name: "apiKey",
      in: "header",
    },
  },
  uiConfig: {
    docExpansion: "full",
    deepLinking: false,
  },
  exposeRoute: true,
};

const appSchema = {
  type: "object",
  properties: {
    NODE_ENV: {
      type: "string",
      default: "dev",
    },
    HOST: {
      type: "string",
      default: "127.0.0.1",
    },
    PORT: {
      type: "integer",
      default: 4444,
    },
    LOG_LEVEL: {
      type: "string",
      default: "info",
    },
  },
};

const config = envSchema({ schema: appSchema, dotenv: true });

module.exports = { config, swaggerSchema };
