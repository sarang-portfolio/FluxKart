import express from "express";
import { connectToPostgres } from "./connections/postgres.connection";
import { registerRoutes } from "./modules/routes/routes.register";
import { serve, setup } from "swagger-ui-express";
import { swaggerDefine } from "./utility/swagger";

export const startServer = async () => {
  try {
    const app = express();

    const { PORT } = process.env;

    await connectToPostgres();
    registerRoutes(app);

    const swaggerDefinition = swaggerDefine();
    app.use("/fluxkart/docs", serve, setup(swaggerDefinition));

    app.listen(PORT, () => {
      console.log(`SERVER STARTED ON PORT ${PORT}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
