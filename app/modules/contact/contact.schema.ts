import { DataTypes } from "sequelize";
import { sequelize } from "../../utility/sequelize";

export const contactModel = sequelize.define(
  "Contact",
  {
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    linkedId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Contacts",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    linkPrecedence: {
      type: DataTypes.ENUM("primary", "secondary"),
      allowNull: false,
    },
  },
  { timestamps: true, paranoid: true }
);

// Setting up the self-reference association
contactModel.hasMany(contactModel, {
  foreignKey: "linkedId",
  as: "linkedUsers",
});
contactModel.belongsTo(contactModel, {
  foreignKey: "linkedId",
  as: "primaryUser",
});
