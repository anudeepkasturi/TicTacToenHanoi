/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(1);
	const View = __webpack_require__(2)

	$( () => {
	  const rootEl = $('.toh');
	  const game = new Game();
	  new View(game, rootEl);
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	class Game {
	  constructor() {
	    this.towers = [[3, 2, 1], [], []];
	  }

	  isValidMove(startTowerIdx, endTowerIdx) {
	      const startTower = this.towers[startTowerIdx];
	      const endTower = this.towers[endTowerIdx];

	      if (startTower.length === 0) {
	        return false;
	      } else if (endTower.length == 0) {
	        return true;
	      } else {
	        const topStartDisc = startTower[startTower.length - 1];
	        const topEndDisc = endTower[endTower.length - 1];
	        return topStartDisc < topEndDisc;
	      }
	  }

	  isWon() {
	      // move all the discs to the last or second tower
	      return (this.towers[2].length == 3) || (this.towers[1].length == 3);
	  }

	  move(startTowerIdx, endTowerIdx) {
	      if (this.isValidMove(startTowerIdx, endTowerIdx)) {
	        this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
	        return true;
	      } else {
	        return false;
	      }
	  }

	  print() {
	      console.log(JSON.stringify(this.towers));
	  }

	  promptMove(reader, callback) {
	      this.print();
	      reader.question("Enter a starting tower: ", start => {
	        const startTowerIdx = parseInt(start);
	        reader.question("Enter an ending tower: ", end => {
	          const endTowerIdx = parseInt(end);
	          callback(startTowerIdx, endTowerIdx)
	        });
	      });
	  }

	  run(reader, gameCompletionCallback) {
	      this.promptMove(reader, (startTowerIdx, endTowerIdx) => {
	        if (!this.move(startTowerIdx, endTowerIdx)) {
	          console.log("Invalid move!");
	        }

	        if (!this.isWon()) {
	          // Continue to play!
	          this.run(reader, gameCompletionCallback);
	        } else {
	          this.print();
	          console.log("You win!");
	          gameCompletionCallback();
	        }
	      });
	  }
	}

	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);