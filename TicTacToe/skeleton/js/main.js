const View = require("./ttt-view");// require appropriate file
const Game = require("/Users/appacademy/Desktop/W6D1/TicTacToe/solution/game.js");// require appropriate file

$( () => {
  // Your code here
  const game = new Game();
  const container = $(".ttt");
  const view = new View(game, container);

});
