// create todo
// get todo
// edit/update todo
// delete todo
const asyncWrapper = require("../middleware/async");
const TODO = require("../models/Todo");

const createTodo = asyncWrapper(async (req, res) => {
  const newTodo = await TODO.create(req.body);

  return res.status(201).send(newTodo);
});

const getTodos = asyncWrapper(async (req, res) => {
  const todos = await TODO.find({});
  if (!todos) {
    return res.status(404).json({ msg: "Couldn't get todos" });
  }

  return res.status(201).json({ todos });
});

const getSingleTodo = asyncWrapper(async (req, res) => {
  const { id } = req.params;

  const todo = await TODO.findOne({ _id: id });
  if (!todo) {
    return res.status(404).json({ msg: `No todo found by that id: ${id}` });
  }

  return res.status(201).json({ todo });
});

const updateTodo = asyncWrapper(async (req, res) => {
  const { id } = req.params;

  const todo = await TODO.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!todo) {
    return res.status(404).json({ msg: `No todo found by that id: ${id}` });
  }

  return res.json({ todo });
});

const deleteTodo = asyncWrapper(async (req, res) => {
  const { id } = req.params;

  const todo = await TODO.findOneAndDelete({ _id: id });
  if (!todo) {
    return res.status(404).json({ msg: `No todo found by that id: ${id}` });
  }

  return res.send("Successfully deleted");
});

module.exports = {
  createTodo,
  getTodos,
  getSingleTodo,
  updateTodo,
  deleteTodo,
};
