const router = require("express").Router();
// const {Patient} = require("../models");

// use withAuth middleware to redirect from protected routes.
// const withAuth = require("../util/withAuth");

// example of a protected route
// router.get("/users-only", withAuth, (req, res) => {
//   // ...
// });
router.get("/", (req, res) => {


  res.render("home");
});


router.get("/patient/login", (req, res) => {
  // If the user is already logged in, redirect the request to home route
  // if (req.session.logged_in) {
  //   res.redirect('/patient');
  //   return;
  // }

  res.render("login", {
    title: "Log-In Page"
  });
});

router.get("/patient/signup", (req, res) => {

  res.render("signup", {
    title: "Sign-Up Page"
  });
});

router.get("/patient/info", (req, res) => {
  res.render("patient", {
    title: "Info Page"
  });
});

router.get("/patient/update", (req, res) => {
  res.render("update", { title: "Update Page" });
});

module.exports = router;