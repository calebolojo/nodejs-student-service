const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "1.0.0",
    info: {
      title: "NodeJS student CRUD service",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"], // Path to the API route files with JSDoc comments
};

const swaggerSpec = swaggerJsDoc(options);

export default swaggerSpec;
