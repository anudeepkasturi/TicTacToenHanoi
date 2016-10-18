class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupTowers();
    this.render();
    this.clickTower();
    this.startIdx = null;
    this.endIdx = null;
  }

  setupTowers() {
    for (var i = 0; i < 3; i++) {
      const $ul = $("<ul></ul>");
      $ul.data(`pile`, i);
      this.$el.append($ul);
      if(i === 0){
        for (var j = 1; j < 4; j++) {
          const $li = $("<li></li>");
          $li.data("size", j);
          $ul.append($li);
        }
      }
    }

  }

  render(){
    const $li = $("li");
    $li.each( (idx, li) => {
      let $el = $(li);
      $el.css(`width`, `${$el.data("size")*50}`);
    });
  }

  clickTower(){
    $('ul').on('click', (e)=>{
      const $ul = $(e.currentTarget)
      if(this.startIdx === null){
        this.startIdx = $ul.data('pile');
        $ul.addClass("startIdx");
      }
      else{
        this.endIdx = $ul.data('pile');
        $ul.addClass("endIdx");
        this.makeMove(this.startIdx, this.endIdx);
      }

    })
  }

  makeMove(start, end){
    const $startul = $("ul.startIdx");
    const $li = $startul.children().first();
    const $endul = $('ul.endIdx');
    if(this.game.move(start, end)){
      $endul.prepend($li);
      if(this.game.isWon()){
        alert("You Win!");
      }
    }
    else {
      alert("Invalid Move");

    }
    $endul.removeClass("endIdx");
    $startul.removeClass("startIdx");
    this.startIdx = null;
    this.endIdx = null;
  }


}

module.exports = View;
