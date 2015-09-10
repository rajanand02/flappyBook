var game = new Phaser.Game(400, 500, Phaser.AUTO, 'gameContainer');


var mainState = {
  // load the images
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

    //setting initial gravity to 1000
    this.bird.body.gravity.y = 1000;

    //add pipes
    this.pipes = game.add.group();

    this.pipes.enableBody = true;
    
    this.pipes.createMultiple(20, 'pipe');

    // add spaceBar key
    var spaceBar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    spaceBar.onDown.add(this.jump, this);

    this.timer = game.time.events.loop(1500, this.addRowOfPipes, this); 

    //show initial score
    this.score = 0;
    this.labelScore  = game.add.text(20, 20, "0", {font: '25px Bold', fill: '#ffffff'})
  },

  update: function() {  
    // if bird not inside the game restart it
    if (this.bird.inWorld === false){
      this.restartGame();
    }
    // if two images overlap restart the game
    game.physics.arcade.overlap(this.bird, this.pipes, this.restartGame, null, this);
  },

  jump: function () {
    // setting velocity of bird
    this.bird.body.velocity.y = -350;
  },

  restartGame: function(){
    // reset the game
    game.state.start('main');
  },

  addOnePipe: function (x, y) {
    var pipe = this.pipes.getFirstDead();
    pipe.reset(x, y);
    pipe.body.velocity.x = -200; 
    pipe.checkWorldBounds = true;
    pipe.outOfBoundsKill = true;
  },

  addRowOfPipes: function () {
    // create hole in pipe
    var hole = Math.floor(Math.random() * 5) + 1;

    for (var i=0; i < 8; ++i) {
      if(i != hole && i != hole+1){
        this.addOnePipe(400, i*60 +10);
      }
    }
    // increase the row on every successful pass
    this.score += 1;
    this.labelScore.text = this.score;
  }
};


game.state.add('main', mainState);
game.state.start('main');

