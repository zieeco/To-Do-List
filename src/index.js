import './style.css';

const taskList = document.querySelector('.task-list');

const storedToDos = [
  {
    index: 0,
    description: 'Awesome Books with ES6',
    completed: true,
  },
  {
    index: 1,
    description: 'ToDo List: add_list item',
    completed: true,
  },
  {
    index: 2,
    description: 'ToDo List: add_Remove',
    completed: true,
  },
  {
    index: 3,
    description: 'ToDo List: interactive-list',
    completed: true,
  },
];

const autoFillData = () => {
  let display = '';
  storedToDos.forEach((task) => {
    display += `<li class="p-sm-i flex b-b" id=${task.index}>
    <div class="flex">
    <input class=" mr-12" type="checkbox" id=${task.index} ${task.completed ? 'checked' : ''}>
    <label type="text" for="${task.description}" class="label fs" id="${task.index}">${task.description}</label>
    </div>
    <i class="fas fa-ellipsis-v resize" id="${task.index}"></i>
    </li>`;
  });
  taskList.innerHTML = display;
};
autoFillData();
