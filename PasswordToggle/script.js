const btn = document.querySelector("button");
const input = document.querySelector("input");
let password = "";

btn.addEventListener("click", function () {
  if (btn.innerText == "hide password") {
    //hide pass
    password = input.value;
    let stars = password.length;
    input.value = "*".repeat(stars);
    btn.innerText = "show password";
  } else {
    //show pass
    input.value = password;
    btn.innerText = "hide password";
  }

  // Handle on Input
  input.addEventListener("input", function () {
    password = input.value;
    btn.innerText = "hide password";
  });
});
