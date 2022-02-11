//const User = require("./User");
const Hospital = require("./Hospital");
const Employee = require("./Employee");
const Patient = require("./Patient");
const HospitalEmployee = require("./HospitalEmployee");
const HospitalPatient = require("./HospitalPatient");
const EmployeePatient = require("./EmployeePatient");

// Define sequelize associations in this file.
Hospital.belongsToMany(Employee, {
  through: HospitalEmployee,
});
Employee.belongsToMany(Hospital, {
  through: HospitalEmployee,
});
Employee.belongsToMany(Patient, {
  through: EmployeePatient,
});
Patient.belongsToMany(Employee, {
  through: EmployeePatient,
});
Hospital.belongsToMany(Patient, {
  through: HospitalPatient,
});
Patient.belongsToMany(Hospital, {
  through: HospitalPatient,
});

module.exports = { Hospital, Employee, Patient, HospitalEmployee, HospitalPatient, EmployeePatient };
