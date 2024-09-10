const express = require("express");
const router = express.Router();
const usersController = require("../../controllers/usersController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/")
  .get(verifyRoles(ROLES_LIST.Admin), usersController.getAllUsers)
  .delete(verifyRoles(ROLES_LIST.Admin), usersController.deleteUser)
  .put(verifyRoles(ROLES_LIST.Admin), usersController.updateUser);

router
  .route("/:id")
  .get(verifyRoles(ROLES_LIST.Admin), usersController.getUser);

router
  .route("/students")
  .get(verifyRoles(ROLES_LIST.Admin), usersController.getAllStudents);

router
  .route("/tutors")
  .get(verifyRoles(ROLES_LIST.Admin), usersController.getAllTutors);

router
  .route("/deleteAll")
  .delete(verifyRoles(ROLES_LIST.Admin), usersController.deleteAllUsers);

module.exports = router;
