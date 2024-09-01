import express from "express";
import { connectToPostgres } from "./connections/postgres.connection";
import { registerRoutes } from "./modules/routes/routes.register";

export const startServer = async () => {
  try {
    const app = express();

    const { PORT } = process.env;

    await connectToPostgres();
    registerRoutes(app);
    
    app.listen(PORT, () => {
      console.log(`SERVER STARTED ON PORT ${PORT}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
