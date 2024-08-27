import express from "express";

export const startServer = async () => {
  try {
    const app = express();

    const { PORT } = process.env;
    app.listen(PORT, () => {
      console.log(`SERVER STARTED ON PORT ${PORT}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
