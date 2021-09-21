const { getSurveyResult } = require("../service/getSurveyResults");
const { createSurvey } = require("../service/createSurvey");
const { takeSurvey } = require("../service/takeSurvey");
const { getAllSurveys } = require("../service/getAllSurveys");

exports.createSurveyHandler = async (request, reply) => {
  const { statusCode, response } = await createSurvey(request);
  return reply.code(statusCode).send(response);
};

exports.takeSurveyHandler = async (request, reply) => {
  // perform additional validations
  const { statusCode, response } = await takeSurvey(request);
  return reply.code(statusCode).send(response);
};

exports.getSurveyResult = async (request, reply) => {
  const { statusCode, response } = await getSurveyResult(request);
  return reply.code(statusCode).send(response);
};

exports.getSurveyList = async (request, reply) => {
  const { statusCode, response } = await getAllSurveys(request);
  return reply.code(statusCode).send(response);
};
