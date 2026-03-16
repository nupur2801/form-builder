const express = require("express");
const router = express.Router();
const {
  getAllForms,
  getFormById,
  createForm,
  updateForm,
  deleteForm,
} = require("../controllers/formController");

router.route("/").get(getAllForms).post(createForm);
router.route("/:id").get(getFormById).put(updateForm).delete(deleteForm);

module.exports = router;
