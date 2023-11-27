const counter_color = document.getElementById("counter_color_id");
const counter_num = document.getElementById("counter_num_id");

const reset = document.querySelector("button");

let percent = 0;

counter_color.addEventListener("click", function () {
  percent = percent + 1;
  counter_num.innerText = percent;
  counter_color.style.boxShadow =
    "inset " + (((percent - 1) % 100) + 1) + "vw 0 0 0 gold";
});

reset.addEventListener("click", function () {
  percent = 0;
  counter_num.innerText = percent;
  counter_color.style.boxShadow = "inset " + "0px" + " 0 0 0 gold";
});
