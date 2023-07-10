//initial variables
const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");

//array-options
let options = {
  fruits: ["Banana", "Strawberry", "Orange", "Grapes", "Pineapple", "Grapefruit"],
  animals: ["Crocodile", "Puppy", "Antelope", "Jaguar", "Walrus", "Snake"],
  countries: ["Afghanistan", "Turkey", "America", "Switzerland", "Netherlands", "Colombia"],
};

//options (buttons)
const displayOptions = () => {
  optionsContainer.innerHTML += `<h3>Please Select An Option</h3>`;
  let buttonCon = document.createElement("div");
  for (let value in options) {
    buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`;
  }
  optionsContainer.appendChild(buttonCon);
};

//blocks buttons
const blocker = () => {
  let optionsButtons = document.querySelectorAll(".options");
  let letterButtons = document.querySelectorAll(".letters");
  optionsButtons.forEach((button) => {
    button.disabled = true;
  });

//disables letters after use
  letterButtons.forEach((button) => {
    button.disabled.true;
  });
  newGameContainer.classList.remove("hide");
};

//Random word generator
const generateWord = (optionValue) => {
  let optionsButtons = document.querySelectorAll(".options");
  optionsButtons.forEach((button) => {
    if (button.innerText.toLowerCase() === optionValue) {
      button.classList.add("active");
    }
    button.disabled = true;
  });

//clears out previous word data and hidden letters
  letterContainer.classList.remove("hide");
  userInputSection.innerText = "";

//chooses a random word using math.random
  let optionArray = options[optionValue];
  chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)];
  chosenWord = chosenWord.toUpperCase();

//replaces letters of the word with dashes at the start of the game
  let displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span>');
  userInputSection.innerHTML = displayItem;
};

//function that fires to restarts the game
const initializer = () => {
  winCount = 0;
  count = 0;

//clear contents
  userInputSection.innerHTML = ""; optionsContainer.innerHTML = ""; letterContainer.classList.add("hide"); newGameContainer.classList.add("hide"); letterContainer.innerHTML = "";

//letter buttons
  for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");
    button.innerText = String.fromCharCode(i);
    button.addEventListener("click", () => {
      let charArray = chosenWord.split("");
      let dashes = document.getElementsByClassName("dashes");
      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
          if (char === button.innerText) {
            dashes[index].innerText = char;
            winCount += 1;
            if (winCount == charArray.length) {
              resultText.innerHTML = `<h2 class='win-msg'>You Win!!</h2><p>The word was <span>${chosenWord}</span></p>`;
              blocker();
            }
          }
        });
      } else {
        count += 1;
        drawMan(count);
        if (count == 6) {
          resultText.innerHTML = `<h2 class='lose-msg'>You Lose!!</h2><p>The word was <span>${chosenWord}</span></p>`;
          blocker();
        }
      }
      button.disabled = true;
    });
    letterContainer.append(button);
  }
  displayOptions();
  let { initialDrawing } = canvasCreator();
  initialDrawing();
};
const canvasCreator = () => {
  let context = canvas.getContext("2d");
  context.beginPath();
  context.strokeStyle = "#000";
  context.lineWidth = 2;

//drawing the lines/shapes for the hangman figure
  const drawLine = (fromX, fromY, toX, toY) => {
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();
  };
  const head = () => {
    context.beginPath();
    context.arc(70, 30, 10, 0, Math.PI * 2, true);
    context.stroke();
  };
  const body = () => {drawLine(70, 40, 70, 80)}; 
  const leftArm = () => {drawLine(70, 50, 50, 70)};
  const rightArm = () => {drawLine(70, 50, 90, 70)};
  const leftLeg = () => {drawLine(70, 80, 50, 110)};
  const rightLeg = () => {drawLine(70, 80, 90, 110)};
  const initialDrawing = () => {context.clearRect(0, 0, context.canvas.width, context.canvas.height); drawLine(10, 130, 130, 130); drawLine(10, 10, 10, 131); drawLine(10, 10, 70, 10); drawLine(70, 10, 70, 20)};
  return { initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg };
};

//draw the figure
const drawMan = (count) => {
  let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
  switch (count) {
    case 1: head(); break;
    case 2: body(); break;
    case 3: leftArm(); break;
    case 4: rightArm(); break;
    case 5: leftLeg(); break;
    case 6: rightLeg(); break; default: break;
  }
};

//to launch a new game
newGameButton.addEventListener("click", initializer);
window.onload = initializer;