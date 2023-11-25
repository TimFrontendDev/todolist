//Здесь код получает ссылки на элементы HTML с идентификаторами "input-box" и "list-container" и сохраняет их 
//в переменных inputBox и listContainer, соответственно.

const inputBox = document.getElementById('input-box');

const listContainer = document.getElementById('list-container');

//Это функция, которая вызывается при добавлении новой задачи. Она проверяет, было ли что-то введено 
//в поле inputBox. Если поле пустое, выдается предупреждение. В противном случае, создается новый элемент 
//<li>, содержащий текст из inputBox, добавляется к списку в listContainer, а также добавляется кнопка 
//"удалить" в виде элемента <span>.
function AddTask(){
    if(inputBox.value === ''){
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

inputBox.addEventListener("keydown", function(event) {
    // Проверяем, была ли нажата клавиша Enter
    if (event.key === "Enter") {
        AddTask(); // Вызываем функцию для добавления задачи
    }
});
//Этот код добавляет слушатель события click к элементу listContainer. Когда пользователь щелкает по элементам 
//в списке, обработчик проверяет, был ли клик на элементе <li> или на элементе <span>. 
//В зависимости от этого он либо переключает класс "checked" для отметки выполнения задачи, либо удаляет задачу.
listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    } else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);

//Функция, чтобы информация при перезагрузке браузера не исчезала

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}

showTask();