const input = document.getElementById("input");
const btn_add = document.getElementById("btn_add");
const list = document.getElementById("list");

let toDosArr = [
  {
    id: 0,
    desc: "default",
    flag: "open",
  },

  {
    id: 1,
    desc: "2",
    flag: "open",
  },

  {
    id: 2,
    desc: "3",
    flag: "open",
  },
];

let toDoArrSize = toDosArr.length;
input.value = "TestValue";

// const addli = document.createElement("li");
// addli.appendChild(document.createTextNode("TEXT"));
// list.appendChild(addli);

//!!!ACTIVE BUTTONS über url WINDOW.LOCATION

function writeList() {
  for (const key in toDosArr) {
    const new_checkbox = document.createElement("input");
    new_checkbox.type = "checkbox";
    new_checkbox.id = key;

    list.appendChild(document.createElement("li"));
    list.append(new_checkbox);
    list.appendChild(document.createTextNode(toDosArr[key].desc));
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

  //create new ToDoObj
  let todo = {
    id: toDoArrSize,
    desc: input.value,
    flag: "open",
  };

  //cut Whitespaces off
  if (todo.desc[todo.desc.length - 1] == " " || todo.desc[0] == " ") {
    todo.desc = todo.desc.trim();
  }
  //sync the inputfiel
  input.value = todo.desc.trim();

  //put new todo to List
  toDosArr[toDoArrSize] = todo;
  toDoArrSize += 1;
  console.log(toDosArr); //!!!!!!!!!!!!!!!!!!!!!!!!!löschen
  render();
});

console.log(toDosArr); //!!!!!!!!!!!!!!!!!!!!!!!!!löschen
//initial RENDER
render();
