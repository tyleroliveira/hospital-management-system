const router = require("express").Router();

const patientRouter = require("./patient-router");

//"/api"

router.use("/patient", patientRouter);

module.exports = router;
