const { v4: uuidv4 } = require("uuid");

const surveys = [];
const surveyResult = {};

const surveyNameExists = async (name) => surveys.find((s) => s.name === name);

const surveyIdExists = async (id) => surveys.find((s) => s.id === id);

const surveyOptionExists = async (survey, optionId) =>
  survey.options.find((o) => o.id === optionId);

const createSurvey = async ({ name, options }) => {
  const survey = {
    name,
    id: uuidv4(),
    options: options.map((option) => ({
      ...option,
      id: uuidv4(),
    })),
  };

  surveys.push(survey);

  surveyResult[survey.id] = {
    ...survey,
    stats: {
      hits: 0,
      options: {
        ...survey.options.reduce((prev, cur) => {
          prev[cur.id] = {
            ...cur,
            hits: 0,
          };
          return prev;
        }, {}),
      },
      users: [
        {
          id: "",
          option: {
            id: "",
            description: "",
          },
        },
      ],
    },
  };

  return survey;
};

const saveSurveyData = async ({ requestSurveyList }) => {
  for (let index = 0; index < requestSurveyList.length; index++) {
    const rSurvey = requestSurveyList[index];

    surveyResult[rSurvey.question.id].stats.hits++;
    surveyResult[rSurvey.question.id].stats.options[rSurvey.answer.id].hits++;
  }

  return true;
};

const getSurveyResult = async (id) => {
  return surveyResult[id];
};

const getAllSurveys = async () => {
  return surveys;
};

module.exports = {
  surveyIdExists,
  surveyNameExists,
  surveyOptionExists,
  createSurvey,
  saveSurveyData,
  getSurveyResult,
  getAllSurveys,
};
