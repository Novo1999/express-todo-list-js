const express = require("express");
const {
  getTodos,
  getSingleTodo,
  updateTodo,
  deleteTodo,
  createTodo,
} = require("../controllers/todo");

const router = express.Router();

router.route("/").get(getTodos).post(createTodo);
router.route("/:id").get(getSingleTodo).patch(updateTodo).delete(deleteTodo);

module.exports = router;
