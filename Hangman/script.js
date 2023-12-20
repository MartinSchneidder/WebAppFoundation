const p_fails = document.getElementById("p_fails");
const letters = document.getElementById("letterSpaces");
const newGameButton = document.getElementById("newGameButton");
const letterButtons = document.querySelectorAll(".letterButtons button");
//====================   MAIN   ====================

state = {
  status: "active", //active,ended
  pressedLetter: "",
  fails: 0,
  allPressedLetters: [],
  words: [
    "Variable",
    "Test",
    "Array",
    "Function",
    "Script",
    "Counter",
    "Number",
    "HTML",
    "Webapp",
    "Stylesheet",
  ],
  word: [],
};

function render() {
  letters.innerText = ""; // Clear the letters

  writeWord(state.word);
  writeFailCounter();

  //---------------TESTAUSGABE

  //   console.log("status " + state.status);
  console.log("pressedLetter " + state.pressedLetter);
  console.log("fails " + state.fails);
  console.log(state.word);
  console.log("allPressedLetters " + state.allPressedLetters);

  //----------------TESTAUSGABE END
}
function init() {
  state.word =
    state.words[Math.floor(Math.random() * state.words.length)].split("");

  render();
}
//====================   EVENTS   ====================
letterButtons.forEach((button) => {
  /** Click button->  + saves the letter in state.var & state.array
   *                  + counts fails
   *                  + disables button
   */
  button.addEventListener("click", () => {
    state.pressedLetter = button.innerText;

    state.allPressedLetters.push(state.pressedLetter);

    failCount(button.innerText);

    button.disabled = true;

    render();
  });
});

/** NewGameButton ->  + reset buttons to active
 *                    + reset fail counter
 *                    + clear all letters in PressedArray
 *                    + randomize Word
 */
newGameButton.addEventListener("click", () => {
  letterButtons.forEach((button) => {
    button.disabled = false;
  });
  state.fails = 0;
  state.allPressedLetters = [];
  state.word =
    state.words[Math.floor(Math.random() * state.words.length)].split("");

  render();
});

//====================   FUNCTIONS   ====================
/**
 * Writes the Word (t _ e _ s _ _ _ t)
 * @param {Array} word
 */
function writeWord(word) {
  word.forEach((letter) => {
    const test = document.createElement("p");

    if (state.allPressedLetters.includes(letter.toLowerCase())) {
      //schreib den BUCHSTABEN
      test.innerText = letter;
      letters.appendChild(test);
    } else {
      //schreib einen STRICH
      test.innerText = "_";
      letters.appendChild(test);
    }
  });
}
function failCount(letter) {
  if (!state.word.includes(letter)) {
    //fail +1
    state.fails += 1;
  }
}
function writeFailCounter() {
  p_fails.innerText = "FAILS: " + state.fails + "/10";
}

init();
