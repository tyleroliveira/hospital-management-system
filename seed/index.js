require("dotenv").config();
const sequelize = require("../config/connection");
//const { User } = require("../models");
const Hospital = require("../models/Hospital");
const Employee = require("../models/Employee");
const Patient = require("../models/Patient");
const HospitalEmployee = require("../models/HospitalEmployee");
const HospitalPatient = require("../models/HospitalPatient");
const EmployeePatient = require("../models/EmployeePatient");

const hospitalData = require("./hospitalData.json");
const seedDatabaseHospital = async () => {
  await Hospital.bulkCreate(hospitalData, {
    individualHooks: true,
    returning: true,
  });
  console.log("Finished seeding hospitals.");
};

const employeeData = require("./employeeData.json");
const seedDatabaseEmployee = async () => {
  await Employee.bulkCreate(employeeData, {
    individualHooks: true,
    returning: true,
  });
  console.log("Finished seeding employees.");
};

const patientData = require("./patientData.json");
const seedDatabasePatient = async () => {
  await Patient.bulkCreate(patientData, {
    individualHooks: true,
    returning: true,
  });
  console.log("Finished seeding patients.");
};

const hospitalEmployeeData = require("./hospitalEmployeeData.json");
const seedDatabaseHospitalEmployee = async () => {
  await HospitalEmployee.bulkCreate(hospitalEmployeeData, {
    individualHooks: true,
    returning: true,
  });
  console.log("Finished seeding database.");
};

const hospitalPatientData = require("./hospitalPatientData.json");
const seedDatabaseHospitalPatient = async () => {
  await HospitalPatient.bulkCreate(hospitalPatientData, {
    individualHooks: true,
    returning: true,
  });
  console.log("Finished seeding database.");
};

const employeePatientData = require("./employeePatientData.json");
const seedDatabaseEmployeePatient = async () => {
  await EmployeePatient.bulkCreate(employeePatientData, {
    individualHooks: true,
    returning: true,
  });
  console.log("Finished seeding database.");
};
(async () => {
  try {
    await sequelize.sync({ force: true });
    await seedDatabaseHospital();
    await seedDatabaseEmployee();
    await seedDatabasePatient();
    await seedDatabaseHospitalEmployee();
    await seedDatabaseEmployeePatient();
    await seedDatabaseHospitalPatient();
   await sequelize.close();
   process.exit(0);
  } catch (err) {
    console.error(err);
   await sequelize.close();
   process.exit(1);
  }
})();
