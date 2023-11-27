const hexa = document.getElementById("hexa");
const showColor = document.getElementById("showColor");

const red = document.getElementById("red");
const green = document.getElementById("green");
const blue = document.getElementById("blue");
let color = "";

red.addEventListener("oninput", function () {
  showColor.style.background = "#" + red.value;
  console.log(red.value);
});

red.oninput = draw;
green.oninput = draw;
blue.oninput = draw;

function draw() {
  color =
    "#" +
    (Number(red.value).toString(16).length < 2
      ? "0" + Number(red.value).toString(16)
      : Number(red.value).toString(16)) +
    (Number(green.value).toString(16).length < 2
      ? "0" + Number(green.value).toString(16)
      : Number(green.value).toString(16)) +
    (Number(blue.value).toString(16).length < 2
      ? "0" + Number(blue.value).toString(16)
      : Number(blue.value).toString(16));
  showColor.style.background = color;
  hexa.innerText = color;
}
