function Hero(game, x, y) {
    // call Phaser.Sprite constructor
    Phaser.Sprite.call(this, game, x, y, 'hero');
    // sets the central point of the character
    this.anchor.set(0.5, 0.5);
}

// inherit from Phaser.Sprite
Hero.prototype = Object.create(Phaser.Sprite.prototype);
Hero.prototype.constructor = Hero;

// add this method –and the ongoing Hero methods– AFTER these lines, or you
// will override them when cloning the Phaser.Sprite prototype
Hero.prototype.move = function(direction) {
  this.x += direction * 2.5; //2.5 pizels each frame
}


PlayState = {};

// load game assets

// the init function is executed before any phase
PlayState.init = function() {
  // forces the rendering system to round the position values when drawing images (fixes blurry images)
  this.game.renderer.renderSession.roundPixels = true;
  this.keys = this.game.input.keyboard.addKeys({
    left: Phaser.KeyCode.LEFT,
    right: Phaser.KeyCode.RIGHT
  });
};

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
  this.game.load.image('hero', 'images/hero_stopped.png');
};

PlayState._spawnPlatform = function (platform) {
  // whilst it's being iterated, add new sprites to the game world
    this.game.add.sprite(platform.x, platform.y, platform.image);
};

PlayState._spawnCharacters = function (data) {
    // spawn hero
    this.hero = new Hero(this.game, data.hero.x, data.hero.y);
    this.game.add.existing(this.hero);
};

PlayState._loadLevel = function (data) {
  // spawn all platforms
  // iterate over the platforms array
  data.platforms.forEach(this._spawnPlatform, this);
  this._spawnCharacters({hero: data.hero});
};

// create game entities and set up world here
PlayState.create = function() {
  // x, y co-ordinates and the asset key
  this.game.add.image(0, 0, 'background')
  this._loadLevel(this.game.cache.getJSON('level:1'));
}

PlayState.update = function() {
  this._handleInput();
}

PlayState._handleInput = function () {
    if (this.keys.left.isDown) { // move hero left
        this.hero.move(-1);
    }
    else if (this.keys.right.isDown) { // move hero right
        this.hero.move(1);
    }
};


window.onload = function() {
  // canvas dimensions, using a WebGL canvas, the div element in index html
  var game = new Phaser.Game(960, 600, Phaser.AUTO, 'game');
  game.state.add('play', PlayState);
  game.state.start('play');
}
