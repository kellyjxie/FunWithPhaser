/**
 * Created by mdaum on 10/11/2015.
 */
BunnyDefender.Preloader = function (game) {
    this.preloadBar = null;
    this.titleText = null;
    this.ready = false;
};

BunnyDefender.Preloader.prototype = {
    preload: function () {
        this.preloadBar=this.add.sprite(this.world.centerX,this.world.centerY,'preloaderBar');
        this.preloadBar.anchor.setTo(0.5,0.5); //transform point is center of object
        this.load.setPreloadSprite(this.preloadBar);
        this.titleText=this.add.image(this.world.centerX,this.world.centerY-220,'titleimage');
        this.titleText.anchor.setTo(0.5,0.5);
        this.load.image('titlescreen','assets/titlescreen.png');
        this.load.bitmapFont('eightbitwonder','assets/fonts/eightbitwonder.png','assets/fonts/eightbitwonder.fnt');
    },
    create: function () {
        this.preloadBar.cropEnabled=false; //we no longer need to crop after bar is sized
    },
    update: function () { //this function will run automatically after create finishes....
        this.ready=true; //update function will run after
        this.state.start('StartMenu');
    }
};