const router = require("express").Router();
const patientRouter = require("./patient-router");
router.use("/patient", patientRouter);
module.exports = router;