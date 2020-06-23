PlayState = {}

// load game assets

PlayState.preload = function() {
  // this.game is our reference to the Phaser.Game
  // 'background' is an arbitrary key assigned to our asset (background image)
  this.game.load.image('background', 'images/background.png');
}

// create game entities and set up world here
PlayState.create = function() {
  // x, y co-ordinates and the asset key
  this.game.add.image(0, 0, 'background')
}

window.onload = function() {
  // canvas dimensions, using a WebGL canvas, the div element in index html
  var game = new Phaser.Game(960, 600, Phaser.AUTO, 'game');
  game.state.add('play', PlayState);
  game.state.start('play');
}
