var array;
array = new Array();

function appendText() {
  //adds elements
  var txt1 = document.getElementById("insert").value;
  $(document).ready(function () {
    var str = "=";
    if (txt1.indexOf("=") != -1) {
      //checks if the format is right [note: didnot use .includes because internet explorer do not support it]
      //txt1 = txt1.replace(" ", ""); //replaces any spaces from userinput
      array.push(txt1); //collects the items in an array for using it in the sortbytask/sortbydate functions
      console.log(array); //It was added for debugging
      $("#select").append("<li>" + txt1 + "</li>"); //adds the items
    } else {
      alert(
        "Please enter text in the format 'task=date' eg. gardening=3rd Sept"
      ); //alerts user about the wrong formatting if any
    }
  });
}

function sortbytask() {
  //sorts by task which is the first part of the pair
  var i;
  var array_sorted = new Array();
  array_sorted = array.sort(); //sorts the array alphabetically
  console.log(array_sorted); //for debugging
  $("#select").empty(); //clears the content first before showing the newly sorted list
  console.log(array_sorted);
  for (i = 0; i < array_sorted.length; i++) {
    //for loop is used to add all the items to the list
    $("#select").append("<li>" + array_sorted[i] + "</li>");
  }
}

function sortbydate() {
  //sorts by date which the second part of the pair, here the first part is not important for sorting
  var i,
    j = 0;
  var array_value = new Array();
  var array_valuesorted = new Array();
  for (i = 0; i < array.length; i++) {
    var temp_no = array[i].search("="); //find the index where the ('=')/equals to sign exit
    var temp =
      array[i].slice(temp_no + 1, array[i].length) +
      "=" +
      array[i].slice(0, temp_no); //changes the string in the format date=task (oppsite) which will help for sorting
    array_value.push(temp); //a new array is used to added the changed formatted list items
  }
  console.log(array_value);
  array_valuesorted = array_value.sort(); //sorts the items using the date
  console.log("arrvalue: " + array_valuesorted);
  $("#select").empty();
  for (i = 0; i < array_valuesorted.length; i++) {
    //now that the list is sorted by date, the format is changed back to the desired one
    var temp1_no = array_valuesorted[i].search("="); //find the index where the ('=')/equals to sign exit
    var temp1 =
      array_valuesorted[i].slice(temp1_no + 1, array_valuesorted[i].length) +
      "=" +
      array_valuesorted[i].slice(0, temp1_no); //change to the desired format
    $("#select").append("<li>" + temp1 + "</li>"); //add the items sorted by date
  }
}

function edit() {
  var i;
  var div = document.getElementById("select"); //get the objects
  for (i = 0; i < div.childNodes.length; i++) {
    //the for loop iterates through thr childNodes
    var classname = div.childNodes[i].className;
    var values = div.childNodes[i].textContent;
    if (classname == "ui-selectee ui-selected") {
      var new_value = prompt("Enter the new value");
      if (new_value.indexOf("=") != -1) {
        var new_node = document.createElement("li");
        var new_nodevalue = document.createTextNode(new_value);
        new_node.appendChild(new_nodevalue);
        array[i - 1] = new_value; //collects the items in an array for using it in the sortbytask/sortbydate functions
        document
          .getElementById("select")
          .replaceChild(new_node, div.childNodes[i]);
      } else {
        alert(
          "Please enter text in the format 'task=date' eg. gardening=3rd Sept"
        ); //alerts user about the wrong formatting if any
      }
    }
    console.log("here");
  }
}

function deletelist() {
  //to slect more than one item do Ctrl+select

  var i;
  var div = document.getElementById("select"); //get the objects
  for (i = 0; i < div.childNodes.length; i++) {
    //the for loop iterates through thr childNodes
    var classname = div.childNodes[i].className;
    var values = div.childNodes[i].textContent;
    console.log("cname: " + classname);
    console.log("values: " + values);
    if (classname == "ui-selectee ui-selected") {
      //check which item is selected by the user
      // note : div.childNodes[i].remove() does not work with internet explorer
      div.removeChild(div.childNodes[i]); //the slected items are removed only
      i = i - 1; //since the items are removed the list is getting smaller by 1 each time so the index needs to be reduced by 1
      array.splice(array.indexOf(values), 1); //remove the deleted items from the array, it is necessary because the sortsbytask and date are using this array
      console.log("farr: " + array);
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
