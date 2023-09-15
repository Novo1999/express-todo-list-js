const todoText = document.querySelector(".todo-text");
const editTodoValue = document.querySelector(".edit-input");
const editBtn = document.querySelector(".btn-edit");
const params = window.location.search;
const id = new URLSearchParams(params).get("id");

const getSingleTodo = async (id) => {
  try {
    const data = await axios.get(`api/v1/todos/${id}`);
    todoText.innerText = `Now editing: ${data?.data?.todo?.todo}`;
    editTodoValue.value = data?.data?.todo?.todo;
  } catch (error) {
    console.log(error);
  }
};

getSingleTodo(id);

const editTodoInApi = async (e) => {
  e.preventDefault();
  try {
    await axios.patch(`api/v1/todos/${id}`, {
      todo: editTodoValue.value,
    });
    getSingleTodo(id);
  } catch (error) {
    console.log(error);
  }
};

const editTodo = () => {
  editBtn.addEventListener("click", (e) => editTodoInApi(e));
};

editTodo();

const setInputValue = () => {
  editTodoValue.addEventListener("change", updateValue);
};
const updateValue = (e) => {
  editTodoValue.value = e.target.value;
};

setInputValue();
