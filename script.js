const game = (function () {
  let movesAvailable = 9;
  let gameboard = [
    [".", ".", "."],
    [".", ".", "."],
    [".", ".", "."],
  ];
  const makeMove = (row, col, move) => {
    gameboard[row][col] = move;
    movesAvailable--;
    return move;
  };
  return { gameboard, makeMove };
})();
function createPlayer(name, move) {
  return { name, move };
}
const josh = createPlayer("josh", "O");
const mike = createPlayer("mike", "X");
