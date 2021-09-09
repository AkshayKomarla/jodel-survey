const schema = {
  tags: ["Survey"],
  summary: "This api returns survey result",
  description: "This api returns result of a single survey.",
  params: {
    type: "object",
    properties: {
      id: { type: "string", format: "uuid" },
    },
  },
  response: {
    200: {
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
        stats: {
          type: "object",
          properties: {
            hits: {
              type: "integer",
            },
            options: {
              type: "object",
              patternProperties: {
                "^.*$": {
                  type: "object",
                  properties: {
                    id: { type: "string", format: "uuid" },
                    description: { type: "string" },
                    hits: {
                      type: "integer",
                    },
                  },
                },
              },
            },
            users: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "string", format: "uuid" },
                  option: {
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
      },
    },
  },
};

module.exports = schema;
