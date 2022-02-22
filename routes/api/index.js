const express = require("express");
const UserControllers = require("../../controllers/users");

const {
  validationCreate,
  validationUpdate,
  validationId,
} = require("../../midlewarres/validation");

const router = express.Router();
const userControllers = new UserControllers();

router.post("/", validationCreate, userControllers.addUser);

router.patch("/:id", validationUpdate, userControllers.updateUser);

router.get("/", userControllers.getUsers);

router.delete("/:id", validationId, userControllers.removeUser);

module.exports = router;
