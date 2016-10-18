class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
    this.bindEvents();
  }

  bindEvents() {
    $("li").click(event => {
      const $li = $(event.currentTarget);
      try {
        this.game.playMove($li.data("pos"));
      }
      catch(err) {
        alert("Invalid move, box not empty");
      }

      this.makeMove($li);
      if(this.game.winner()){
        alert(`${this.game.currentPlayer.toUpperCase()} wins congrats!!!`);
      } else if (this.game.isOver()){
        alert(`It's a tie!`);
      }
    })
  }

  makeMove($square) {
    console.log(this.game.currentPlayer);
    $square.addClass(this.game.currentPlayer);
  }

  setupBoard() {
    const $ul = $("<ul></ul>");
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        const $li = $("<li></li>");
          $li.data("pos", [i, j]);
        $ul.append($li);
      }
    }
    this.$el.append($ul);
  }
}


module.exports = View;
