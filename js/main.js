const $inputBox = document.querySelector('#input-text');
const $submitBtn = document.querySelector('#submit-btn');
const $taskContainer = document.querySelector('#task-container');
const $toDoList = document.querySelector('#todo-list');
const $clearBtn = document.querySelector('#clear-btn');

const myStorage = sessionStorage;
let toDoItemArr = [];

function createToDoItem(task) {
  const $fragment = document.createDocumentFragment();
  const $li = document.createElement('li');
  $li.className = 'task-list';
  const $input = document.createElement('input');
  $input.setAttribute('type', 'checkbox');
  $input.setAttribute('name', 'toDoItem');
  $input.className = 'task';
  $li.appendChild($input);

  const $label = document.createElement('label');
  $label.setAttribute('for', 'toDoItem');
  $label.innerText = task;
  $li.appendChild($label);

  // create delete button
  const $$button = document.createElement('button');
  $$button.className = 'delete';
  const $icon = document.createElement('i');
  $icon.className = 'fa fa-solid fa-circle-minus';
  $$button.appendChild($icon);
  $li.appendChild($$button);

  $fragment.appendChild($li);
  return $fragment;
}

// Insert ToDoItem into Todo list
function insertToDoItem(e) {
  e.preventDefault();
  const task = $inputBox.value;
  if (!task) return;
  createToDoItem(task);
  $toDoList.appendChild(createToDoItem(task));
  $inputBox.value = '';

  toDoItemArr.push(task);
  myStorage.setItem('todo', toDoItemArr);
}

// Remove ToDoItem from Todo list
function removeToDoItem(e) {
  if (e.target.parentNode.className !== 'delete') return;
  const target = e.target.parentNode.previousSibling.parentNode;
  const targetIndex = Array.prototype.indexOf.call(
    $toDoList.childNodes,
    target
  );
  $toDoList.removeChild(target);

  toDoItemArr.splice(targetIndex, 1);
  myStorage.setItem('todo', toDoItemArr);
  console.log(myStorage, toDoItemArr);
}

function clearWholeList() {
  toDoItemArr = [];
  myStorage.clear();
  $toDoList.innerHTML = '';
}

function convertSessionStorageToArr() {
  return (
    JSON.parse(JSON.stringify(myStorage.getItem('todo')))?.split(',') ?? []
  );
}

function printToDoList() {
  toDoItemArr = convertSessionStorageToArr();
  if (toDoItemArr.length === 1 && toDoItemArr[0] === '') toDoItemArr = [];
  for (const item of toDoItemArr) {
    $toDoList.appendChild(createToDoItem(item));
  }
}
printToDoList();

$submitBtn.addEventListener('click', insertToDoItem);
$taskContainer.addEventListener('click', removeToDoItem);
$clearBtn.addEventListener('click', clearWholeList);
