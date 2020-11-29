import * as utility from './utilities/utility.js';

window.onload = () => {
  Particles.init({
    selector: ".background",
    color: "#DA0463",
    connectParticles: true,
  });
  $("#minus").click(utility.deleteRow);
  $("#add_btn").click(utility.addRow);
  $("#draw_btn").click(utility.draw);

};

utility.recalculateServiceTime();
document.querySelectorAll(".priority-only").forEach((box) => {
  box.style.display = "none";
});

// Utilities

var ready = (callback) => {
  if (document.readyState != "loading") callback();
  else document.addEventListener("DOMContentLoaded", callback);
};


ready(() => {
  document
    .querySelectorAll("input[type=radio][name=algorithm]")
    .forEach((element) =>
      element.addEventListener("change", function () {
        $("input[type=radio][name=algorithm]").change(function () {
          if (this.value == "priority") {
            $(".priority-only").show();
            $(".servtime").show();
          } else {
            $(".priority-only").hide();
            $(".servtime").show();
          }

          if (this.value == "robin") {
            $(".servtime").hide();
            $("#quantumParagraph").show();
          } else {
            $("#quantumParagraph").hide();
            $(".servtime").show();
          }

          utility.recalculateServiceTime();
        });
      })
    );
});



$(".initial").change(function () {
  utility.recalculateServiceTime();
});





