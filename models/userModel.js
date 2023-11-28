import { DataTypes } from "sequelize";
import sequelize from "../db/connexion.js";

const User = sequelize.define(
  "user",
  {
    id_user: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nom_user: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    prenom_user: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email_user: {
      type: DataTypes.STRING,
      allowNull: false,
      // unique: true,
    },
    password_user: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image_profil: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role_user: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "user",
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true, // Par défaut, le compte est actif
    },
  },
  {
    timestamps: false, // Désactiver les horodatages
  }
);

// Synchronisez le modèle avec la base de données (créez la table s'il n'existe pas)
User.sync({ alter: true }).then(() => {
  console.log("User table synced");
});

export default User;
