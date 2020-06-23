PlayState = {};

// load game assets

PlayState.preload = function() {
  // this.game is our reference to the Phaser.Game
  // 'background' is an arbitrary key assigned to our asset (background image)
  this.game.load.json('level:1', 'data/level01.json');

  this.game.load.image('background', 'images/background.png');
  this.game.load.image('ground', 'images/ground.png');
  this.game.load.image('grass:8x1', 'images/grass_8x1.png');
  this.game.load.image('grass:6x1', 'images/grass_6x1.png');
  this.game.load.image('grass:4x1', 'images/grass_4x1.png');
  this.game.load.image('grass:2x1', 'images/grass_2x1.png');
  this.game.load.image('grass:1x1', 'images/grass_1x1.png');
};

PlayState._spawnPlatform = function (platform) {
  // whilst it's being iterated, add new sprites to the game world
    this.game.add.sprite(platform.x, platform.y, platform.image);
};

PlayState._loadLevel = function (data) {
  // spawn all platforms
  // iterate over the platforms array
  data.platforms.forEach(this._spawnPlatform, this);
};

// create game entities and set up world here
PlayState.create = function() {
  // x, y co-ordinates and the asset key
  this.game.add.image(0, 0, 'background')
  this._loadLevel(this.game.cache.getJSON('level:1'));
}


window.onload = function() {
  // canvas dimensions, using a WebGL canvas, the div element in index html
  var game = new Phaser.Game(960, 600, Phaser.AUTO, 'game');
  game.state.add('play', PlayState);
  game.state.start('play');
}
