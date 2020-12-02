import * as utility from "./utilities/utility.js";

window.onload = () => {
  Particles.init({
    selector: ".background",
    color: "#DA0463",
    connectParticles: true,
  });

  document.querySelector("#minus").addEventListener("click", utility.deleteRow);
  document.querySelector("#add_btn").addEventListener("click", utility.addRow);
  document.querySelector("#draw_btn").addEventListener("click", utility.draw);

  utility.recalculateServiceTime();

  document.querySelectorAll(".priority-only").forEach((box) => {
    box.style.display = "none";
  });

  document.querySelectorAll(".initial").forEach((element) => {
    element.addEventListener("change", () => utility.recalculateServiceTime());
  });

  ready(() => {
    document
      .querySelectorAll("input[type=radio][name=algorithm]")
      .forEach((element) =>
        element.addEventListener("change", function () {
          var algorithm_inputs = document.querySelectorAll(
            "input[type=radio][name=algorithm]"
          );
          algorithm_inputs.forEach((element) => {
            element.addEventListener("change", utility.showDisplay);
          });
        })
      );
  });
};

var ready = (callback) => {
  if (document.readyState != "loading") callback();
  else document.addEventListener("DOMContentLoaded", callback);
};

