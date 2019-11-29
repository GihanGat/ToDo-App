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
        const dltButton = item.querySelector('#todo-remove');
        const editButton = item.querySelector('#todo-edit');

        const list = document.querySelector('#todo-list');

        input.setAttribute('id', todoID);
        label.setAttribute('for', todoID);
        dltButton.setAttribute('id', todoID);
        dltButton.setAttribute("onClick", "rmvBtnClick('"+ todoID +"',event);");
        editButton.setAttribute('id', todoID);

        //input.setAttribute('checked',false);

        label.textContent = value;

        list.appendChild(item);

        const ls = window.localStorage;
        const saveItem = new XMLSerializer().serializeToString(document.getElementById(todoID).parentNode.parentNode);
        //console.log(saveItem);
        ls.setItem(todoID, saveItem);
    }
    todo.value = '';
}

function rmvBtnClick(rmbtnID,event) {
    event.preventDefault();
    alert("Confirm to remove selected items");
    //console.log(rmbtn);
    //alert("A ");
    //var item = document.getElementById(rmbtn.id);
    //console.log(item)
   // item.parentelement.parentelement.removechild(item.queryselector("input"))

   //var id = this.getAttribute('id');
   console.log(rmbtnID)
  // alert("A");
   document.getElementById(rmbtnID).parentElement.parentElement.remove();
  // alert("B");
   window.localStorage.removeItem(rmbtnID);

    //var listItem=rmbtn.parentNode;
    //console.log(listitem)
    //var ul=listItem.parentNode;
    //Remove the parent list item from the ul.
   //ul.removeChild(listItem);

    /*
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
    */
}

function editBtnClick() {
    alert("Confirm to edit selected items");
}

function getRandomNumber(lowNum, highNum) {
    var rnum = Math.floor(Math.random() * (highNum - lowNum + 1)) + lowNum;
    return rnum;
}

function updateLScontent(checkbox) {
    if (document.getElementById(checkbox.id).checked == true) {
        checkbox.setAttribute("checked", true)
    } else {
        //checkbox.setAttribute("checked",false)
        checkbox.removeAttribute("checked")
    }
    // console.log(checkbox);
    const itemString = new XMLSerializer().serializeToString(checkbox.parentNode.parentNode);
    //console.log(itemString);
    window.localStorage.setItem(checkbox.id, itemString);
}

function refreshFromLS() {
    const db = window.localStorage;
    const list = document.querySelector('#todo-list');
    Object.keys(db).forEach((listitem) => {
        //console.log(listitem);
        if (listitem.indexOf("todo-select") >= 0) {
            const newListitem = db.getItem(listitem);
            //console.log(newListitem);
            const node = document.createRange().createContextualFragment(newListitem);
            list.appendChild(node);
        }
    });
}


eventListner();