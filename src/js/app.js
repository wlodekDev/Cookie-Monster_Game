const Game = require("./game.js");


const game = new Game();
game.showFurry();
game.showCoin();
game.startGame();
game.checkCoinCollision();

document.addEventListener('keydown', function (event) {
    game.turnFurry(event);
});

