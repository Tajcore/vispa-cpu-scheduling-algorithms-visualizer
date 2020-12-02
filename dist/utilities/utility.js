import { fcfs_Draw, fcfc_CalcTime } from "../algorithms/fcfs.js";
import { sjf_Draw, sjf_CalcTime } from "../algorithms/sjf.js";
import { priority_Draw, priority_CalcTime } from "../algorithms/priority.js";
import { robin_Draw } from "../algorithms/roundrobin.js";

// Display the correct table columns depending on chosen algorithm 
export const showDisplay = (e) => {
  if (e.target.value == "priority") {
    document
      .querySelectorAll(".priority-only")
      .forEach((element) => (element.style.display = ""));
    document
      .querySelectorAll(".servtime")
      .forEach((element) => (element.style.display = ""));
  } else {
    document
      .querySelectorAll(".priority-only")
      .forEach((element) => (element.style.display = "none"));
    document
      .querySelectorAll(".servtime")
      .forEach((element) => (element.style.display = ""));
  }

  if (e.target.value == "robin") {
    document
      .querySelectorAll(".servtime")
      .forEach((element) => (element.style.display = "none"));
    document.querySelector("#quantumParagraph").style.display = "";
  } else {
    document
      .querySelectorAll(".servtime")
      .forEach((element) => (element.style.display = ""));
    document.querySelector("#quantumParagraph").style.display = "none";
  }

  recalculateServiceTime();
};

// Adds an additional row in the input table
export const addRow = () => {
  var rows = document.querySelectorAll("#inputTable tr");
  var lastRow = rows[rows.length - 1];
  var lastRowNumebr = parseInt(lastRow.children[1].textContent);
  var newRow = document.createElement("tr");
  newRow.innerHTML =
    "<td>P" +
    (lastRowNumebr + 1) +
    "</td><td>" +
    (lastRowNumebr + 1) +
    '</td><td><input class="exectime bg-dark text-white" type="text"/></td><td class="servtime"></td>' +
    '<td class="priority-only"><input class="bg-dark text-white" type="text"/></td>';

  lastRow.insertAdjacentElement("afterend", newRow);

  var minus = document.querySelector("#minus");
  minus.style.display = "";

  var algorithm = document.querySelector(
    "input[name=algorithm]:checked",
    "#algorithm"
  ).value;
  if (algorithm != "priority") {
    document.querySelectorAll(".priority-only").forEach((value) => {
      value.style.display = "none";
    });
  }

  var inputs = document.querySelectorAll("#inputTable tr");

  $("#inputTable tr:last input").change(function () {
    recalculateServiceTime();
  });
};

// Removes the last row in the input table
export const deleteRow = () => {
  var rows = document.querySelectorAll("#inputTable tr");
  var numberRows = rows.length;

  var lastRow = rows[rows.length - 1];
  lastRow.parentNode.removeChild(lastRow);

  var minus = document.querySelector("#minus");
  if (numberRows === 3) {
    minus.style.display = "none";
  }
};

// Calculates the Service Time based on the selected Algorithm
export const recalculateServiceTime = () => {
  var inputTable = document.querySelectorAll("#inputTable tr");
  var sumExecutionTime = 0;

  var algorithm = document.querySelector(
    "input[name=algorithm]:checked",
    "#algorithm"
  ).value;
  if (algorithm == "fcfs") {
    fcfc_CalcTime(inputTable, sumExecutionTime);
  } else if (algorithm == "sjf") {
    sjf_CalcTime(inputTable, sumExecutionTime);
  } else if (algorithm == "priority") {
    priority_CalcTime(inputTable, sumExecutionTime);
  }
};

