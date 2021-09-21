const takeSurveySchema = {
  tags: ["Survey"],
  summary: "This api is used to take survey",
  description: "This api is used to take survey",
  body: {
    type: "array",
    items: {
      type: "object",
      required: ["questionId", "answerId"],
      properties: {
        questionId: {
          type: "string",
          format: "uuid",
        },
        answerId: {
          type: "string",
          format: "uuid",
        },
      },
    },
  },
  response: {
    201: {
      type: "object",
      properties: {
        success: {
          type: "boolean",
        },
      },
    },
    400: {
      type: "object",
      properties: {
        code: {
          type: "string",
        },
        message: {
          type: "string",
        },
      },
    },
  },
};

module.exports = takeSurveySchema;
