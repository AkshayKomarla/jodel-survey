const createSurveySchema = {
  tags: ["Survey"],
  summary: "This api is used to create Survey",
  description: "This api is used to create Survey",
  body: {
    type: "object",
    required: ["name", "options"],
    additionalProperties: false,
    properties: {
      name: {
        type: "string",
        description: "Name of the Survey",
        minLength: 5,
      },
      options: {
        type: "array",
        minItems: 1,
        maxItems: 3,
        items: {
          type: "object",
          required: ["description"],
          properties: {
            description: { type: "string", minLength: 5 },
          },
        },
      },
    },
  },
  response: {
    201: {
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

module.exports = createSurveySchema;
