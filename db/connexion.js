import { Sequelize } from "sequelize";

const sequelize = new Sequelize("party-animal", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;
