const takeSurveySchema = {
  tags: ["Survey"],
  summary: "This api is used to take survey",
  description: "This api is used to take survey",
  body: {
    type: "array",
    items: {
      type: "object",
      required: ["question", "answer"],
      properties: {
        question: {
          type: "object",
          required: ["id", "name"],
          properties: {
            id: {
              type: "string",
              format: "uuid",
            },
            name: {
              type: "string",
            },
          },
        },
        answer: {
          type: "object",
          required: ["id", "name"],
          properties: {
            id: {
              type: "string",
              format: "uuid",
            },
            name: {
              type: "string",
            },
          },
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
