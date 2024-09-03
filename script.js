const gameboard = (function () {
  let gameboard = [
    [".", ".", "."],
    [".", ".", "."],
    [".", ".", "."],
  ];
  return { gameboard };
})();

const gameControl = (function () {
  let movesAvailable = 9;

  const decreaseNumberOfMoves = () => movesAvailable--;
  const getNumberOfMoves = () => movesAvailable;

  const makeMove = (row, col, player) => {
    let message = false;
    if (gameboard.gameboard[row][col] === ".") {
      gameboard.gameboard[row][col] = player.move;
      decreaseNumberOfMoves();
    } else {
      message = "This field is already taken";
    }
    displayGameboard();
    message = lookForWinner();
    return message
      ? message
      : `${player.name} placed ${player.move} on ${row} row in ${col} column`;
  };
  const lookForWinner = () => {
    let winPlayerMove;
    let winner = false;
    let winnerMessage = "";
    const tempGameboardArray = gameboard.gameboard;
    for (const gameboardRow of tempGameboardArray) {
      if (
        gameboardRow[0] === gameboardRow[1] &&
        gameboardRow[1] === gameboardRow[2] &&
        gameboardRow[2] !== "."
      ) {
        winPlayerMove = gameboardRow[0];
        for (const player of players) {
          if (player.move === winPlayerMove) {
            winner = player.name;
            winnerMessage = `${winner} won the game`;
          }
        }
        break;
      }
    }
    return winner ? winnerMessage : winner;
  };
  const displayGameboard = () => {
    console.log(gameboard.gameboard);
  };
  return { makeMove, getNumberOfMoves, displayGameboard, lookForWinner };
})();

function createPlayer(name, move) {
  return { name, move };
}

const josh = createPlayer("josh", "O");
const mike = createPlayer("mike", "X");
const players = [josh, mike];
