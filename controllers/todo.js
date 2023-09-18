// create todo
// get todo
// edit/update todo
// delete todo
const asyncWrapper = require("../middleware/async");
const TODO = require("../models/Todo");
const { StatusCodes } = require("http-status-codes");

const createTodo = asyncWrapper(async (req, res) => {
  const newTodo = await TODO.create(req.body);

  return res.status(StatusCodes.CREATED).send(newTodo);
});

const getTodos = asyncWrapper(async (req, res) => {
  const todos = await TODO.find({});
  if (!todos) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: "Couldn't get todos" });
  }

  return res.status(201).json({ todos });
});

const getSingleTodo = asyncWrapper(async (req, res) => {
  const { id } = req.params;

  const todo = await TODO.findOne({ _id: id });
  if (!todo) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `No todo found by that id: ${id}` });
  }

  return res.status(StatusCodes.OK).json({ todo });
});

const updateTodo = asyncWrapper(async (req, res) => {
  const { id } = req.params;

  const todo = await TODO.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!todo) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `No todo found by that id: ${id}` });
  }

  return res.json({ todo });
});

const deleteTodo = asyncWrapper(async (req, res) => {
  const { id } = req.params;

  const todo = await TODO.findOneAndDelete({ _id: id });
  if (!todo) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `No todo found by that id: ${id}` });
  }
  return res.json({ msg: "Successfully Deleted", deleted: todo.todo });
});

module.exports = {
  createTodo,
  getTodos,
  getSingleTodo,
  updateTodo,
  deleteTodo,
};
