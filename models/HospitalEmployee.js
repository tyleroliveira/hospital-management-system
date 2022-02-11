const { Model, DataTypes } = require("sequelize");
//const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

// create our User model
class HospitalEmployee extends Model {
  // set up method to run on instance data (per user) to check password
  //   checkPassword(loginPw) {
  //     return bcrypt.compare(loginPw, this.password);
  //   }
}

HospitalEmployee.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    hos_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "hospital",
        key: "id",
        unique: false,
      },
    },
    emp_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "employee",
        key: "id",
        unique: false,
      },
    },
  },
  {
    // hooks: {
    //   // set up beforeCreate lifecycle "hook" functionality
    //   beforeCreate: async (newUserData) => {
    //     newUserData.password = await bcrypt.hash(newUserData.password, 10);
    //     return newUserData;
    //   },
    //   beforeUpdate: async (updatedUserData) => {
    //     updatedUserData.password = await bcrypt.hash(
    //       updatedUserData.password,
    //       10
    //     );
    //     return updatedUserData;
    //   },
    // },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "hospital_employee",
  }
);

module.exports = HospitalEmployee;
