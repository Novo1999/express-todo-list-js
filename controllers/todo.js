// create todo
// get todo
// edit/update todo
// delete todo
const asyncWrapper = require("../middleware/async");
const TODO = require("../models/Todo");

const createTodo = asyncWrapper(async (req, res) => {
  try {
    const newTodo = await TODO.create(req.body);
    return res.status(201).send(newTodo);
  } catch (error) {
    return res.status(404).send("Something went wrong");
  }
});

const getTodos = asyncWrapper(async (req, res) => {
  try {
    const todos = await TODO.find({});
    if (!todos) {
      return res.status(404).json({ msg: "Couldn't get todos" });
    }
    return res.status(201).json({ todos });
  } catch (error) {
    return res.status(404).send("Something went wrong");
  }
});

const getSingleTodo = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await TODO.findOne({ _id: id });
    if (!todo) {
      return res.status(404).json({ msg: `No todo found by that id: ${id}` });
    }
    return res.status(201).json({ todo });
  } catch (error) {
    return res.send("Something went wrong");
  }
});

const updateTodo = asyncWrapper(async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await TODO.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!todo) {
      return res.status(404).json({ msg: `No todo found by that id: ${id}` });
    }
    return res.json({ todo });
  } catch (error) {
    return res.send("Something went wrong");
  }
});

const deleteTodo = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await TODO.findOneAndDelete({ _id: id });
    if (!todo) {
      return res.status(404).json({ msg: `No todo found by that id: ${id}` });
    }
    return res.send("Successfully deleted");
  } catch (error) {
    return res.send("Something went wrong");
  }
});

module.exports = {
  createTodo,
  getTodos,
  getSingleTodo,
  updateTodo,
  deleteTodo,
};
