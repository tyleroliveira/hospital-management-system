const { Patient } = require("../models");
const router = require("express").Router();
router.get("/", async (req, res) => {
  try {
    const patientData = await Patient.findAll();
    const patient = patientData.map((patient) =>
      patient.get({
        plain: true,
      })
    );
    res.render("home", {
      patient,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/patient/login", (req, res) => {
  res.render("login");
});
router.get("/patient/signup", (req, res) => {
  res.render("signup");
});
router.get("/patient/info", async (req, res) => {
  try {
    const dataPatient = await Patient.findByPk(req.session.user_id);
    const patient = dataPatient.get({
      plain: true,
    });
    res.render("patient", {
      patient,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/patient/update", async (req, res) => {
  const dataPatient = await Patient.findByPk(req.session.user_id);
  const patient = dataPatient.get({
    plain: true,
  });
  res.render("update", { patient, logged_in: req.session.logged_in });
});
module.exports = router;