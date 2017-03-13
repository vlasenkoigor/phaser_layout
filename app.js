var WIDTH = 960,
    HEIGHT = 540;
var game = new Phaser.Game(WIDTH, HEIGHT, Phaser.AUTO,null, {preload : preload, create : create, update : update}, false);

var sprites = [];
// function sizeChange(){
//     console.log(game.scale.screenOrientation);
//
// }

function preload() {

    game.load.image('cub', 'cub.png');
    game.load.image('rect', 'rect.png');
    game.load.image('circle', 'circle.png');
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    // game.scale.pageAlignVertically = true;
    // game.scale.forceOrientation(false, true);
    // game.scale.onSizeChange.add(sizeChange);
    game.scale.onOrientationChange.add(orientationChange);

}
function orientationChange(){
    console.log(game.scale.isPortrait);
    if (game.scale.isPortrait){
        game.width = HEIGHT;
        game.height = WIDTH*0.8;

        // game.world.resize(game.width, game.height);
        // game.renderer.resize(game.width,game.height);
        game.scale.setGameSize(game.width,game.height)

    } else {
        game.width = WIDTH;
        game.height = HEIGHT;
        // game.world.resize(game.width, game.height);
        // game.renderer.resize(game.width,game.height);
        game.scale.setGameSize(game.width,game.height)

    }
 
}

function create() {


   // var left = game.add.sprite(0,0,'cub')
   //  left.getFlexibleXY = function () {
   //      return {x : 0, y :0}
   //  };
   //  left.x = left.getFlexibleXY().x;
   //  left.y = left.getFlexibleXY().y;
   //  sprites.push(left);
   //
    var rect = game.add.sprite(game.world.centerX, game.world.centerY, 'rect');
    rect.getFlexibleXY = function () {
        var portrait = game.scale.isPortrait;
        return {x : portrait ? game.width/2 : 320, y : portrait ? game.height/2 + 100 : game.height/2}
    };

    rect.x = rect.getFlexibleXY().x;
    rect.y = rect.getFlexibleXY().y;
    rect.anchor.set(.5);
    rect._sr = 0.1;
    rect._cr = 101;
    rect.updateTransform();
    console.log(rect._sr);
    console.log(rect._cr);

    sprites.push(rect);

    var circle = game.add.sprite(0, 0, 'circle');
    circle.getFlexibleXY = function () {
        var portrait = game.scale.isPortrait;
        return {x : portrait ? game.width/2  : game.width - 200, y : portrait ? 150 : game.height/2}
    };
    circle.x = rect.getFlexibleXY().x;
    circle.y = rect.getFlexibleXY().y;
    circle.anchor.set(.5);
    sprites.push(circle);

    game.scale.onOrientationChange.dispatch();
}

function update() {
    // console.log(game.scale.isPortrait);

}

var old_cunstruct = PIXI.DisplayObject;

PIXI.DisplayObject = function () {
    var args = Array.prototype.slice.call(arguments);
    old_cunstruct.apply(this, arguments);
    console.log('DO create');
    this.getFlexibleXY = function () {
        return {x : this.x, y : this.y}
    };

    this._onOrientationChange = function () {
        var pos = this.getFlexibleXY();
        this.x = pos.x;
        this.y = pos.y;
    };

    game.scale.onOrientationChange.add(this._onOrientationChange, this);
};