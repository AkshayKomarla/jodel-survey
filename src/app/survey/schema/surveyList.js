const schema = {
  tags: ["CreateSurvey"],
  summary: "This api is list all the survey questionnaire",
  description: "This api is list all the survey questionnaire",
  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: {
            type: "string",
            format: "uuid",
          },
          name: {
            type: "string",
          },
          options: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "string", format: "uuid" },
                description: { type: "string" },
              },
            },
          },
        },
      },
    },
  },
};

module.exports = schema;
