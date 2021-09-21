const {
  surveyIdExists,
  surveyOptionExists,
  saveSurveyData,
} = require("../repository/repository");
const { ERROR_CODES } = require("../../../commons/constants");

exports.takeSurvey = async (request) => {
  const requestSurveyList = request.body;

  try {
    await Promise.all(
      requestSurveyList.map(async (r) => {
        const survey = await surveyIdExists(r.questionId);
        if (survey && Object.keys(survey).length > 0) {
          const option = await surveyOptionExists(survey, r.answerId);

          if (!option) {
            throw new Error(
              `Survey answer id: "${r.answerId}" for survey id "${r.questionId}" doesn't exist`
            );
          }
        } else {
          throw new Error(`Survey id: "${r.questionId}" doesn't exist`);
        }
      })
    );

    await Promise.all(
      requestSurveyList.map(async (r) =>
        saveSurveyData({ questionId: r.questionId, answerId: r.answerId })
      )
    );
  } catch (error) {
    return {
      statusCode: 400,
      response: {
        code: ERROR_CODES.NOT_FOUND,
        message: error,
      },
    };
  }

  return { statusCode: 201, response: { success: true } };
};
