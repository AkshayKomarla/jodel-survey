const {
  surveyIdExists,
  surveyOptionExists,
  saveSurveyData,
} = require("../repository/repository");
const { ERROR_CODES } = require("../../../commons/constants");

exports.takeSurvey = async (request) => {
  const requestSurveyList = request.body;

  for (let index = 0; index < requestSurveyList.length; index++) {
    const requestSurvey = requestSurveyList[index];

    const survey = await surveyIdExists(requestSurvey.question.id);
    if (survey && Object.keys(survey).length > 0) {
      const option = await surveyOptionExists(survey, requestSurvey.answer.id);

      if (!option) {
        return {
          statusCode: 400,
          response: {
            code: ERROR_CODES.NOT_FOUND,
            message: `Survey answer Id: "${requestSurvey.answer.id}" for survey name "${requestSurvey.question.name}" doesn't exist`,
          },
        };
      }
    } else {
      return {
        statusCode: 400,
        response: {
          code: ERROR_CODES.NOT_FOUND,
          message: `Survey Id: "${requestSurvey.question.id}" doesn't exist`,
        },
      };
    }
  }

  await saveSurveyData({ requestSurveyList });
  return { statusCode: 201, response: { success: true } };
};
