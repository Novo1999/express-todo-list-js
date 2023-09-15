const allTodos = document.querySelector(".all-todos");

const getTodos = async () => {
  try {
    const {
      data: { todos },
    } = await axios.get("/api/v1/todos");
    if (todos.length < 1) {
      allTodos.innerHTML = "<p>No Todos Yet...</p>";
    }
    console.log(todos);
    const todoData = todos
      .map((item) => {
        const { completed, _id: todoID, todo } = item;
        return `<div class="d-flex singular-todo">
      <div
        class="d-flex gap-4 justify-content-between align-items-center mb-4 bg-white p-3 rounded-2 w-100"
      >
      <div class="d-flex align-items-center gap-5">
      <input
        type="checkbox"
        name="task"
        class="checkbox"
        ${completed ? "checked" : ""}
      />
      <p class="task-text font-monospace">${todo}</p>
      </div>
        <div class="d-flex gap-3">
        <a href="edit-Todo.html?id=${todoID}" class="edit-btn" ">✏</a>
        <button class="delete-btn" data-id="${todoID}">❌</button>
        </div>
      </div> 
  </div>`;
      })
      .join("");
    allTodos.innerHTML = todoData;
  } catch (error) {
    console.log(error);
  }
};

getTodos();

const deleteTodoFromApi = async (id) => {
  try {
    const data = await axios.delete(`/api/v1/todos/${id}`);
    if (!data) {
      alert("Couldn't Delete Todo");
    }
    getTodos();
  } catch (error) {
    console.log(error);
  }
};

const deleteTodo = () => {
  allTodos.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      const id = e.target.dataset.id;
      deleteTodoFromApi(id);
    }
  });
};

deleteTodo();
