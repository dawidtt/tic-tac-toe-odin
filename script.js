const game = (function () {
  let movesAvailable = 9;
  let gameboard = [
    [".", ".", "."],
    [".", ".", "."],
    [".", ".", "."],
  ];
  const decreaseNumberOfMoves = () => movesAvailable--;
  const getNumberOfMoves = () => movesAvailable;

  const makeMove = (row, col, player) => {
    message = false;
    if (gameboard[row][col] === ".") {
      gameboard[row][col] = player.move;
      decreaseNumberOfMoves();
    } else {
      message = "This field is already taken";
    }
    return message ? message : player.move;
  };
  return { gameboard, makeMove, getNumberOfMoves };
})();

function createPlayer(name, move) {
  return { name, move };
}
const josh = createPlayer("josh", "O");
const mike = createPlayer("mike", "X");
