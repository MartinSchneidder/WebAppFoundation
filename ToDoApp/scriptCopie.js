const input = document.getElementById("input");
const btn_add = document.getElementById("btn_add");
const list = document.getElementById("list");
const btn_rmvdone = document.getElementById("btn_rmvdone");

const radio = document.querySelectorAll("input[type=radio");
const radio_all = document.getElementById("radio_all");
const radio_open = document.getElementById("radio_open");
const radio_done = document.getElementById("radio_done");

let toDosArr = [];
let filterdArr = [];
//toDosArr = Storage or if Storage= Null use default
toDosArr = JSON.parse(localStorage.getItem("List"));

if (toDosArr.length == 0 || toDosArr == null) {
  toDosArr = [
    {
      id: 0,
      desc: "default",
      done_status: false,
    },
  ];
}
filterdArr = toDosArr;

function writeList() {
  for (const key in filterdArr) {
    const new_li = document.createElement("li");

    const new_checkbox = document.createElement("input");
    new_checkbox.type = "checkbox";
    new_checkbox.id = key;
    new_checkbox.checked = filterdArr[key].done_status;

    list.appendChild(new_li);
    new_li.appendChild(new_checkbox);
    new_li.appendChild(document.createTextNode(filterdArr[key].desc));

    new_checkbox.addEventListener("change", () => {
      //checkboxesStatus change
      filterdArr[key].done_status = !filterdArr[key].done_status;
      //Storage sync
      localStorage.setItem("List", JSON.stringify(filterdArr));
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

  //radiobutto reset
  if (radio_done.checked == true) {
    radio_all.checked = true;
  }
  //create new ToDoObj
  let todo = {
    id: toDosArr.length,
    desc: input.value,
    done_status: false,
  };

  //put new todo to List
  toDosArr[toDosArr.length] = todo;
  console.log(toDosArr); //!!!!!!!!!!!!!!!!!!!!!!!!!löschen
  filterdArr = toDosArr;

  localStorage.setItem("List", JSON.stringify(toDosArr));
  render();
});

btn_rmvdone.addEventListener("click", () => {
  radio_all.checked = true;

  toDosArr = toDosArr.filter((e) => e.done_status == false);
  filterdArr = toDosArr;
  //ID sync
  for (let index = 0; index < toDosArr.length; index++) {
    toDosArr[index].id = index;
  }
  //Storage sync
  localStorage.setItem("List", JSON.stringify(toDosArr));
  render();
});

radio.forEach((radioBTN) => {
  radioBTN.addEventListener("click", () => {
    console.log(radioBTN.id);
    switch (radioBTN.id) {
      case "radio_all":
        filterdArr = toDosArr;
        console.log(filterdArr);
        render();
        break;
      case "radio_open":
        filterdArr = toDosArr.filter((e) => e.done_status == false);
        console.log(filterdArr);
        render();
        break;
      case "radio_done":
        filterdArr = toDosArr.filter((e) => e.done_status == true);
        console.log(filterdArr);
        render();
        break;

      default:
        filterdArr = toDosArr;
        console.log(filterdArr);
        render();
        break;
    }
  });
});

function ArrState() {
  return;
}

//initial RENDER
render();

//!!!ACTIVE BUTTONS über url WINDOW.LOCATION

/// LABELS BITTE STATT TEXTNODE!!!
// label
// const label = document.createElement("label");
// label.setAttribute("for", `checkbox-${todo.id}`);
// label.textContent = todo.description;
///
// new_li.appendChild(new_checkbox,label);

//PROBLEM WITH ID ZUWEISUNG ->filter does not work -> Workaround with array
