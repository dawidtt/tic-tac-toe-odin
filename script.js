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
    const message = false;
    if (gameboard[row][col] === ".") {
      gameboard[row][col] = player.move;
      decreaseNumberOfMoves();
    } else {
      message = "This field is already taken";
    }
    return message ? message : player.move;
  };
  const displayGameboard = () => {
    console.log(gameboard);
  };
  return { makeMove, getNumberOfMoves, displayGameboard };
})();
function createPlayer(name, move) {
  return { name, move };
}
const josh = createPlayer("josh", "O");
const mike = createPlayer("mike", "X");
