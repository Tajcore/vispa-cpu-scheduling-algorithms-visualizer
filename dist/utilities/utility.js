import { fcfs_Draw, fcfc_CalcTime } from "../algorithms/fcfs.js";
import { sjf_Draw, sjf_CalcTime } from "../algorithms/sjf.js";
import { priority_Draw, priority_CalcTime } from "../algorithms/priority.js";
import { robin_Draw, robin_CalcTime } from "../algorithms/roundrobin.js";

// Calculates the Service Time based on the selected Algorithm
export const recalculateServiceTime = () => {
  var inputTable = $("#inputTable tr");
  var totalExectuteTime = 0;

  var algorithm = $("input[name=algorithm]:checked", "#algorithm").val();
  if (algorithm == "fcfs") {
    fcfc_CalcTime(inputTable, totalExectuteTime);
  } else if (algorithm == "sjf") {
    sjf_CalcTime(inputTable, totalExectuteTime);
  } else if (algorithm == "priority") {
    priority_CalcTime(inputTable, totalExectuteTime);
  } else if (algorithm == "robin") {
    robin_CalcTime(inputTable,totalExectuteTime)
  }
};

// Determines which process is next in priority
export const findNextIndexWithPriority = (currentIndex, priorities) => {
  var currentPriority = 1000000;
  if (currentIndex != -1) currentPriority = priorities[currentIndex];
  var resultPriority = 0;
  var resultIndex = -1;
  var samePriority = false;
  var areWeThereYet = false;

  $.each(priorities, function (key, value) {
    var changeInThisIteration = false;

    if (key == currentIndex) {
      areWeThereYet = true;
      return true;
    }
    if (value <= currentPriority && value >= resultPriority) {
      if (value == resultPriority) {
        if (currentPriority == value && !samePriority) {
          samePriority = true;
          changeInThisIteration = true;
          resultPriority = value;
          resultIndex = key;
        }
      } else if (value == currentPriority) {
        if (areWeThereYet) {
          samePriority = true;
          areWeThereYet = false;
          changeInThisIteration = true;
          resultPriority = value;
          resultIndex = key;
        }
      } else {
        resultPriority = value;
        resultIndex = key;
      }

      if (value > resultPriority && !changeInThisIteration)
        samePriority = false;
    }
  });
  return resultIndex;
};

// Determines the next process
export const findNextIndex = (currentIndex, array) => {
  var currentTime = 0;
  if (currentIndex != -1) currentTime = array[currentIndex];
  var resultTime = 1000000;
  var resultIndex = -1;
  var sameTime = false;
  var areWeThereYet = false;

  $.each(array, function (key, value) {
    var changeInThisIteration = false;

    if (key == currentIndex) {
      areWeThereYet = true;
      return true;
    }
    if (value >= currentTime && value <= resultTime) {
      if (value == resultTime) {
        if (currentTime == value && !sameTime) {
          sameTime = true;
          changeInThisIteration = true;
          resultTime = value;
          resultIndex = key;
        }
      } else if (value == currentTime) {
        if (areWeThereYet) {
          sameTime = true;
          areWeThereYet = false;
          changeInThisIteration = true;
          resultTime = value;
          resultIndex = key;
        }
      } else {
        resultTime = value;
        resultIndex = key;
      }

      if (value < resultTime && !changeInThisIteration) sameTime = false;
    }
  });
  return resultIndex;
}

// Draws the canvas of the result table with the revealing curtain
export const draw = () => {
  $("fresh").html("");
  var inputTable = $("#inputTable tr");
  var th = "";
  var td = "";

  var algorithm = $("input[name=algorithm]:checked", "#algorithm").val();
  if (algorithm == "fcfs") {
    fcfs_Draw(inputTable, th, td);
  } else if (algorithm == "sjf") {
    sjf_Draw(inputTable, th, td);
  } else if (algorithm == "priority") {
    priority_Draw(inputTable, th, td);
  } else if (algorithm == "robin") {
    robin_Draw(inputTable, th, td);
  }
  animate();
};

// Carries out the animation of the curtain by revealing it over the total service time

export const animate = () => {
  $("fresh").prepend(
    '<div id="curtain" style="position: absolute; right: 50%; width:100%; height:100px;"></div>'
  );

  $("#curtain").width($("#resultTable").width());
  $("#curtain").css({ left: $("#resultTable").position().left });

  var sum = 0;
  $(".exectime").each(function () {
    sum += Number($(this).val());
  });

  console.log($("#resultTable").width());
  var distance = $("#curtain").css("width");

  animationStep(sum, 0);
  jQuery("#curtain").animate(
    { width: "0", marginLeft: distance },
    (sum * 1000) / 2,
    "linear"
  );
};

export const animationStep = (steps, cur) => {
  $("#timer").html(" " + cur + " sec");
  if (cur < steps) {
    setTimeout(function () {
      animationStep(steps, cur + 1);
    }, 500);
  } else {
  }
};

// Adds an additional row in the input table
export const addRow = () => {
  var lastRow = $("#inputTable tr:last");
  var lastRowNumebr = parseInt(lastRow.children()[1].innerText);

  var newRow =
    "<tr><td>P" +
    (lastRowNumebr + 1) +
    "</td><td>" +
    (lastRowNumebr + 1) +
    '</td><td><input class="exectime bg-dark text-white" type="text"/></td><td class="servtime"></td>' +
    '<td class="priority-only"><input class="bg-dark text-white" type="text"/></td></tr>';

  lastRow.after(newRow);

  var minus = $("#minus");
  minus.show();

  if ($("input[name=algorithm]:checked", "#algorithm").val() != "priority")
    $(".priority-only").hide();

  $("#inputTable tr:last input").change(function () {
    recalculateServiceTime();
  });
};

// Removes the last row in the input table
export const deleteRow = () => {
  var numberRows = $("#inputTable tr").length;

  var lastRow = $("#inputTable tr:last");
  lastRow.remove();

  var minus = $("#minus");
  if (numberRows === 3) {
    minus.hide();
  }
};
