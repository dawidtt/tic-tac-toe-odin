const game = (function () {
  let gameboard = [
    [".", ".", "."],
    [".", ".", "."],
    [".", ".", "."],
  ];
  const makeMove = (row, col, move) => (gameboard[row][col] = move);
  return { gameboard, makeMove };
})();
function createPlayer(name, move) {
  return { name, move };
}
const josh = createPlayer("josh", "O");
const mike = createPlayer("mike", "X");
