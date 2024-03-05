import { Todo } from "../../../server/utils/trpc/routers/todo";
import { todoClient } from "./trpc";

const todoContainer = document.getElementById(
  "todo-container"
) as HTMLDivElement;

const todoInput = document.getElementById("new-todo") as HTMLInputElement;

// const todoCheckBoxes = document.getElementsByClassName("todo-check") as HTMLCollectionOf<HTMLInputElement>;

document.addEventListener("DOMContentLoaded", () => {
  todoInput?.addEventListener("keyup", createTodoItem);
});

async function createTodoItem(event: KeyboardEvent) {
  if (event.key === "Enter") {
    const todoText = todoInput?.value;

    if (todoText) {
      todoInput.value = "";
      const newTodo = await todoClient.createTodo(todoText);

      const element = createNewChildElement(newTodo);

      todoContainer.insertAdjacentHTML("afterbegin", element);

      const newTodoCheckBox = document.getElementById(
        `bordered-checkbox-${newTodo.id}`
      );

      newTodoCheckBox?.addEventListener("change", confirmState);
    }
  }
}

async function confirmState(event: Event) {
  const element = event.target as HTMLInputElement;
  const todoId = element.id.replace("todo-item-", "");
  if (element.checked) {
      const todo = await todoClient.updateTodo(todoId, true);
      element.parentElement?.remove();  
      return todo;
  }

  const todo = await todoClient.updateTodo(todoId, false);
  return todo;
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
