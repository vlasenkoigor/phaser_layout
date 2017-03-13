var WIDTH = 960,
    HEIGHT = 540;
var game = new Phaser.Game(WIDTH, HEIGHT, Phaser.AUTO,null, {preload : preload, create : create, update : update}, true);

var sprites = [];
// function sizeChange(){
//     console.log(game.scale.screenOrientation);
//
// }
function orientationChange(){
    console.log(game.scale.isPortrait);
    if (game.scale.isPortrait){
        game.width = HEIGHT;
        game.height = WIDTH;

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

    sprites.forEach(function (e) {
        console.log(e.getXY());

        e.x = e.getXY().x;
        e.y = e.getXY().y;
    })

}

function preload() {

    game.load.image('cub', 'cub.png');
    game.load.image('rect', 'rect.png');
    game.load.image('circle', 'circle.png');
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    // game.scale.forceOrientation(false, true);
    // game.scale.onSizeChange.add(sizeChange);
    game.scale.onOrientationChange.add(orientationChange);

}
function create() {


   // var left = game.add.sprite(0,0,'cub')
   //  left.getXY = function () {
   //      return {x : 0, y :0}
   //  };
   //  left.x = left.getXY().x;
   //  left.y = left.getXY().y;
   //  sprites.push(left);
   //
    var rect = game.add.sprite(game.world.centerX, game.world.centerY, 'rect');
    rect.getXY = function () {
        var portrait = game.scale.isPortrait;
        return {x : portrait ? game.width/2 : 320, y :game.height/2}
    };

    rect.x = rect.getXY().x;
    rect.y = rect.getXY().y;
    rect.anchor.set(.5);
    rect._sr = 0.1;
    rect._cr = 101;
    rect.updateTransform();
    console.log(rect._sr);
    console.log(rect._cr);

    sprites.push(rect);

    var circle = game.add.sprite(0, 0, 'circle');
    circle.getXY = function () {
        var portrait = game.scale.isPortrait;
        return {x : portrait ? game.width/2  : game.width - 200, y : portrait ? 150 : game.height/2}
    };
    circle.x = rect.getXY().x;
    circle.y = rect.getXY().y;
    circle.anchor.set(.5);
    sprites.push(circle);


    // var right = game.add.sprite(game.width,game.height,'cub');
    //
    // right.getXY = function () {
    //     return {x : game.width, y :game.height}
    // };
    // right.x = right.getXY().x;
    // right.y = right.getXY().y;
    //
    // right.anchor.set(1);

    // sprites.push(right);
    orientationChange();
}

function update() {
    // console.log(game.scale.isPortrait);

}

