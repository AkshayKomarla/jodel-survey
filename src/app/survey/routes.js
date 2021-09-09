const getSurveyResultSchema = require("./schema/getSurveyResultsSchema");
const createSurveySchema = require("./schema/createSurveySchema");
const takeSurveySchema = require("./schema/takeSurveySchema");
const getSurveyListSchema = require("./schema/surveyList");

const {
  createSurveyHandler,
  takeSurveyHandler,
  getSurveyResult,
  getSurveyList,
} = require("./handlers/handlers");

async function routes(fastify) {
  fastify.post(
    "/",
    {
      // preHandler: [validateSessionToken]
      schema: createSurveySchema,
    },
    createSurveyHandler
  );

  fastify.get(
    "/list",
    {
      schema: getSurveyListSchema,
    },
    getSurveyList
  );

  fastify.post(
    "/take-survey",
    {
      schema: takeSurveySchema,
    },
    takeSurveyHandler
  );

  fastify.get(
    "/:id/result",
    {
      schema: getSurveyResultSchema,
    },
    getSurveyResult
  );
}

module.exports = routes;
