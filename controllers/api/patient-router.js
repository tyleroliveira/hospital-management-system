const { Patient } = require("../../models");

const router = require("express").Router();

router.post("/signup", async (req, res) => {
  // insert in to the user table using controller
  try {
    const userData = await Patient.create(req.body);
    req.session.user_id = userData.id;
    req.session.logged_in = true;

    req.session.save(() => {
      res.json({
        userData: userData,
        message: "You are now signed in!",
      });
    });
    req.session.save(() =>
      res.json({
        user: userData,
        message: "You are now logged in!",
      })
    );
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const patientData = await Patient.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!patientData) {
      res.status(400).json({
        message: "Incorrect email or password, please try again",
      });
      return;
    }

    const validPassword = await patientData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({
        message: "Incorrect email or password, please try again",
      });
      return;
    }
    req.session.user_id = patientData.id;
    req.session.logged_in = true;

    req.session.save(() =>
      res.json({
        user: patientData,
        message: "You are now logged in!",
      })
    );
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({
        message: "Internal server error",
      });
      return;
    }
    res.end();
  });
});

module.exports = router;
