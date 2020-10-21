const calculator = document.querySelector(".calculator");
let stack = [];

calculator.addEventListener("click", function (event) {
  const element = event.target;
  if (element.classList.contains("btn")) {
    if (!Number.isInteger(Number(element.innerText))) {
      if (element.innerText === "÷") {
        pushToStack();
        stack.push("/");
        clearScreen();
      } else if (element.innerText === "×") {
        pushToStack();
        stack.push("*");
        clearScreen();
      } else if (element.innerText === "−") {
        pushToStack();
        stack.push("-");
        clearScreen();
      } else if (element.innerText === "+") {
        pushToStack();
        clearScreen();
        stack.push("+");
        clearScreen();
      } else if (element.innerText === "=") {
        pushToStack();
        resolveStack();
      } else if (element.innerText === "C") {
        stack.splice(0, stack.length);
        clearScreen();
      } else if (element.innerText === "←") {
        removeNumber();
      }
    } else {
      displayOnScreen(element.innerText);
    }
  }
});

function pushToStack() {
  let number = parseInt(document.querySelector(".numbers").innerText);
  stack.push(number);
}

function resolveStack() {
  while (stack.includes("*") || stack.includes("/")) {
    for (let index = 0; index < stack.length; index++) {
      if (stack[index] === "*") {
        stack[index] = stack[index - 1] * stack[index + 1];
        cutStack(index);
        break;
      } else if (stack[index] === "/") {
        stack[index] = stack[index - 1] / stack[index + 1];
        cutStack(index);
        break;
      }
    }
  }
  while (stack.includes("+") || stack.includes("-")) {
    for (let index = 0; index < stack.length; index++) {
      if (stack[index] === "+") {
        stack[index] = stack[index - 1] + stack[index + 1];
        cutStack(index);
        break;
      } else if (stack[index] === "-") {
        stack[index] = stack[index - 1] - stack[index + 1];
        cutStack(index);
        break;
      }
    }
  }
  clearScreen();
  displayOnScreen(stack.toString());
  stack.splice(0, stack.length);
}

function displayOnScreen(number) {
  let screen = document.querySelector(".numbers");

  if (screen.innerText === "0") {
    screen.innerText = number;
  } else {
    screen.innerText += number;
  }
}

function cutStack(index) {
  stack.splice(index - 1, 1);
  stack.splice(index, 1);
}

function clearScreen() {
  let screen = document.querySelector(".numbers");
  screen.innerText = 0;
}

function removeNumber() {
  numberElement = document.querySelector(".numbers");
  numberOnDisplay = document.querySelector(".numbers").innerText;

  if (numberOnDisplay === "0") {
    return;
  } else if (numberOnDisplay.length === 1) {
    numberElement.innerText = 0;
  } else {
    numberElement.innerText = numberOnDisplay.slice(
      0,
      numberOnDisplay.length - 1
    );
  }
}
