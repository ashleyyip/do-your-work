function myList(day) { // essentially the myList class
 
  this.name = day;
  this.tasks = [];
  this.strikethrough = [];
  console.log("created");
}

var testArray;

var monArray = new myList("mon");
var tuesArray = new myList("tues");
var wedArray = new myList("wed");
var thursArray = new myList("thurs");
var friArray = new myList("fri");

var inputList = ["monInput", "tuesInput", "wedInput", "thursInput", "friInput"];
var ulList = ["monUL", "tuesUL", "wedUL", "thursUL", "friUL"];
//var butList = ["monBut", "tuesBut", "wedBut", "thursBut", "friBut"];
var boxList = ["monBox", "tuesBox", "wedBox", "thursBox", "friBox"];


window.onload = loadTasks;

function loadTasks() {
  chrome.storage.sync.get("monlist", function(data) {
    monArray = data.monlist;
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
var j;
for (j = 0; j < ulList.length; j++) {
  var day = document.getElementById(ulList[j]);
  console.log(day);
  if (day !== null) {
    day.addEventListener('click', function(ev) {
      if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
      }
    }, false);

  }

}


for (let i = 0; i < inputList.length; i++) {
  addToList (inputList[i], ulList[i]);
}

// add input text to the to-do list
function addToList(input, ul) {
  document.getElementById(input).addEventListener("keydown", function(e)
  {
    if (!e)
    {
      var e = window.event;
    }
    if (e.keyCode == 13)
    {
      newElement(input, ul);
      e.preventDefault();
    }
  }, false);

}




// Create a new list item when clicking on the "Add" button or enter key
function newElement(theInput, theUL) {
  var li = document.createElement("li");
  var inputValue = document.getElementById(theInput).value;
  var t = document.createTextNode(inputValue);
  var text = document.createElement("div");
  text.className = "listText";

   text.appendChild(t);

   li.appendChild(text);

  if (inputValue !== '')
  {
    document.getElementById(theUL).appendChild(li);
  }
  document.getElementById(theInput).value = "";

  switch (theUL)
  {
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
  //console.log(testArray);
  if (testArray === undefined) {
    testArray = [];
  }
  console.log(theUL);
  updateAdd(testArray, inputValue, theUL);

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
  switch (theUL) {
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

      updateRemove(testArray, text.substring(0, text.length-1), dayID);
    }

  }
}


function reload(theUL, previousToDos) {
  // console.log(theUL);
  for (let i = 0; i < previousToDos.length; i++) {
    newElementfromStorage(theUL, previousToDos[i]);
  }
}

// updates the array that gets put in storage when new list item is added
function updateAdd(array, thingToAdd, theUL) {
  array.push(thingToAdd);
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

