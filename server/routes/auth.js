const express = require("express");
const router = express.Router();
const protectRoute = require("../middleware/protectRoute.js");
const { login, logout } = require("../Controllers/auth.js");

//=======================================================

router.post("/login", login);

router.get("/logout", logout);

router.get("/", protectRoute, (req, res) => {
  if (req.user) {
    // console.log("User authenticated: ", req.user);
    return res
      .status(200)
      .json({ status: "success", data: { user: req.user } });
  } else {
    return res
      .status(400)
      .json({ status: "error", message: "User not authenticated" });
  }
});
//=======================================================
module.exports = router;
