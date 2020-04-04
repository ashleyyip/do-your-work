var monArray;
var tuesArray;
var wedArray;
var thursArray;
var friArray;

var allLists = [monArray, tuesArray, wedArray, thursArray, friArray];

window.onload = loadTasks;

function loadTasks() {

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
  generateCloseButton();

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



// strikethrough the text when list item is clicked
function strikethroughTask() {
  var tasks = document.getElementsByClassName("listText");
  for (let i = 0; i < tasks.length; i++) {
    tasks[i].onclick = function() {
      tasks[i].parentElement.classList.toggle('checked');
      var dayID = this.parentElement.parentElement.id;
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
        if (dayArray.tasks[i].taskDescription === this.textContent) { 
          dayArray.tasks[i].strikethrough = !(dayArray.tasks[i].strikethrough);
        }
      }

      updateAdd(dayArray.tasks, dayID);

    }
  }
}

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
  var inputValue = document.getElementById(dayOfWeekToDoList.inputID).value;
  var task = new Task(inputValue);

  if (inputValue !== '')
  {
    console.log(dayOfWeekToDoList.name);
    
    if (dayOfWeekToDoList.tasks != undefined) {
      dayOfWeekToDoList.tasks.push(task);
    }
    else {
      dayOfWeekToDoList.tasks = [task];
    }
  }

  updateAdd(dayOfWeekToDoList.tasks, dayOfWeekToDoList.name);
  newElementView(dayOfWeekToDoList)

  strikethroughTask();
  checkIfClose();
}

// display list elements after loading from chrome.storage
function newElementfromStorage(theUL, inputTask) {
  newElementfromStorageView(theUL, inputTask);

  strikethroughTask();
  checkIfClose();
}

// checks if the x button is clicked on a list item
function checkIfClose() {
  var close = document.getElementsByClassName("close");
  for (let i = 0; i < close.length; i++) {
    close[i].onclick = function() {

      var div = this.parentElement;
      checkIfCloseView(div);

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
      newElementfromStorage(theUL, previousToDos[i]);
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


