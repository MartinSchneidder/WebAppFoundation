const btn = document.querySelector("button");
const body = document.querySelector("body");

btn.addEventListener("click", function () {
  console.log("klicked");
  body.classList.toggle("body_night");
  btn.classList.toggle("btn_night");
});
