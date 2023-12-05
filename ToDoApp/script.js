const input = document.getElementById("input");
const btn_add = document.getElementById("btn_add");
const list = document.getElementById("list");
const btn_rmvdone = document.getElementById("btn_rmvdone");
const radio_all = document.getElementById("radio_all");
const radio_open = document.getElementById("radio_open");
const radio_done = document.getElementById("radio_done");

let toDosArr = [];

//toDosArr = Storage or if Storage= Null use default
toDosArr = JSON.parse(localStorage.getItem("List"));
if (toDosArr == null) {
  toDosArr = [
    {
      id: 0,
      desc: "default",
      done: false,
    },
  ];
}

input.value = "TestValue";

//!!!ACTIVE BUTTONS über url WINDOW.LOCATION
//ADD LABEL Connection for the Checkboxes!!!

function writeList() {
  for (const key in toDosArr) {
    const new_li = document.createElement("li");

    const new_checkbox = document.createElement("input");
    new_checkbox.type = "checkbox";
    new_checkbox.id = key;
    new_checkbox.checked = toDosArr[key].done;

    // CHECK for Dafault!!!
    ///
    /// LABELS BITTE STATT TEXTNODE!!!
    // label
    // const label = document.createElement("label");
    // label.setAttribute("for", `checkbox-${todo.id}`);
    // label.textContent = todo.description;
    ///
    // new_li.appendChild(new_checkbox,label);

    list.appendChild(new_li);
    new_li.appendChild(new_checkbox);
    new_li.appendChild(document.createTextNode(toDosArr[key].desc));

    new_checkbox.addEventListener("change", () => {
      //checkboxesStatus change
      toDosArr[key].done = !toDosArr[key].done;
      //Storage sync
      localStorage.setItem("List", JSON.stringify(toDosArr));
    });
  }
}

function render() {
  list.innerText = "";
  writeList();
}

btn_add.addEventListener("click", () => {
  let dublicat = false;

  input.value = input.value.trim();

  //No Input Warning
  if (input.value == "") {
    input.value = "";
    return console.warn("NO INPUT");
  }

  //Check for Dublicates
  toDosArr.forEach((ToDo) => {
    if (input.value.toUpperCase() == ToDo.desc.toUpperCase()) {
      console.warn("Dublicat");
      dublicat = true;
    }
  });
  if (dublicat == true) {
    return;
  }

  //create new ToDoObj
  let todo = {
    id: toDosArr.length,
    desc: input.value,
    done: false,
  };

  //put new todo to List
  toDosArr[toDosArr.length] = todo;
  console.log(toDosArr); //!!!!!!!!!!!!!!!!!!!!!!!!!löschen

  localStorage.setItem("List", JSON.stringify(toDosArr));
  render();
});

btn_rmvdone.addEventListener("click", () => {
  toDosArr = toDosArr.filter((e) => e.done == false);
  //ID sync
  for (let index = 0; index < toDosArr.length; index++) {
    toDosArr[index].id = index;
  }
  //Storage sync
  localStorage.setItem("List", JSON.stringify(toDosArr));
  render();
});

console.log(toDosArr);
// console.log(toDosArr.filter((e) => e.done == false));

//initial RENDER
render();
