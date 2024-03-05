import { Todo } from "../../../server/utils/trpc/routers/todo";
import { createTodo } from "../app";

const todoContainer = document.getElementById(
  "todo-container"
) as HTMLDivElement;

const todoInput = document.getElementById("new-todo") as HTMLInputElement;

document.addEventListener("DOMContentLoaded", () => {
  todoInput?.addEventListener("keyup", createTodoItem);
});

async function createTodoItem(event: KeyboardEvent) {
  if (event.key === "Enter") {
    const todoText = todoInput?.value;

    if (todoText) {
      todoInput.value = "";
      const newTodo = await createTodo(todoText);

      const element = createNewChildElement(newTodo);

      todoContainer.insertAdjacentHTML("afterbegin", element);
    }
  }
}

function createNewChildElement(todo: Todo) {
  return `
        <div class="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700" id="todo-item-${todo.id}">
          <input id="bordered-checkbox-${todo.id}" type="checkbox" value="" name="bordered-checkbox"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
          <label for="bordered-checkbox-${todo.id}"
            class="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">${todo.text}</label>
        </div>`;
}
