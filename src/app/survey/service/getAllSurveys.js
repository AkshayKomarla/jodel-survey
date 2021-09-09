const { getAllSurveys } = require("../repository/repository");

exports.getAllSurveys = async (request) => {
  const { id } = request.params;
  const response = await getAllSurveys(id);
  return { statusCode: 200, response };
};
