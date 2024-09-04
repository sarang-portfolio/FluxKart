import swaggerJSDoc from "swagger-jsdoc";

const { swagger_docs_url, PORT } = process.env;

export const swaggerDefine = () => {
  const swaggerDefinition = {
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        title: "FluxKart",
        version: "1.0.0",
        description: "API documentation using Swagger for FluxKart",
      },
    },
    apis: ["./app/modules/contact/contact.routes.ts"],
    servers: [
      {
        url: `${swagger_docs_url}:${PORT}`,
        description: "Development server",
      },
    ],
  };
  const swaggerSpec = swaggerJSDoc(swaggerDefinition);
  return swaggerSpec;
};
