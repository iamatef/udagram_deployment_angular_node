import { Sequelize } from "sequelize-typescript";
import { config } from "./config/config";


export const sequelize = new Sequelize({
  username: config.username,
  password: config.password,
  database: config.database,
  host: config.host,

  dialect: "postgres",
  storage: ":memory:",
});

/*
export const sequelize = new Sequelize(
  'postgres://postgres:Nya5pAy7XxEk2LA@database-1.crizm87xfttb.us-east-1.rds.amazonaws.com:5432'
);
*/
