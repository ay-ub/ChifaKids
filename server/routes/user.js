const express = require("express");
const router = express.Router();
const {
  createUser,
  getAllUsers,
  deleteUser,
  updateUserType,
} = require("../Controllers/user");

//=======================================================
router.route("/").post(createUser).get(getAllUsers).delete(deleteUser);
router.route("/:email").put(updateUserType);
//=======================================================

module.exports = router;