// Determines which process is next in priority
export const getNextPriority = (currentIndex, priorities) => {
  var currentPriority = Number.MAX_SAFE_INTEGER;
  if (currentIndex != -1) {
    currentPriority = priorities[currentIndex];
  }
  var resultPriority = 0;
  var resultIndex = -1;
  var samePriority = false;
  var areWeThereYet = false;
  priorities.forEach((value, index) => {
    var changeInThisIteration = false;

    if (index == currentIndex) {
      areWeThereYet = true;
      return true;
    }
    if (value <= currentPriority && value >= resultPriority) {
      if (value == resultPriority) {
        if (currentPriority == value && !samePriority) {
          samePriority = true;
          changeInThisIteration = true;
          resultPriority = value;
          resultIndex = index;
        }
      } else if (value == currentPriority) {
        if (areWeThereYet) {
          samePriority = true;
          areWeThereYet = false;
          changeInThisIteration = true;
          resultPriority = value;
          resultIndex = index;
        }
      } else {
        resultPriority = value;
        resultIndex = index;
      }

      if (value > resultPriority && !changeInThisIteration)
        samePriority = false;
    }
  });

  return resultIndex;
};

// Determines the next process
export const getNextIndex = (currentIndex, array) => {
  var currentTime = 0;
  if (currentIndex != -1) currentTime = array[currentIndex];
  var resultTime = Number.MAX_SAFE_INTEGER;
  var resultIndex = -1;
  var sameTime = false;
  var areWeThereYet = false;

  array.forEach((value, index) => {
    var changeInThisIteration = false;

    if (index == currentIndex) {
      areWeThereYet = true;
      return true;
    }
    if (value >= currentTime && value <= resultTime) {
      if (value == resultTime) {
        if (currentTime == value && !sameTime) {
          sameTime = true;
          changeInThisIteration = true;
          resultTime = value;
          resultIndex = index;
        }
      } else if (value == currentTime) {
        if (areWeThereYet) {
          sameTime = true;
          areWeThereYet = false;
          changeInThisIteration = true;
          resultTime = value;
          resultIndex = index;
        }
      } else {
        resultTime = value;
        resultIndex = index;
      }

      if (value < resultTime && !changeInThisIteration) sameTime = false;
    }
  });

  return resultIndex;
};

// Draws the canvas of the result table with the revealing cover
export const draw = () => {
  document.querySelector("#timeline").innerHTML = "";
  var inputTable = document.querySelectorAll("#inputTable tr");
  var th = "";
  var td = "";

  var algorithm = document.querySelector(
    "input[name=algorithm]:checked",
    "#algorithm"
  ).value;
  if (algorithm == "fcfs") {
    fcfs_Draw(inputTable, th, td);
  } else if (algorithm == "sjf") {
    sjf_Draw(inputTable, th, td);
  } else if (algorithm == "priority") {
    priority_Draw(inputTable, th, td);
  } else if (algorithm == "robin") {
    robin_Draw(inputTable, th, td);
  }
  removeCover();
};

// Carries out the animation of the cover by revealing it over the total service time

export const removeCover = () => {
  // Initialize Cover for Animation
  var timeline = document.querySelector("#timeline");
  var cover = document.createElement("div");
  cover.id = "cover";
  cover.style.position = "absolute";
  cover.style.right = "50%";
  cover.style.height = "100px";

  // Prepends The "Cover" to the Ghantt Table in order to cover it

  timeline.insertBefore(cover, timeline.firstChild);

  var ghanttTable = document.querySelector("#resultTable");
  var ghanttWidth = parseFloat(
    getComputedStyle(ghanttTable, null).width.replace("px", "")
  );

  cover.style.width = ghanttWidth + "px";
  cover.style.left = ghanttTable.style.left;

  var sum = 0;

  var execTimes = document.querySelectorAll(".exectime");
  execTimes.forEach((value, index) => {
    sum += parseInt(value.value);
  });

  var distance = cover.style.height;

  incrementTimer(sum, 0);

  cover.animate(
    { width: [cover.style.width, "0"], marginLeft: distance },
    { duration: (sum * 1000) / 2, easing: "linear" }
  );
  cover.style.width = "0px"
};

// Recursive Function to increment Process Timer By the Total Execution Time
export const incrementTimer = (total, current) => {
  var timer = document.querySelector("#timer");
  timer.innerHTML = current + "s";

  if (current < total) {
    setTimeout(function () {
      incrementTimer(total, current + 1);
    }, 500);
  } else {
  }
};


