const $inputBox = document.querySelector('#input-text');
const $submitBtn = document.querySelector('#submit-btn');
const $taskContainer = document.querySelector('#task-container');
const $toDoList = document.querySelector('#todo-list');
const $clearBtn = document.querySelector('#clear-btn');

const myStorage = sessionStorage;
let toDoItemArr = [];

// Create todo Item Element
function createToDoElement(toDoInfo) {
  const $fragment = document.createDocumentFragment();
  const $li = document.createElement('li');
  $li.className = 'task-list';
  const $input = document.createElement('input');
  $input.setAttribute('type', 'checkbox');
  if (toDoInfo['checked'] === true) {
    $input.setAttribute('checked', 'true');
  } else {
    $input.removeAttribute('checked');
  }
  $input.setAttribute('name', 'toDoItem');
  $input.className = 'task';
  $input.id = toDoInfo['id'];
  $li.appendChild($input);

  const $label = document.createElement('label');
  $label.setAttribute('for', 'toDoItem');
  $label.innerText = toDoInfo['text'];
  $li.appendChild($label);

  // create delete button
  const $button = document.createElement('button');
  $button.className = 'delete';
  const $icon = document.createElement('i');
  $icon.className = 'fa fa-solid fa-circle-minus';
  $button.appendChild($icon);
  $li.appendChild($button);

  $fragment.appendChild($li);
  return $fragment;
}

// Check Todo Item is Done or Not
function checkDoneTask(e) {
  for (const item of toDoItemArr) {
    if (e.target.id === item['id']) {
      if (e.target.checked === false) {
        item['checked'] = false;
      } else {
        item['checked'] = true;
      }
    }
    saveToDoInfo();
  }
}

// Insert ToDoItem into Todo list
function insertToDoItem(e) {
  e.preventDefault();
  const taskInput = $inputBox.value;
  if (!taskInput) return;
  const toDoInfo = {
    text: taskInput,
    id: new Date(),
    checked: false,
  };
  $inputBox.value = '';
  toDoItemArr.push(toDoInfo);
  saveToDoInfo();
  $toDoList.appendChild(createToDoElement(toDoInfo));
}

// Save Information on Session Storage
function saveToDoInfo() {
  myStorage.setItem('todo', JSON.stringify(toDoItemArr));
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
  myStorage.setItem('todo', JSON.stringify(toDoItemArr));
}

// Clear Whole List
function clearWholeList() {
  toDoItemArr = [];
  myStorage.clear();
  $toDoList.innerHTML = '';
}

// Print To Do List on Page
function printToDoList() {
  const getToDoInfo = myStorage.getItem('todo');
  if (!getToDoInfo) return;
  const parsedToDoInfo = JSON.parse(getToDoInfo);
  toDoItemArr = parsedToDoInfo;
  for (const item of toDoItemArr) {
    $toDoList.appendChild(createToDoElement(item));
  }
}
printToDoList();

$submitBtn.addEventListener('click', insertToDoItem);
$toDoList.addEventListener('click', removeToDoItem);
$toDoList.addEventListener('click', checkDoneTask);
$clearBtn.addEventListener('click', clearWholeList);
