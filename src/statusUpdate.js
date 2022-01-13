/* eslint-disable import/no-cycle */
import {
  completedTask, deleteTask, editTask, clearAllCompletedTask,
} from './index.js';

const statusUpdate = (e) => {
  const item = e.target;

  if (item.classList.contains('checkbox')) {
    const itemm = item.closest('li');
    completedTask(itemm);
  }

  if (item.classList.contains('delete')) {
    const itemm = item.parentElement.parentElement.id;
    deleteTask(itemm);
  }

  if (item.classList.contains('edit')) {
    const itemm = item.parentElement.parentElement.id;
    editTask(itemm);
  }

  if (item.classList.contains('clear-all')) {
    clearAllCompletedTask();
  }
};

export default statusUpdate;
