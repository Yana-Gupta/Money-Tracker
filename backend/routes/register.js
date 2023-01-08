const { Router } = require("express");
const User = require("../schema/Users.js");

const router = Router();

router.post("/register", async function (req, res) {
  const checkIfRegistered = await User.findOne({
    email: req.body.email,
  });
  if (checkIfRegistered) {
    res.sendStatus(204);
  } else {
    const newUser = await User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    await newUser.save();
    res.sendStatus(200);
  }
});

module.exports = router;
