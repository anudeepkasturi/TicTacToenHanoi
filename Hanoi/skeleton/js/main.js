const Game = require("./game");
const View = require("./hanoi-view")

$( () => {
  const rootEl = $('.toh');
  const game = new Game();
  new View(game, rootEl);
});
