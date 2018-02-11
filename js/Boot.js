/**
 * Created by mdaum on 10/10/2015.
 */
var BunnyDefender = {}; //name of game
BunnyDefender.Boot = function (game) {};
    BunnyDefender.Boot.prototype = {
        preload: function () {
            this.load.image('preloadBar', 'assets/loading.png');
            this.load.image('globeimage', 'assets/globe.png');
            this.load.image('titleimage','assets/whereamifrom.png') //where
        },
        create: function () {
            this.input.maxPointers = 1;
            this.stage.disableVisibilityChange = false;
            this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
            this.scale.minWidth = 700;
            this.scale.minHeight = 450;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.stage.forcePortrait = true;
            this.scale.setScreenSize(true);
            this.input.addPointer();
            this.stage.backgroundColor = '#000000';
            this.state.start('Preloader'); //starting preload state....
        }
    };