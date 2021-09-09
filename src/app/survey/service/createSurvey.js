const { surveyNameExists, createSurvey } = require("../repository/repository");
const { ERROR_CODES } = require("../../../commons/constants");

exports.createSurvey = async (request) => {
  const { name, options } = request.body;
  const survey = await surveyNameExists(name);
  if (survey && Object.keys(survey).length) {
    return {
      statusCode: 400,
      response: {
        code: ERROR_CODES.DUPLICATE_ENTRY,
        message: `Name: "${name}" already exist, Use different survey name`,
      },
    };
  }

  // request.log.error("asdsa");

  const response = await createSurvey({ name, options });
  return { statusCode: 201, response };
};
