const gameboard = (function () {
  let gameboard = [
    [".", ".", "."],
    [".", ".", "."],
    [".", ".", "."],
  ];
  const getGameboard = () => gameboard;
  return { getGameboard, gameboard };
})();

const gameControl = (function () {
  let currentGameboard = gameboard.gameboard;
  const josh = createPlayer("josh", "O");
  const mike = createPlayer("mike", "X");
  const players = [josh, mike];
  let activePlayer = players[0];
  let roundMessage = "";

  let movesAvailable = 9;

  const switchActivePlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const decreaseNumberOfMoves = () => movesAvailable--;
  const getNumberOfMoves = () => movesAvailable;

  const makeMove = (row, col) => {
    let message = false;
    if (currentGameboard[row][col] === ".") {
      currentGameboard[row][col] = activePlayer.move;
      roundMessage = `${activePlayer.name} placed ${activePlayer.move} on ${row} row in ${col} column`;
      decreaseNumberOfMoves();
      switchActivePlayer();
      message = lookForWinner();
    } else {
      message = "This field is already taken";
    }
    displayGameboard();
    renderToWebpage(currentGameboard);
    console.log(message ? message : roundMessage);
    return message ? message : roundMessage;
  };
  const lookForWinner = () => {
    const allEqual = (arr) => arr.every((val) => val === arr[0]);

    function chooseWinner(winPlayerMove) {
      for (const player of players) {
        if (player.move === winPlayerMove) {
          winner = player.name;
          winnerMessage = `${winner} won the game`;
        }
      }
    }
    let winPlayerMove;
    let winner = false;
    let winnerMessage = "";
    const tempGameboardArray = currentGameboard;

    // check if there is a winner in rows
    for (const gameboardRow of tempGameboardArray) {
      if (allEqual(gameboardRow) && gameboardRow[2] !== ".") {
        winPlayerMove = gameboardRow[0];
        chooseWinner(winPlayerMove);
        break;
      }
    }
    // check if there is a winner in columns
    for (let i = 0; i < 3; i++) {
      let tempTraversalArray = [];
      for (const gameboardRow of tempGameboardArray) {
        tempTraversalArray.push(gameboardRow[i]);
      }
      if (allEqual(tempTraversalArray) && tempTraversalArray[2] !== ".") {
        chooseWinner(tempTraversalArray[1]);
        break;
      } else tempTraversalArray = [];
    }
    // check if there is a winner diagonally
    let tempDiagonalArray = [];
    let reverseDiagonalPointer = 2;
    for (let i = 0; i < 3; i++) {
      tempDiagonalArray.push(tempGameboardArray[i][i]);
    }
    if (allEqual(tempDiagonalArray) && tempDiagonalArray[2] !== ".") {
      chooseWinner(tempDiagonalArray[1]);
    } else {
      tempDiagonalArray = [];
      for (let i = 0; i < 3; i++) {
        tempDiagonalArray.push(tempGameboardArray[i][reverseDiagonalPointer]);
        reverseDiagonalPointer--;
      }
      if (allEqual(tempDiagonalArray) && tempDiagonalArray[2] !== ".") {
        chooseWinner(tempDiagonalArray[1]);
      }
    }

    if (movesAvailable === 0) {
      winner = "tie";
      winnerMessage = "There is a TIE!";
    }
    return winner ? winnerMessage : winner;
  };
  const displayGameboard = () => {
    console.log(currentGameboard);
  };

  const renderToWebpage = (gameboard) => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (
          gameboard[i][j] !== "." &&
          allGameboardFieldsArrayFinal[i][j].childElementCount === 0
        ) {
          const textToWrite = gameboard[i][j];
          const pTag = document.createElement("p");
          pTag.textContent = textToWrite;
          allGameboardFieldsArrayFinal[i][j].appendChild(pTag);
        }
      }
    }
  };

  return {
    makeMove,
    getNumberOfMoves,
    displayGameboard,
    lookForWinner,
    renderToWebpage,
  };
})();

function createPlayer(name, move) {
  return { name, move };
}

const allGameboardFieldsFromDom = document.querySelectorAll(".gameboard-field");

const allGameboardFieldsArray = [...allGameboardFieldsFromDom];

const allGameboardFieldsArray1 = allGameboardFieldsArray.slice(0, 3);
const allGameboardFieldsArray2 = allGameboardFieldsArray.slice(3, 6);

const allGameboardFieldsArray3 = allGameboardFieldsArray.slice(6, 9);

allGameboardFieldsArrayFinal = [];
allGameboardFieldsArrayFinal.push(
  allGameboardFieldsArray1,
  allGameboardFieldsArray2,
  allGameboardFieldsArray3
);
console.log(allGameboardFieldsArrayFinal);
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    allGameboardFieldsArrayFinal[i][j].addEventListener("click", () =>
      gameControl.makeMove(i, j)
    );
  }
}
