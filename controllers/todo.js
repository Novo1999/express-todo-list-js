// create todo
// get todo
// edit/update todo
// delete todo

const createTodo = async (req, res) => {
  try {
    return res.send("create todos");
  } catch (error) {
    return res.send("Something went wrong");
  }
};

const getTodos = async (req, res) => {
  try {
    return res.send("get all todos");
  } catch (error) {
    return res.send("Something went wrong");
  }
};
const getSingleTodo = async (req, res) => {
  try {
    return res.send("get one todo");
  } catch (error) {
    return res.send("Something went wrong");
  }
};
const updateTodo = async (req, res) => {
  try {
    return res.send("update todo");
  } catch (error) {
    return res.send("Something went wrong");
  }
};
const deleteTodo = async (req, res) => {
  try {
    return res.send("delete todo");
  } catch (error) {
    return res.send("Something went wrong");
  }
};

module.exports = {
  createTodo,
  getTodos,
  getSingleTodo,
  updateTodo,
  deleteTodo,
};
