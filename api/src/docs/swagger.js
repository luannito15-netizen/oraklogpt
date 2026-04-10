const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ORAKLO API",
      version: "1.0.0",
      description: "RESTful API — Node.js + Express + MongoDB",
      contact: { name: "ORAKLO Team" },
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3001}/api/v1`,
        description: "Local development",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        CreateUserInput: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            name: { type: "string", example: "João Silva", minLength: 2, maxLength: 100 },
            email: { type: "string", format: "email", example: "joao@email.com" },
            password: {
              type: "string",
              example: "Senha@123",
              description: "Min 8 chars, must include uppercase and number",
            },
          },
        },
        UpdateUserInput: {
          type: "object",
          minProperties: 1,
          properties: {
            name: { type: "string", example: "João Atualizado" },
            email: { type: "string", format: "email", example: "novo@email.com" },
            password: { type: "string", example: "NovaSenh@456" },
          },
        },
        User: {
          type: "object",
          properties: {
            _id: { type: "string", example: "6651b2c3f4e5d600001a2b3c" },
            name: { type: "string", example: "João Silva" },
            email: { type: "string", example: "joao@email.com" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        UserResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            message: { type: "string" },
            data: {
              type: "object",
              properties: {
                user: { $ref: "#/components/schemas/User" },
                token: { type: "string", description: "JWT (only on create/login)" },
              },
            },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            message: { type: "string", example: "Descriptive error message" },
            errors: {
              type: "array",
              items: { type: "string" },
              description: "Present only on validation errors",
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerUi, swaggerSpec };
