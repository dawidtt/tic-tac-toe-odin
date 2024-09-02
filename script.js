const game = (function () {
  let gameboard = [
    [".", ".", "."],
    [".", ".", "."],
    [".", ".", "."],
  ];
  const makeMove = (row, col, move) => (gameBoard[row][col] = move);
  return { gameboard, makeMove };
})();
function createPlayer(name) {
  return { name };
}
const josh = createPlayer("josh");
const mike = createPlayer("mike");
