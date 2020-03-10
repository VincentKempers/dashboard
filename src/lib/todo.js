var inputType = document.querySelector('.toDo__input');
var ul = document.querySelector('#todolist');
var clearButton = document.querySelector('.clear');
var allChildren = document.querySelector('#todolist').children;

var elementsArray;
var toDoArray;


inputType.addEventListener('keypress', function (event) {
  if (inputType.value === '') {
    return
  };

  if (event.key === "Enter") {
    ul.insertAdjacentHTML('beforeend', `<li><input class="todoItem" type='checkbox'>${inputType.value}</input></li>`);
    setLocalStorage();
    return inputType.value = '';
  };
});

function setLocalStorage() {
  elementsArray = Array.from(allChildren);

  toDoArray = elementsArray.map(function (element) {
    return element.innerHTML;
  })

  console.log(toDoArray);

  localStorage.setItem('toDo', toDoArray);
}

function getLocalStorage() {
  var storedString = localStorage.getItem('toDo').split(",");

  storedString.forEach(function (element) {
    ul.insertAdjacentHTML('beforeend', `<li> ${element} </li>`);
  })
}

document.addEventListener('click', function (event) {
  var allTodoItems = document.querySelectorAll('.todoItem');
  for (let i = 0; i < allTodoItems.length; i++) {
    if (allTodoItems[i].checked === true) {
      allTodoItems[i].parentNode.remove();
      setLocalStorage();
    }
  } 
}, true);

clearButton.addEventListener('click', function () {
  ul.innerHTML = '';
  localStorage.removeItem('toDo');
}, true);


getLocalStorage();
