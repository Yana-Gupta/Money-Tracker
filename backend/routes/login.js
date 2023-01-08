const { Router } = require("express");
const User = require("../schema/Users.js");

const router = Router();

router.post("/login", async function (req, res) {
  const checkIfRegistered = await User.findOne({
    email: req.body.email,
  });
  if (checkIfRegistered) {
    if (checkIfRegistered.password == req.body.password) {
      res.sendStatus(200);
    } else {
      res.sendStatus(203);
    }
  } else {
    res.sendStatus(204);
  }
});

module.exports = router;
