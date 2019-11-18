function eventListner() {
    let addToDoBtn = document.querySelector('#todo-add');
    addToDoBtn.addEventListener('click', addNewToDoItem);

   /*  let removeToDobtn = document.querySelector('#todo-remove');
    removeToDobtn.addEventListener('click', removeToDo); */
}

function addNewToDoItem(event) {
    event.preventDefault();

    const todo = document.querySelector('#todo-label');
    const value = todo.value.trim();

    if (value.length > 0) {
        const todoID = `todo-select-${(getRandomNumber(Math.floor(Math.random() * 10), Math.floor(Math.random() * 99)) + Math.random().toString(20).substr(3, 4).toUpperCase())}`;
        const template = document.querySelector('#todo-item');
        const item = document.importNode(template.content, true);
        const label = item.querySelector('label[for]');
        const input = item.querySelector('#todo-select');
        const list = document.querySelector('#todo-list');

        input.setAttribute('id', todoID);
        label.setAttribute('for', todoID);

        label.textContent = value;

        list.appendChild(item);
    }
    todo.value = '';
}

function rmvBtnClick() {
    const template = document.querySelector('#todo-item');
    var list = document.querySelector('#todo-list');
    //const item = document.importNode(template.content, true);
    var inputs = list.getElementsByTagName("input");

    for (var i = 0, len = inputs.length; i < len; i++) {
        if (inputs[i].checked) {
            const item = document.importNode(template.content, true);
            var input = item.getElementById(inputs[i].id);
            input.setAttribute('id', inputs[i].id);
            label.setAttribute('for', inputs[i].id);
            // console.log(inputs[i]);
            //console.log(list.childNodes[i]);
            //console.log(item);

            //alert(inputs[i].id);
            list.removeChild(item);
        }
    }
}

function getRandomNumber(lowNum, highNum) {
    var rnum = Math.floor(Math.random() * (highNum - lowNum + 1)) + lowNum;
    return rnum;
}


eventListner();