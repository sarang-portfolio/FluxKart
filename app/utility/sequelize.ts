import { Sequelize } from "sequelize";

const { DATABASE, HOST, DB_PORT, DB_USER, DB_PASSWORD, DIALECT } = process.env;

type Dialect = "postgres" | "mysql" | "sqlite" | "mssql";

export const sequelize = new Sequelize(
  DATABASE as string,
  DB_USER as string,
  DB_PASSWORD,
  {
    host: HOST,
    port: Number(DB_PORT),
    dialect: (DIALECT as Dialect) || "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Only for testing purposes for this project
      },
    },
  }
);
