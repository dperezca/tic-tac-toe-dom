const game = {
  // booleà per controlar el canvi de torns
  xTurn: true,
  // estat de X, matriu de strings
  xState: [],
  // estat de O, matriu de strings
  oState: [],
  // possibles combinacions que guanyen la partida
  winningStates: [
    // Files
    ["0", "1", "2"],
    ["3", "4", "5"],
    ["6", "7", "8"],

    // Columnes
    ["0", "3", "6"],
    ["1", "4", "7"],
    ["2", "5", "8"],

    // Diagonal
    ["0", "4", "8"],
    ["2", "4", "6"],
  ],
};

// El teu codi aquí
// Get elements
const closeModal = document.getElementById("close-modal");
const modal = document.getElementById("modal");
const gameBoard = document.getElementById("game");
const restart = document.getElementById("restart-button");
const resultadoText = document.getElementById("resultado");

//Revisa las combinaciones ganadoras y ve si el jugador selecciono alguna de ellas
function comprobarWinningStates(selection) {
  //Compara cada combinación ganadora con el array de las casillas seleccionadas
  for (let combinacion of game.winningStates) {
    winner = combinacion.every((value, index) => selection.includes(value));
    if (winner) {
      return true;
    }
  }
  return false;
}

//Bloquear el tablero
function blockBoxes() {
  // Selecciono las cajas que no estan seleccionadas
  let boxes = document.querySelectorAll(".unselected");
  // A cada caja le quito la class "unselected" => eso hace que no pase el filtro del event listener del gameBoard
  for (let box of boxes) {
    box.classList.remove("unselected");
  }
}

gameBoard.addEventListener("click", (event) => {
  // Accedeix als elements html necessaris
  // El jugador fa click a una casella buida
  if (event.target.classList.contains("unselected")) {
    // Aconsegueix el valor de la casella clicada
    // Afegeix el valor de la casella a la matriu del jugador que li toca
    // Dona les classes adients a la casella clicada
    // Si es el turno de X
    if (game.xTurn) {
      game.xState.push(event.target.id);
      event.target.classList.add("x");
      // Si es el turno de Y
    } else {
      game.oState.push(event.target.id);
      event.target.classList.add("o");
    }
    event.target.classList.remove("unselected");
    // Canvia de torn
    game.xTurn = !game.xTurn;
  }
  // Comprova si és empat
  if (game.xState.length + game.oState.length === 9) {
    updateLocalStorage("tie");
    openModal("There is a tie");
    resultadoText.innerHTML = "There is a tie";
  }

  // Comprova si hi ha guanyador
  if (comprobarWinningStates(game.xState)) {
    updateLocalStorage("x");
    openModal("❌ won the game!");
    resultadoText.innerHTML = "❌ won the game!";
    blockBoxes();
  }
  if (comprobarWinningStates(game.oState)) {
    updateLocalStorage("o");
    openModal("⭕ won the game!");
    resultadoText.innerHTML = "⭕ won the game!";
    blockBoxes();
  }
});

// Botó de restart
document.querySelector(".restart").addEventListener("click", () => {
  // Treu totes les classes afegides
  // Torna els estats i torn al seu estat inicial
  boxes = document.getElementsByClassName("box");
  game.xTurn = true;
  game.xState = [];
  game.oState = [];
  for (let box of boxes) {
    box.classList = "box unselected";
  }
  resultadoText.innerHTML = "";
});

//Open modal
function openModal(message) {
  modal.classList.remove("hidden");
  modal.querySelector("#modal-message").innerHTML = message;
}

//Close Modal
closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
});

//Set local storage
function setLocalStorage() {
  localStorage.setItem("numGames", 0);
  localStorage.setItem("tie", 0);
  localStorage.setItem("gamesX", 0);
  localStorage.setItem("gamesO", 0);
}

//Actualicar local storage
function updateLocalStorage(result) {
  const winner = {
    x: "gamesX",
    o: "gamesO",
    tie: "tie",
  };
  let numGames = Number(localStorage.getItem("numGames"));
  localStorage.setItem("numGames", numGames + 1);
  let numGamesPlayer = Number(localStorage.getItem(winner[`${result}`]));
  localStorage.setItem(winner[`${result}`], numGamesPlayer + 1);
  showStatistics();
}

const gamesPlayedDiv = document.getElementById("games-played");
const gamesXDiv = document.getElementById("games-won-x");
const gamesODiv = document.getElementById("games-won-o");
const gamesTieDiv = document.getElementById("games-tie");
const restartCounterButton = document.getElementById("restart-counter");

function showStatistics() {
  gamesPlayedDiv.innerHTML = localStorage.getItem("numGames")
    ? localStorage.getItem("numGames")
    : 0;
  gamesXDiv.innerHTML = localStorage.getItem("gamesX")
    ? localStorage.getItem("gamesX")
    : 0;
  gamesODiv.innerHTML = localStorage.getItem("gamesO")
    ? localStorage.getItem("gamesO")
    : 0;
  gamesTieDiv.innerHTML = localStorage.getItem("tie")
    ? localStorage.getItem("tie")
    : 0;
}

function restartCounter() {
  localStorage.clear();
  setLocalStorage();
  showStatistics();
}

restartCounterButton.addEventListener("click", restartCounter);

showStatistics();
