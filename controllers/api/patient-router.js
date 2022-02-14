const {
  Patient
} = require("../../models");

const router = require("express").Router();

// /"/api/patient/signup"
router.post("/signup", async (req, res) => {
  // insert in to the user table using controller 
  try {
    const userData = await Patient.create(req.body);
    req.session.user_id = userData.id;               //
    req.session.logged_in = true;                    //
    console.log("UserData", req.body);
    res.json(userData);
  } catch (err) {
    res.status(400).json(err);
  }

});


router.post("/login", async (req, res) => {
  const {
    username,
    password
  } = req.body;
  // console.log("login");
  console.log("USERNAME_", username);
  console.log("PASSWORD", password);


  try {
    console.log("TRY");


    const patientData = await Patient.findOne({
      where: {
        username: req.body.username
      }
    });
    

    const patientUser = req.body.username;
    const patientUserNameT = patientData.username;


    if ((patientUserNameT !== patientUser)) {

      res
        .status(400)
        .json({
          message: 'Incorrect email or password, please try again'
        });
      return;
    }
    const userPassword = req.body.password;
    const validPassword = patientData.password;

    if (userPassword !== validPassword) {
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