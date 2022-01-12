/* eslint-disable import/no-cycle */

import './style.css';
import statusUpdate from './statusUpdate.js';

const taskList = document.querySelector('.task-list');
const todoInput = document.getElementById('todo-input');
const addToDoBtn = document.getElementById('add-todo-btn');
let storedToDos = [];
let editIndex = null;

const getToDos = () => {
  if (localStorage.getItem('toDos') === null) {
    storedToDos = [];
  } else {
    storedToDos = JSON.parse(localStorage.getItem('toDos'));
  }

  let display = '';
  storedToDos.forEach((task, index) => {
    const completed = task.completed ? 'line-through' : '';
    display += `
    <li class="p-sm-i flex b-b ${completed}" id=${index}>
    <div class="flex">
    <input class=" checkbox mr-12" type="checkbox" id=${index} ${task.completed ? 'checked' : ''}>
    <label for="${index}" class='label'>${task.description}</label>
    </div>

    <div class="">
    <i class="fas fa-trash delete resize" id=${index}></i>
    <i class="fas fa-edit edit resize" id=${index}></i>
    </div>
    </li>`;
  });
  taskList.innerHTML = display;
};

const saveToDos = ({ description, completed = false }) => {
  storedToDos = [];
  if (localStorage.getItem('toDos') === null) {
    storedToDos = [];
  } else {
    storedToDos = JSON.parse(localStorage.getItem('toDos'));
  }

  storedToDos.push({ description, completed });
  localStorage.setItem('toDos', JSON.stringify(storedToDos));
};

const saveEdittedTask = (task) => {
  const myTask = storedToDos[task];
  myTask.description = todoInput.value;
  localStorage.setItem('toDos', JSON.stringify(storedToDos));
};

const completedTask = (task) => {
  const input = task.querySelector('input');
  const label = task.querySelector('label');
  const todoItem = storedToDos[task.id];
  if (input.checked) {
    todoItem.completed = true;
    label.style.textDecoration = 'line-through';
  } else {
    todoItem.completed = false;
    label.style.textDecoration = 'none';
  }
  localStorage.setItem('toDos', JSON.stringify(storedToDos));
};

const deleteTask = (task) => {
  const item = storedToDos[task];
  storedToDos = storedToDos.filter((todo) => todo !== item);
  localStorage.setItem('toDos', JSON.stringify(storedToDos));
  window.location.reload();
};

const editTask = (task) => {
  editIndex = task;
  const taskToEdit = storedToDos[task];
  todoInput.value = taskToEdit.description;
  todoInput.focus();
};

addToDoBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (!todoInput.value) {
    return;
  }

  if (editIndex != null) {
    saveEdittedTask(editIndex);
    editIndex = null;
  } else {
    saveToDos({ description: todoInput.value, completed: false });
  }

  getToDos();
  todoInput.value = '';
});

document.addEventListener('DOMContentLoaded', getToDos);
taskList.addEventListener('click', statusUpdate);

export {
  deleteTask, completedTask, editTask,
};
