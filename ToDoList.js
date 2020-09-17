function appendText() {
  //adds elements
  var array = new Array();
  console.log(array);
  var txt1 = document.getElementById("insert").value;
  console.log(txt1);
  $(document).ready(function () {
    if (txt1.indexOf("=") != -1) {
      //checks if the format is right [note: didnot use .includes because internet explorer do not support it]
      //txt1 = txt1.replace(" ", ""); //replaces any spaces from userinput
      array.push(txt1); //collects the items in an array for using it in the sortbytask/sortbydate functions

      console.log(array); //It was added for debugging

      $("#select").append("<li>" + txt1 + "</li>"); //adds the items
    } else {
      alert(
        "Please enter text in the format 'task=date(must be numeric)' eg. gardening=3"
      ); //alerts user about the wrong formatting if any
    }
  });
}

function sortbytask() {
  var i;
  var array = new Array();
  var array_init = new Array();
  var hashtable = {};
  var div = document.getElementById("select");
  console.log(div.childNodes[0].textContent);
  for (i = 0; i < div.childNodes.length; i++) {
    if (div.childNodes[i].value != null) {
      array.push(div.childNodes[i].textContent);
    }
  }
  console.log("HEEEE");
  console.log(array);
  //sorts by task which is the first part of the pair

  for (var s in array) {
    var key = array[s].substr(0, array[s].indexOf("="));
    var value = array[s].substr(array[s].indexOf("=") + 1, array[s].length);
    console.log(key);
    console.log(value);
    if (hashtable[key] == null) {
      console.log("here");
      var arr = new Array();
      arr.push(value);
      hashtable[key] = arr;
      array_init.push(key);
    } else {
      hashtable[key].push(value);
    }
  }
  array_init.sort();
  $("#select").empty(); //clears the content first before showing the newly sorted list
  for (i = 0; i < array_init.length; i++) {
    //for loop is used to add all the items to the list
    var v = hashtable[array_init[i]].toString().split(",");
    for (var k in v) {
      if (array_init[i] != null && v[k] != null) {
        var result = array_init[i] + "=" + v[k];
        $("#select").append("<li>" + result + "</li>");
      }
    }
  }
}

function sortbydate() {
  var i;
  var array = new Array();
  var array_init = new Array();
  var hashtable = {};
  var div = document.getElementById("select");

  // console.log(div.childNodes[0].textContent);
  for (i = 0; i < div.childNodes.length; i++) {
    if (div.childNodes[i].value != null) {
      array.push(div.childNodes[i].textContent);
    }
  }
  console.log("HBBBBB");
  console.log(array);
  for (var s in array) {
    var value = array[s].substr(0, array[s].indexOf("="));
    var key = array[s].substr(array[s].indexOf("=") + 1, array[s].length);
    console.log(key);
    console.log(value);
    if (hashtable[key] == null) {
      console.log("here");
      var arr = new Array();
      arr.push(value);
      hashtable[key] = arr;
      array_init.push(key);
    } else {
      hashtable[key].push(value);
    }
  }
  array_init.sort(function (a, b) {
    return a - b;
  });
  $("#select").empty(); //clears the content first before showing the newly sorted list
  for (i = 0; i < array_init.length; i++) {
    //for loop is used to add all the items to the list
    var v = hashtable[array_init[i]].toString().split(",");
    for (var k in v) {
      if (array_init[i] != null && v[k] != null) {
        var result = array_init[i] + "=" + v[k];
        $("#select").append("<li>" + result + "</li>");
      }
    }
  }
}

function edit() {
  var i;
  var div = document.getElementById("select"); //get the objects
  for (i = 0; i < div.childNodes.length; i++) {
    //the for loop iterates through thr childNodes
    var classname = div.childNodes[i].className;
    var values = div.childNodes[i].textContent;
    // var index = array.indexOf(values);
    if (classname == "ui-selectee ui-selected") {
      var new_value = prompt("Enter the new value");
      if (new_value.indexOf("=") != -1) {
        var new_node = document.createElement("li");
        var new_nodevalue = document.createTextNode(new_value);
        new_node.appendChild(new_nodevalue);
        document
          .getElementById("select")
          .replaceChild(new_node, div.childNodes[i]);
      } else {
        alert(
          "Please enter text in the format 'task=date(must be numeric)' eg. gardening=3"
        ); //alerts user about the wrong formatting if any
      }
    }
  }
}

function deletelist() {
  //to slect more than one item do Ctrl+select

  var i;
  var div = document.getElementById("select"); //get the objects
  for (i = 0; i < div.childNodes.length; i++) {
    //the for loop iterates through thr childNodes
    var classname = div.childNodes[i].className;
    if (classname == "ui-selectee ui-selected") {
      //check which item is selected by the user
      // note : div.childNodes[i].remove() does not work with internet explorer
      div.removeChild(div.childNodes[i]); //the slected items are removed only
      //i = i - 1; //since the items are removed the list is getting smaller by 1 each time so the index needs to be reduced by 1
      //remove the deleted items from the array, it is necessary because the sortsbytask and date are using this array
    }
  }
}

function tip() {
  alert("To select more than one items use: 'CTRL+select'");
}

function showXML() {
  var i;
  var xml = "<list>";
  $(document).ready(function () {
    var div = document.getElementById("select");
    for (i = 0; i < div.childNodes.length; i++) {
      //the for loop iterates through the list and add them to the xml text to show to users
      xml =
        xml + "<task-date>" + div.childNodes[i].textContent + "</task-date>";
    }
    xml = xml + "</list>";
    alert(xml);
  });
}
