const input = document.getElementById("input");
const btn_add = document.getElementById("btn_add");
const list = document.getElementById("list");

let toDoArr = {
  1: "eins",
  2: "zwei",
  3: "drei",
  4: "vier",
};
let toDoArrSize = Object.getOwnPropertyNames(toDoArr).length;
input.value = "TestValue";

// const addli = document.createElement("li");
// addli.appendChild(document.createTextNode("TEXT"));
// list.appendChild(addli);

//!!!!!!!!!!ADD checkboxes!!!!!!!!!
function writeList() {
  for (const key in toDoArr) {
    list
      .appendChild(document.createElement("li"))
      .appendChild(document.createTextNode(toDoArr[key]));

    console.log(toDoArr);
    console.log(toDoArr[key]);
    console.log(input.value);
  }
}

function render() {
  list.innerText = "";
  writeList();
}

btn_add.addEventListener("click", () => {
  toDoArr[toDoArrSize + 1] = input.value;
  toDoArrSize += 1;
  render();
});

//initial RENDER
render();
