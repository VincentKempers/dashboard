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
    ul.insertAdjacentHTML('beforeend', `<li>${inputType.value}</li>`);
    setLocalStorage();
    return inputType.value = '';
  };
});

function setLocalStorage() {
  elementsArray = Array.from(allChildren);
  toDoArray = elementsArray.map(function (element) {
    return element.innerHTML;
  })
  console.log('yatta', toDoArray);
  localStorage.setItem('toDo', toDoArray);
}

function getLocalStorage() {
  var storedString = localStorage.getItem('toDo').split(",");
  storedString.forEach(function (element) {
    ul.insertAdjacentHTML('beforeend', `<li> ${element} </li>`);
  })
}

clearButton.addEventListener('click', function () {
  ul.innerHTML = '';
  localStorage.removeItem('toDo');
}, true);


getLocalStorage();
