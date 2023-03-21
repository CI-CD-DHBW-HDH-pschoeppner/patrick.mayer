import { writable } from "svelte/store";

export class TodoItem {
  id = "";
  value = "";
  done = false;
}

// this function must return a unique ID every time it is called
export function generateID(): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 5; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// make sure, that
// the value isn't longer than 255 characters
// the value isn' empty
// the todo isn't contained in the todos array (case insensitive)
export function validateTodo(todo: TodoItem, todos: TodoItem[]): boolean {
  if (todo.value.length > 255) {
    return false;
  }
  if (todo.value.length === 0) {
    return false;
  }
  let result = true;
  todos.forEach((element) => {
    if (element.value.toLowerCase() === todo.value.toLowerCase()) {
      result = false;
    }
  });
  return result;
}

// capitalize the first letter of the todo
export function formatTodo(todo: TodoItem): TodoItem {
  return {
    id: todo.id,
    value: todo.value.charAt(0).toUpperCase() + todo.value.slice(1),
    done: false,
  };
}

// generate a random rgb color
// each value (r,g,b) should be between 50 and 150
export function generateColor(): string {
  const r = Math.floor(Math.random() * (150 - 50 + 1)) + 50;
  const g = Math.floor(Math.random() * (150 - 50 + 1)) + 50;
  const b = Math.floor(Math.random() * (150 - 50 + 1)) + 50;
  return `rgb(${r.toString()},${g.toString()},${b.toString()})`;
}

export const todoList = writable<TodoItem[]>([]);
