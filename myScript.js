var monArray;
var tuesArray;
var wedArray;
var thursArray;
var friArray;

var allLists = [monArray, tuesArray, wedArray, thursArray, friArray];
//var butList = ["monBut", "tuesBut", "wedBut", "thursBut", "friBut"];

window.onload = loadTasks;

function loadTasks() {
  
  console.log(monArray.name);

  chrome.storage.sync.get("monlist", function(data) {
    monArray.tasks = data.monlist;
    console.log("Monday loading storage: " + data.monlist);
    reload("monUL", data.monlist); //storing the storage value in a variable and passing to reload function
  });
  chrome.storage.sync.get("tueslist", function(data) {
    tuesArray.tasks = data.tueslist;
    console.log("Tuesday: " + data.tueslist);
    reload("tuesUL", data.tueslist); //storing the storage value in a variable and passing to reload function
  });
  chrome.storage.sync.get("wedlist", function(data) {
    wedArray.tasks = data.wedlist;
    console.log("Wednesday: " + data.wedlist);
    reload("wedUL", data.wedlist); //storing the storage value in a variable and passing to reload function
  });
  chrome.storage.sync.get("thurslist", function(data) {
    thursArray.tasks = data.thurslist;
    console.log("Thursday: " + data.thurslist);
    reload("thursUL", data.thurslist); //storing the storage value in a variable and passing to reload function
  });
  chrome.storage.sync.get("frilist", function(data) {
    friArray.tasks = data.frilist;
    console.log("Friday: " + data.frilist);
    reload("friUL", data.frilist); //storing the storage value in a variable and passing to reload function
  });

  loadColours();

}

for (let i = 0; i < allLists.length; i++) {
  if (monArray == undefined) {
    monArray = new ToDoList("mon");
    tuesArray = new ToDoList("tues");
    wedArray = new ToDoList("wed");
    thursArray = new ToDoList("thurs");
    friArray = new ToDoList("fri");
  }

  addToList(allLists[i]); // allLists is an array of ToDoList classes
}

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
var myNodelist = document.getElementsByTagName("LI");
for (let i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
for (let i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// strikethrough the text when list item is clicked
// var j;
// for (j = 0; j < ulList.length; j++) {
//   var day = document.getElementById(ulList[j]);
//   console.log(day);
//   if (day !== null) {
//     day.addEventListener('click', function(ev) {
//       if (ev.target.tagName === 'LI') {
//         ev.target.classList.toggle('checked');
//       }
//     }, false);

//   }

// }

// add input text to the to-do list
function addToList(dayOfWeekToDoList) {

  console.log("addToList");
  try {
    document.getElementById(dayOfWeekToDoList.inputID).addEventListener("keydown", function(e) // fix if null
    {
      if (!e)
      {
        var e = window.event;
      }
      if (e.keyCode == 13)
      {
        newElement(dayOfWeekToDoList);
        e.preventDefault();
      }
    }, false);
    
  } catch (error) {
    // console.log(error);
  }
}


// Create a new list item when clicking on the enter key
function newElement(dayOfWeekToDoList) {
  var li = document.createElement("li");
  var inputValue = document.getElementById(dayOfWeekToDoList.inputID).value;
  var t = document.createTextNode(inputValue);
  var text = document.createElement("div");
  text.className = "listText";
  text.appendChild(t);
  li.appendChild(text);

  var task = new Task(inputValue);

  if (inputValue !== '')
  {
    console.log(dayOfWeekToDoList.name);
    document.getElementById(dayOfWeekToDoList.name).appendChild(li);
    
    if (dayOfWeekToDoList.tasks != undefined) {
      dayOfWeekToDoList.tasks.push(task);
    }
    else {
      dayOfWeekToDoList.tasks = [task];
    }
    
  }
  document.getElementById(dayOfWeekToDoList.inputID).value = "";

  updateAdd(dayOfWeekToDoList.tasks, dayOfWeekToDoList.name);

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  checkIfClose();
}

// display list elements after loading from chrome.storage
function newElementfromStorage(theUL, inputValue) {
  var li = document.createElement("li");
  var t = document.createTextNode(inputValue);

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

  checkIfClose();
}

// checks if the x button is clicked on a list item
function checkIfClose() {
  for (let i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      //console.log(this.parentElement.parentElement.id);
      //console.log(this.parentElement.textContent);
      var div = this.parentElement;
      div.style.display = "none";
      var thingToRemove = div.textContent.substring(0, div.textContent.length-1);
      var dayID = div.parentElement.id;
      var dayArray;
      switch (dayID) {
        case "monUL":        
        dayArray = monArray;
        break;
        case "tuesUL":
        dayArray = tuesArray;
        break;
        case "wedUL":
        dayArray = wedArray;
        break;
        case "thursUL":
        dayArray = thursArray;
        break;
        case "friUL":
        dayArray = friArray;
        break;
      }

      for (let i = 0; i < dayArray.tasks.length; i++){
        if (dayArray.tasks[i].taskDescription === thingToRemove) {
          dayArray.tasks.splice(i, 1);
        }
      }

      updateAdd(dayArray.tasks, dayID);
      
    }
  }
}


function reload(theUL, previousToDos) {
  console.log(theUL);
  if (previousToDos != undefined) {
    for (let i = 0; i < previousToDos.length; i++) {
      newElementfromStorage(theUL, previousToDos[i].taskDescription);
    }
  }
}

// updates the array that gets put in storage when new list item is added
function updateAdd(array, key) {
  // chrome.storage.sync.set({key: array}, function() {
  //   console.log(array);
  // });
  switch (key) {
    case "monUL":
    chrome.storage.sync.set({"monlist": array}, function() {});
    break;
    case "tuesUL":
    chrome.storage.sync.set({"tueslist": array}, function() {});
    break;
    case "wedUL":
    chrome.storage.sync.set({"wedlist": array}, function() {});
    break;
    case "thursUL":
    chrome.storage.sync.set({"thurslist": array}, function() {});
    break;
    case "friUL":
    chrome.storage.sync.set({"frilist": array}, function() {});
  }

  console.log("stored " + array + " in " + key);
  //then call the set to update with modified value

}


