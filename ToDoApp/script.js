const input = document.getElementById("input");
const btn_add = document.getElementById("btn_add");
const list = document.getElementById("list");

let toDoArr = {
  0: "default",
  1: "zwei",
  2: "drei",
  3: "vier",
};
let toDoArrSize = Object.getOwnPropertyNames(toDoArr).length;
input.value = "TestValue";

// const addli = document.createElement("li");
// addli.appendChild(document.createTextNode("TEXT"));
// list.appendChild(addli);

//!!!!!!!!!!ADD checkboxes!!!!!!!!!

function writeList() {
  for (const key in toDoArr) {
    const new_checkbox = document.createElement("input");
    new_checkbox.type = "checkbox";
    new_checkbox.id = key;
    new_checkbox.style.marginRight = "2rem";

    console.log(key);
    list.appendChild(document.createElement("li"));
    list.appendChild(new_checkbox);
    list.appendChild(document.createTextNode(toDoArr[key]));
  }
}

function render() {
  list.innerText = "";
  writeList();
}

btn_add.addEventListener("click", () => {
  if (input.value == "") {
    return console.warn("NO INPUT");
  }

  let todo = "";
  todo = input.value;
  //cut Whitespaces off
  while (todo[todo.length - 1] == " ") {
    todo = todo.slice(0, todo.length - 1);
  }
  input.value = todo;

  //put new todo to List
  toDoArr[toDoArrSize] = todo;
  toDoArrSize += 1;

  render();
});

//initial RENDER
render();
