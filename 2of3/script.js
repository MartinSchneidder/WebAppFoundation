const checkFast = document.getElementById("fast");
const checkCheap = document.getElementById("cheap");
const checkGood = document.getElementById("good");
let lastTouched;

checkFast.addEventListener("change", function () {
  if (numChecked() > 2) {
    lastTouched.checked = false;
  }
  lastTouched = checkFast;
});

checkCheap.addEventListener("change", function () {
  if (numChecked() > 2) {
    lastTouched.checked = false;
  }
  lastTouched = checkCheap;
});

checkGood.addEventListener("change", function () {
  if (numChecked() > 2) {
    lastTouched.checked = false;
  }
  lastTouched = checkGood;
});

function numChecked() {
  let res = 0;
  if (checkFast.checked) {
    res += 1;
  }
  if (checkCheap.checked) {
    res += 1;
  }
  if (checkGood.checked) {
    res += 1;
  }
  return res;
}
