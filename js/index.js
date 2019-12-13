function eventListner() {
    let addToDoBtn = document.querySelector('#todo-add');
    addToDoBtn.addEventListener('click', addNewToDoItem);

    //if (document.querySelector('.showCard') == null){
     //   const statusBanner = document.querySelector('.hideCard') 
    //}else{
     //   const statusBanner = document.querySelector('.showCard') 
    //}
    const statusBanner = document.querySelector('.cardHide');

    window.addEventListener('offline', (event) => {
        console.log('offline');
        statusBanner.innerHTML = "You are Offline";
        statusBanner.setAttribute('class','cardShow');
        console.log(statusBanner);
        //statusBanner.classList.remove('cardHide');
        //statusBanner.classList.add('cardShow');
        setTimeout(slideOutStatusCard, 3000);
    });
    
    window.addEventListener('online', (event) => {
        console.log('online');
        statusBanner.innerHTML = "You are Online";
        statusBanner.setAttribute('class','cardShow');
        console.log(statusBanner);
        //statusBanner.classList.remove('cardHide');
        //statusBanner.classList.add('cardShow');
        setTimeout(slideOutStatusCard, 3000);

    });
}

function slideOutStatusCard(){
/*     if (document.querySelector('.showCard') == null){
        const statusBanner = document.querySelector('.cardHide') 
        statusBanner.classList.toggle('cardShow');
    }else{
        const statusBanner = document.querySelector('.showCard') 
        statusBanner.setAttribute('class','.cardHide');
    } */
    const statusBanner = document.querySelector('.cardShow');

    //statusBanner.classList.remove('cardshow');
    statusBanner.setAttribute('class','cardHide');
    //statusBanner.classList.add('cardHide');
    statusBanner.innerHTML =" ";
    console.log(statusBanner);
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
        editButton.setAttribute("onClick", "editBtnClick('"+ todoID +"',event);");
        //editButton.setAttribute('id', todoID);

        //label.parentElement.parentElement.setAttribute("class","new");
        label.parentElement.classList.add('new');
        //input.setAttribute('checked',false);

        label.textContent = value;

        list.appendChild(item);

        const ls = window.localStorage;
        const saveItem = new XMLSerializer().serializeToString(document.getElementById(todoID).parentNode.parentNode);
        //console.log(saveItem);
        ls.setItem(todoID, saveItem);

        setTimeout(function() {
         //   newLI.className = newLI.className + " show";
            ls.className = ls.className + " show";
          }, 10);
    }
    todo.value = '';
}

function rmvBtnClick(rmbtnID,event) {
    event.preventDefault();
    console.log(rmbtnID)
    window.localStorage.removeItem(rmbtnID);
    // document.getElementById(rmbtnID).parentElement.addClass('removed-item')
    // .one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
    document.getElementById(rmbtnID).parentElement.parentElement.remove();
    //  });
}

function editBtnClick(editbtnID,event) {
    //alert("Confirm to edit selected items");
    //console.log(editbtnID.id);
    console.log(editbtnID);
    //var listItem = this.parentNode;
    const listitem = document.getElementById(editbtnID);
    
    const test = listitem.parentElement.parentElement.firstElementChild.innerText;
   // listitem.parentElement.parentElement.firstElementChild.innerText = "";
    console.log(listitem);
    console.log(test);
    document.getElementById(editbtnID).setAttribute('type','text');
    document.getElementById(editbtnID).setAttribute('value',test);

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