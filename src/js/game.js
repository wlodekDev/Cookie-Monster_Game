const Furry = require("./furry.js");
const Coin = require("./coin.js");


function Game() {

    const boardNode = document.querySelectorAll("#board > div");
    const boardAr = [...boardNode];
    // console.log(boardAr[10]);

    this.board = boardAr;
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;
    this.index = function (x, y) {
        return x + (y * 10);
    };
    // removing furry clones
    this.hideVisibleFurry = function () {
        const furryClone = document.querySelector(".furry");
        if(furryClone !== null) {
            furryClone.classList.remove("furry");
        }
    };

    // rendering Furry
    this.showFurry = function () {
        this.hideVisibleFurry();
        this.board[ this.index(this.furry.x,this.furry.y) ].classList.add('furry');
    };

    // rendering Coin
    this.showCoin = function () {
        this.board[ this.index(this.coin.x,this.coin.y) ].classList.add('coin');
    };

    //start game - setInterval
    this.startGame = function () {
        let self;
        self = this;
        this.idSetInterval = setInterval(function () {
            self.moveFurry();
        }, 250);
    };

    // move furry
    this.moveFurry = function () {

        if(this.furry.direction === "right") {
            this.furry.x = this.furry.x + 1;
        } else if (this.furry.direction === "left") {
            this.furry.x = this.furry.x - 1;
        } else if (this.furry.direction === "up") {
            this.furry.y = this.furry.y - 1;
        } else if (this.furry.direction === "down") {
            this.furry.y = this.furry.y + 1;
        }

        this.gameOver();
        this.showFurry();
        if(this.idSetInterval === null){
            this.hideVisibleFurry();
        }
        this.checkCoinCollision();
    };

    // turn furry
    this.turnFurry = function (event) {
        switch (event.which) {
            case 37:
                this.furry.direction = "left";
                break;
            case 39:
                this.furry.direction = "right";
                break;
            case 38:
                this.furry.direction = "up";
                break;
            case 40:
                this.furry.direction = "down";
                break;
        }
    };
    
    this.checkCoinCollision = function () {
        if(this.index(this.furry.x,this.furry.y) === this.index(this.coin.x,this.coin.y)) {
            // console.log("collision");
            const coinCollide = document.querySelector(".coin").classList.remove("coin");
            this.score+=1;
            const scoreId = document.querySelector('strong').innerText = this.score;
            this.coin = new Coin();
            this.showCoin();
        }
    };
    
    this.gameOver = function () {
        if(this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
            window.clearInterval(this.idSetInterval);
            this.idSetInterval = null;
            clearInterval(this.idSetInterval);
            this.hideVisibleFurry();
            this.finalScore();
        }
    };

    this.finalScore = function () {
      const yourScore = document.querySelector("#score div");
      yourScore.style.height = "10em";
      yourScore.innerHTML = "GAME OVER<br>Your score:<br>"+this.score+"<br>try one more time<br>cookies are never too much :)";
    };
}
module.exports = Game;
