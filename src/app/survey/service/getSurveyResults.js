const { getSurveyResult } = require("../repository/repository");
const { ERROR_CODES } = require("../../../commons/constants");

exports.getSurveyResult = async (request) => {
  const { id } = request.params;
  const response = await getSurveyResult(id);
  if (!response) {
    return {
      statusCode: 404,
      response: {
        code: ERROR_CODES.NOT_FOUND,
        message: `No results found for survey id: "${id}"`,
      },
    };
  }
  return { statusCode: 200, response };
};
