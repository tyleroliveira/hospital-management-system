const { Patient } = require("../../models");
const router = require("express").Router();

// /"/api/patient/signup"
router.post("/signup", async (req, res) => {
  console.log("Api Signup route", req.body);
  //const { username, password } = req.body;
 // insert in to the user table using controller 
  try {
    const userData = await Patient.create(req.body);
    console.log("userData", userData);
    //  username = req.body.username,
    // password = req.body.password

    const patientData = userData.get({ plain: true }); 
    
    res.render("patient",{ patient: patientData, message: 'You are now logged in!' });

  } catch (err) {
    res.status(400).json(err);
  }


  
});

router.post("/login", async (req, res) => {
  //const { username, password } = req.body;
  try {
    const patientData = await Patient.findOne({
      where: {
        email: req.body.email
      }
    });

    if (!patientData) {
      res
        .status(400)
        .json({
          message: 'Incorrect email or password, please try again'
        });
      return;
    }

    const validPassword = await patientData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({
          message: 'Incorrect email or password, please try again'
        });
      return;
    }

    req.session.user_id = patientData.id;
    req.session.logged_in = true;

    req.session.save(() => res.json({
      user: patientData,
      message: 'You are now logged in!'
    }));
  } catch (err) {
    res.status(400).json(err);
  }





});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.status(500).json({
        message: "Internal server error"
      });
      return;
    }
    res.end();
  });
});

module.exports = router;