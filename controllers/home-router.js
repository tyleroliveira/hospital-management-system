const {
  Patient
} = require("../models");

const router = require("express").Router();
router.get("/", async (req, res) => {

  try {

    const patientData = await Patient.findAll();
    const patient = patientData.map((patient) => patient.get({
      plain: true
    }));


    res.render('home', {
      patient,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }


});


router.get("/patient/login", (req, res) => {
  // If the user is already logged in, redirect the request to home route
  // if (req.session.logged_in) {
  //   res.redirect('/patient/info');
  //   return;
  // }

  res.render("login");
});

router.get("/patient/signup", (req, res) => {
  // if (req.session.logged_in) {
  //   res.redirect('/patient/info');
  //   return;
  //}

  res.render("signup");
});


router.get("/patient/info", async (req, res) => {

  try {
    // Find the logged in user based on the session ID
    const dataPatient = await Patient.findByPk(req.session.user_id);


    const patient = dataPatient.get({
      plain: true
    });
    console.log(patient);
    res.render('patient', {
      ...patient,
      logged_in: true
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }


});



module.exports = router;