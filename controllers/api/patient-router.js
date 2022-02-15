const { Patient } = require("../../models");
const router = require("express").Router();
router.post("/signup", async (req, res) => {
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
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    // Remove the session variables
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});
router.put('/', async (req, res) => {
  try {
    const patientData = await Patient.update(req.body, {
            where: {
        id: req.session.user_id,
      },
    });
      res.json({
        patientData: patientData
      })
  } catch (err) {
    res.status(400).json(err);
  }
});
module.exports = router;
