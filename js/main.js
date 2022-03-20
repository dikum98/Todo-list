const getElement = (selector) => {
  return document.querySelector(selector);
};

const URL = 'http://localhost:3000/todos';
const $form = getElement('#form');
const $todoContainer = getElement('#task-container');
const $clearBtn = getElement('#clear-btn');

const createTodoElement = (item) => {
  const { content, complete, id } = item;
  const isChecked = complete ? 'checked' : '';
  const $fragment = document.createDocumentFragment();
  const $todoItem = document.createElement('li');
  $todoItem.className = 'todo-item';
  $todoItem.dataset.id = id;
  $todoItem.innerHTML = `
  <input type="checkbox" ${isChecked} name="toDoItem" class="task" />
  <label for="toDoItem">${content}</label>
  <input type="text" class="edit-input" />
  <button class="edit">
  <i class="fa-solid fa-pen-to-square"></i>
  </button>
  <button class="delete">
  <i class="fa fa-solid fa-circle-minus"></i>
  </button>
  <button class="edit-confirm">
    <i class="fa-solid fa-check"></i>
  </button>
  <button class="edit-cancel">
    <i class="fa-solid fa-xmark"></i>
  </button>
  `;
  $fragment.appendChild($todoItem);
  return $fragment;
};

const request = {
  post(url, payload) {
    return fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  },
  patch(url, payload) {
    return fetch(url, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  },
  delete(url) {
    return fetch(url, { method: 'DELETE' });
  },
};

const renderTodos = (todos) => {
  const $todoList = getElement('#todo-list');
  $todoList.innerHTML = '';
  for (const item of todos) {
    $todoList.appendChild(createTodoElement(item));
  }
};

const getTodos = () => {
  fetch(URL)
    .then((response) => response.json())
    .then((todos) => renderTodos(todos))
    .catch((error) => console.error(error.message));
};

const addTodoItem = (e) => {
  e.preventDefault();
  const $todoInput = getElement('#input-text');
  if (!$todoInput.value) return;
  const todoItem = {
    content: $todoInput.value,
    complete: false,
  };

  request
    .post(URL, todoItem)
    .then(getTodos)
    .then(() => {
      $todoInput.value = '';
      $todoInput.focus();
    })
    .catch((error) => console.error(error.message));
};

const deleteTodoItem = (e) => {
  if (e.target.className !== 'delete') return;
  const $item = e.target.closest('.todo-item');
  const id = $item.dataset.id;

  request
    .delete(`${URL}/${id}`)
    .then(getTodos)
    .catch((error) => console.error(error.message));
};

const checkTodoComplete = (e) => {
  if (e.target.className !== 'task') return;
  const $item = e.target.closest('.todo-item');
  const id = $item.dataset.id;
  const isChecked = e.target.checked;

  request
    .patch(`${URL}/${id}`, { complete: isChecked })
    .then(getTodos)
    .catch((error) => console.error(error.message));
};

const clearAllTodos = () => {
  const ids = [...document.querySelectorAll('.todo-item')].map(
    (v) => +v.dataset.id
  );
  ids.forEach((id) =>
    request
      .delete(`${URL}/${id}`)
      .then(getTodos)
      .catch((error) => console.error(error.message))
  );
};

const changeEditMode = (e) => {
  const $item = e.target.closest('.todo-item');
  const $label = $item.querySelector('label');
  const $editInput = $item.querySelector('.edit-input');
  const $editBtn = $item.querySelector('.edit');
  const $deleteBtn = $item.querySelector('.delete');
  const $editConfirmBtn = $item.querySelector('.edit-confirm');
  const $editCancelBtn = $item.querySelector('.edit-cancel');

  if (e.target.className === 'edit') {
    $editBtn.style.display = 'none';
    $deleteBtn.style.display = 'none';
    $editConfirmBtn.style.display = 'inline-block';
    $editCancelBtn.style.display = 'inline-block';
    $label.style.display = 'none';
    $editInput.style.display = 'inline-block';
    $editInput.value = $label.innerText;
    $editInput.focus();
  }

  if (e.target.className === 'edit-cancel') {
    $editBtn.style.display = 'inline-block';
    $deleteBtn.style.display = 'inline-block';
    $editConfirmBtn.style.display = 'none';
    $editCancelBtn.style.display = 'none';
    $label.style.display = 'inline-block';
    $editInput.style.display = 'none';
  }
};

const editTodo = (e) => {
  if (e.target.className !== 'edit-confirm') return;
  const $item = e.target.closest('.todo-item');
  const id = $item.dataset.id;
  const $editInput = $item.querySelector('.edit-input');
  console.log($editInput.value);
  const content = $editInput.value;

  request
    .patch(`${URL}/${id}`, { content })
    .then(getTodos)
    .catch((error) => console.error(error.message));
};

const init = () => {
  window.addEventListener('DOMContentLoaded', getTodos);
  $form.addEventListener('submit', addTodoItem);
  $todoContainer.addEventListener('click', deleteTodoItem);
  $todoContainer.addEventListener('click', checkTodoComplete);
  $todoContainer.addEventListener('click', changeEditMode);
  $todoContainer.addEventListener('click', editTodo);
  $clearBtn.addEventListener('click', clearAllTodos);
};

init();
