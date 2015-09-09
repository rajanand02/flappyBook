var game = new Phaser.Game(400, 500, Phaser.AUTO, 'gameContainer');


var mainState = {
  preload: function () {
    game.stage.backgroundColor = '#40D954';
    game.load.image('bird', 'images/user_icon.png');
    game.load.image('pipe', 'images/fb.png');
  },

  create: function () {

    //add bird/user_icon
    game.physics.startSystem(Phaser.Physics.ARCADE);

    this.bird = this.game.add.sprite(100, 245, 'bird');

    game.physics.arcade.enable(this.bird);

    this.bird.body.gravity.y = 1000;

    //add pipes
    this.pipes = game.add.group();

    this.pipes.enableBody = true;
    
    this.pipes.createMultiple(20, 'pipe');

    // add spaceBar key
    var spaceBar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    spaceBar.onDown.add(this.jump, this);
    this.timer = game.time.events.loop(1500, this.addRowOfPipes, this); 
  },

  update: function() {  
    if (this.bird.inWorld === false){
      this.restartGame();
    }
  },

  jump: function () {
    this.bird.body.velocity.y = -350;
  },

  restartGame: function(){
    game.state.start('main');
  },

  addOnePipe: function (x, y) {
    var pipe = this.pipes.getFirstDead();
    pipe.reset(x, y);
    pipe.body.velocity.x = -200;
    pipe.checkWorldBounds =  true;
    pipe.outOfBoundKill = true;
  },

  addRowOfPipes: function () {
    var hole = Math.floor(Math.random() * 5) + 1;

    for (var i=0; i < 8; ++i) {
      if(i != hole && i != hole+1){
        this.addOnePipe(400, i*60 +10);
      }
    }
  },

};


game.state.add('main', mainState);
game.state.start('main');

