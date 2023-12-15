const input = document.getElementById("input");
const input_form = document.getElementById("form_input");
const btn_add = document.getElementById("btn_add");
const list = document.getElementById("list");
const btn_rmvdone = document.getElementById("btn_rmvdone");

const radio = document.querySelectorAll("input[type=radio");
const radio_all = document.getElementById("radio_all");
const radio_open = document.getElementById("radio_open");
const radio_done = document.getElementById("radio_done");

//**============================   MAIN   ============================**//
const state = {
  filter: "all", //all, open, done
  toDoArr: [],
};

function render() {
  list.innerText = ""; // delete old list

  //Set an filtered Array
  const filtered_toDoArr = state.toDoArr.filter((todo) => {
    switch (state.filter) {
      case "open":
        //done_status = false
        return todo.done_status ? false : true;
      case "done":
        //done_status = true
        return todo.done_status ? true : false;

      default: //case "all"
        return todo;
    }
  });

  //Render the filtered ToDoList
  filtered_toDoArr.forEach((obj) => {
    list.append(createNewToDoObject(obj));
  });
}
function init() {
  state.toDoArr = JSON.parse(localStorage.getItem("List"));

  if (state.toDoArr.length == 0) {
    state.toDoArr = [{ id: 0, desc: "default", done_status: false }];
  }
  render();
}

//**============================   EVENTS   ============================**//

//-------  INUPUT FORM SUBMIT NEW TASK  -------//
input_form.addEventListener("submit", (event) => {
  event.preventDefault();
  inputNewToDo();
});

//-------  BUTTON ADD NEW TASK  -------//
btn_add.addEventListener("click", () => {
  inputNewToDo();
});

//-------  BUTTON REMOVE DONE TASKS  -------//
btn_rmvdone.addEventListener("click", () => {
  radio_all.checked = true; //to see whats left

  state.toDoArr = state.toDoArr.filter((e) => e.done_status == false);

  //Storage sync
  localStorage.setItem("List", JSON.stringify(state.toDoArr));
  render();
});

//-------  RADIOBUTTONS FILTER  -------//
radio.forEach((radioBTN) => {
  radioBTN.addEventListener("click", () => {
    switch (radioBTN.id) {
      case "radio_all":
        state.filter = "all";
        render();
        break;
      case "radio_open":
        state.filter = "open";
        render();
        break;
      case "radio_done":
        state.filter = "done";
        render();
        break;

      default:
        state.filter = "all";
        render();
        break;
    }
  });
});

//**============================   FUNCTIONS   ============================**//

function createNewToDoObject(toDo) {
  //ListElement
  const new_li = document.createElement("li");
  //Checkbox
  const new_checkbox = document.createElement("input");
  new_checkbox.type = "checkbox";
  new_checkbox.id = toDo.id;
  new_checkbox.checked = toDo.done_status;
  //Label
  const new_label = document.createElement("label");
  new_label.innerText = toDo.desc;
  new_label.htmlFor = new_checkbox.id;
  //Append
  new_li.appendChild(new_checkbox);
  new_li.appendChild(new_label);

  //The Checkbox changes the Done_Status
  new_checkbox.addEventListener("click", () => {
    //checkboxesStatus change
    toDo.done_status = !toDo.done_status;

    //Storage sync
    localStorage.setItem("List", JSON.stringify(state.toDoArr));
    //render(); //XXX FRAGE XXX needed for correkt Site reload after checking
  });

  return new_li;
}

function inputNewToDo() {
  input.value = input.value.trim();

  //No Input Warning
  if (input.value == "") {
    input.value = "";
    return console.warn("NO INPUT");
  }
  //Check for Dublicates
  let dublicat = false;
  state.toDoArr.forEach((ToDo) => {
    if (input.value.toUpperCase() == ToDo.desc.toUpperCase()) {
      console.warn("Dublicat");
      dublicat = true;
    }
  });
  if (dublicat == true) {
    alert("No duplicate tasks allowed!");
    return;
  }
  // Change Radiobutton Done -> All on input
  if (radio_done.checked == true) {
    radio_all.checked = true;
    state.filter = "all";
  }

  //create new ToDoObj
  let todo = {
    id: new Date().getTime(),
    desc: input.value,
    done_status: false,
  };
  //push the todo to the list
  state.toDoArr.push(todo);

  input.value = "";
  input.focus();
  localStorage.setItem("List", JSON.stringify(state.toDoArr));
  render();
}

init();

//-------2things!

//error message??:
//Unchecked runtime.lastError: Could not establish connection. Receiving end does not exist.

//Seitenaktualisierung mit neuem Element gecheckt, Element ist nicht gecheckt
//gelöst mit zusätzlichem render, muss das sein?
