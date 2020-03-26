var testArray;

var monArray;
var tuesArray;
var wedArray;
var thursArray;
var friArray;

var allLists = [monArray, tuesArray, wedArray, thursArray, friArray];
var inputList = ["monInput", "tuesInput", "wedInput", "thursInput", "friInput"]; // put into the todolist class
//var butList = ["monBut", "tuesBut", "wedBut", "thursBut", "friBut"];
var boxList = ["monBox", "tuesBox", "wedBox", "thursBox", "friBox"]; // also put into todolist class

window.onload = loadTasks;

function loadTasks() {
  
  console.log(monArray.name);

  chrome.storage.sync.get("monlist", function(data) {
    monArray.tasks = data.monlist;
    console.log("Monday: " + data.monlist);
    reload("monUL", data.monlist); //storing the storage value in a variable and passing to reload function
  });
  chrome.storage.sync.get("tueslist", function(data) {
    tuesArray = data.tueslist;
    console.log("Tuesday: " + data.tueslist);
    reload("tuesUL", data.tueslist); //storing the storage value in a variable and passing to reload function
  });
  chrome.storage.sync.get("wedlist", function(data) {
    wedArray = data.wedlist;
    console.log("Wednesday: " + data.wedlist);
    reload("wedUL", data.wedlist); //storing the storage value in a variable and passing to reload function
  });
  chrome.storage.sync.get("thurslist", function(data) {
    thursArray = data.thurslist;
    console.log("Thursday: " + data.thurslist);
    reload("thursUL", data.thurslist); //storing the storage value in a variable and passing to reload function
  });
  chrome.storage.sync.get("frilist", function(data) {
    friArray = data.frilist;
    console.log("Friday: " + data.frilist);
    reload("friUL", data.frilist); //storing the storage value in a variable and passing to reload function
  });

  loadColours();

}

for (let i = 0; i < allLists.length; i++) {
  if (monArray == undefined) {
    monArray = new ToDoList("monUL");
    tuesArray = new ToDoList("tuesUL");
    wedArray = new ToDoList("wedUL");
    thursArray = new ToDoList("thursUL");
    friArray = new ToDoList("friUL");
  }

  addToList (inputList[i], allLists[i]); // allLists is an array of ToDoList classes
}

function loadColours() {
  var max = colours.length;
  // generate random palette
  var randomIndex = Math.floor(Math.random() * (max + 1));
  for (let i = 0; i < boxList.length; i++) {
    document.getElementById(boxList[i]).style.backgroundColor =
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
function addToList(input, dayOfWeekToDoList) {

  console.log("addToList");
  try {
    document.getElementById(input).addEventListener("keydown", function(e) // fix if null
    {
      if (!e)
      {
        var e = window.event;
      }
      if (e.keyCode == 13)
      {
        newElement(input, dayOfWeekToDoList);
        e.preventDefault();
      }
    }, false);
    
  } catch (error) {
    // console.log(error);
  }
}


// Create a new list item when clicking on the enter key
function newElement(theInput, dayOfWeekToDoList) {
  var li = document.createElement("li");
  var inputValue = document.getElementById(theInput).value;
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
  document.getElementById(theInput).value = "";

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
  // switch (theUL) {
  //   case "monUL":
  //   testArray = monArray;
  //   break;
  //   case "tuesUL":
  //   testArray = tuesArray;
  //   break;
  //   case "wedUL":
  //   testArray = wedArray;
  //   break;
  //   case "thursUL":
  //   testArray = thursArray;
  //   break;
  //   case "friUL":
  //   testArray = friArray;
  //   break;

  // }
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
      var text = div.textContent;
      var dayID = div.parentElement.id;
      switch (dayID) {
        case "monUL":        
        testArray = monArray;
        break;
        case "tuesUL":
        testArray = tuesArray;
        break;
        case "wedUL":
        testArray = wedArray;
        break;
        case "thursUL":
        testArray = thursArray;
        break;
        case "friUL":
        testArray = friArray;
        break;
      }

      for (let i = 0; i < testArray.tasks.length; i++){
        if (testArray.tasks[i] === thingToRemove) {
          testArray.tasks.splice(i, 1);
        }
      }

      updateAdd(testArray.tasks, dayID);

      // remove element from list
      // store elements in chrome storage
      // updateRemove(testArray, text.substring(0, text.length-1), dayID);
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
  switch (key) {
    case "monUL":
    chrome.storage.sync.set({"monlist": array}, function() {
      console.log(array);
    });
    break;
    case "tuesUL":
    chrome.storage.sync.set({"tueslist": array}, function() {
      console.log(array);
    });
    break;
    case "wedUL":
    chrome.storage.sync.set({"wedlist": array}, function() {
      console.log(array);
    });
    break;
    case "thursUL":
    chrome.storage.sync.set({"thurslist": array}, function() {
      console.log(array);
    });
    break;
    case "friUL":
    chrome.storage.sync.set({"frilist": array}, function() {
      console.log(array);
    });
  }
  //then call the set to update with modified value

}

// updates the array in storage when current list item is removed
function updateRemove(array, thingToRemove, theUL) {
  console.log(thingToRemove);
  for (let i = 0; i < array.length; i++){
    if (array[i] === thingToRemove) {
      array.splice(i, 1);
    }
  }
  switch (theUL) {
    case "monUL":
    chrome.storage.sync.set({"monlist": array}, function() {
      console.log(array);
    });
    break;
    case "tuesUL":
    chrome.storage.sync.set({"tueslist": array}, function() {
      console.log(array);
    });
    break;
    case "wedUL":
    chrome.storage.sync.set({"wedlist": array}, function() {
      console.log(array);
    });
    break;
    case "thursUL":
    chrome.storage.sync.set({"thurslist": array}, function() {
      console.log(array);
    });
    break;
    case "friUL":
    chrome.storage.sync.set({"frilist": array}, function() {
      console.log(array);
    });
    break;
  }

}

