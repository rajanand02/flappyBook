var game = new Phaser.Game(400, 500, Phaser.AUTO, 'gameContainer');


var mainState = {
  preload: function () {
    game.stage.backgroundColor = '#40D954';
    game.load.image('bird', 'images/user_icon.png');
  }
};


game.state.add('main', mainState);
game.state.start('main');

