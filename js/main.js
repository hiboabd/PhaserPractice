function Hero(game, x, y) {
    // call Phaser.Sprite constructor
    Phaser.Sprite.call(this, game, x, y, 'hero');
    // sets the central point of the character
    this.anchor.set(0.5, 0.5);
    // ceate a body for the character by enabling physics
    this.game.physics.enable(this);
    // prevent the main character to move outside the bounds of the screen
    this.body.collideWorldBounds = true;
}

// inherit from Phaser.Sprite
Hero.prototype = Object.create(Phaser.Sprite.prototype);
Hero.prototype.constructor = Hero;

// add this method –and the ongoing Hero methods– AFTER these lines, or you
// will override them when cloning the Phaser.Sprite prototype
Hero.prototype.move = function(direction) {
  const SPEED = 200;
  this.body.velocity.x = direction * SPEED;
}

Hero.prototype.jump = function() {
  const JUMP_SPEED = 600;
  this.body.velocity.y = -JUMP_SPEED;
  let canJump = this.body.touching.down;

  if (canJump) {
      this.body.velocity.y = -JUMP_SPEED;
  }
  // returning whether the character managed to jump or not
  return canJump;
}


PlayState = {};

// load game assets

// the init function is executed before any phase
PlayState.init = function() {
  // forces the rendering system to round the position values when drawing images (fixes blurry images)
  this.game.renderer.renderSession.roundPixels = true;
  this.keys = this.game.input.keyboard.addKeys({
    left: Phaser.KeyCode.LEFT,
    right: Phaser.KeyCode.RIGHT,
    up: Phaser.KeyCode.UP
  });

  this.keys.up.onDown.add(function() {
    let didJump = this.hero.jump();
    if(didJump){
      this.sfx.jump.play();
    }
  }, this);
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

  this.game.load.audio('sfx:jump', 'audio/jump.wav');
};

PlayState._spawnPlatform = function (platform) {
  // Phaser.Group.create is a factory method for sprites. The new sprite will be added as a child of the group.
  let sprite = this.platforms.create(
    platform.x, platform.y, platform.image);

    this.game.physics.enable(sprite);
    // disables gravity for all platforms
    sprite.body.allowGravity = false;
    // prevents platforms from being moved when collided with
    sprite.body.immovable = true;
};

PlayState._spawnCharacters = function (data) {
    // spawn hero
    this.hero = new Hero(this.game, data.hero.x, data.hero.y);
    this.game.add.existing(this.hero);
};

PlayState._loadLevel = function (data) {
  //create all the group/layers that we need
  this.platforms = this.game.add.group();

  // spawn all platforms
  // iterate over the platforms array
  data.platforms.forEach(this._spawnPlatform, this);
  this._spawnCharacters({hero: data.hero});
  // enables gravity
  const GRAVITY = 1200;
  this.game.physics.arcade.gravity.y = GRAVITY;
};

// create game entities and set up world here
PlayState.create = function() {
  // x, y co-ordinates and the asset key
  this.game.add.image(0, 0, 'background')
  this._loadLevel(this.game.cache.getJSON('level:1'));

  //create the sound entities
  this.sfx = {
    jump: this.game.add.audio('sfx:jump')
  };
};

PlayState.update = function() {
  this._handleCollisions();
  this._handleInput();
};

PlayState._handleCollisions = function() {
  this.game.physics.arcade.collide(this.hero, this.platforms);
};

PlayState._handleInput = function () {
    if (this.keys.left.isDown) { // move hero left
        this.hero.move(-1);
    }
    else if (this.keys.right.isDown) { // move hero right
        this.hero.move(1);
    }
    else {
      this.hero.move(0);
    }

    this.keys.up.onDown.add(function() {
      this.hero.jump();
    }, this);
};



window.onload = function() {
  // canvas dimensions, using a WebGL canvas, the div element in index html
  var game = new Phaser.Game(960, 600, Phaser.AUTO, 'game');
  game.state.add('play', PlayState);
  game.state.start('play');
}
