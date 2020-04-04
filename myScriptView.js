function loadColours() {
    var max = colours.length;
    // generate random palette
    var randomIndex = Math.floor(Math.random() * (max + 1));
    for (let i = 0; i < allLists.length; i++) {
        document.getElementById(allLists[i].boxID).style.backgroundColor =
            '#' + colours[randomIndex][i];
    }

}

// Create a "close" button and append it to each list item
function generateCloseButton() {
    var myNodelist = document.getElementsByTagName("LI");
    for (let i = 0; i < myNodelist.length; i++) {
        var span = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        myNodelist[i].appendChild(span);
    }
}

function newElementView(dayOfWeekToDoList) {
    var inputValue = document.getElementById(dayOfWeekToDoList.inputID).value;

    var li = document.createElement("li");
    var t = document.createTextNode(inputValue);
    var text = document.createElement("div");
    text.className = "listText";
    text.appendChild(t);
    li.appendChild(text);

    if (inputValue !== '') {
        document.getElementById(dayOfWeekToDoList.name).appendChild(li);
    }

    document.getElementById(dayOfWeekToDoList.inputID).value = "";
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);
}

function newElementfromStorageView(theUL, inputTask) {

    var li = document.createElement("li");
    var t = document.createTextNode(inputTask.taskDescription);
  
    var text = document.createElement("div");
    text.className = "listText";
    text.appendChild(t);
    li.appendChild(text);
    
    document.getElementById(theUL).appendChild(li);
  
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);
  
    if (inputTask.strikethrough) {
      li.classList.toggle('checked');
    }
}

function checkIfCloseView(div) {
    div.style.display = "none";
}