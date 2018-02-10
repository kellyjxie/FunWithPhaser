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
        this.titleText=this.add.image(this.world.centerX-370,this.world.centerY-200,'globeimage'); //globe
        this.titleText=this.add.image(this.world.centerX,this.world.centerY-300,'titleimage');this.titleText.scale.setTo(0.7,0.7); //whereiamfrom
        this.titleText.anchor.setTo(0.5,0.5);
        this.load.image('titlescreen','assets/globalimage.png');
        this.load.bitmapFont('eightbitwonder','assets/fonts/eightbitwonder.png','assets/fonts/eightbitwonder.fnt');
        this.load.image('hill','assets/hill.png');
        this.load.image('sky','assets/sky.png');
        this.load.atlasXML('bunny','assets/spritesheets/bunny.png','assets/spritesheets/bunny.xml');
        this.load.atlasXML('spacerock','assets/spritesheets/spacerock.png','assets/spritesheets/spacerock.xml');
        this.load.image('explosion','assets/explosion.png');
        this.load.image('ghost','assets/ghost.png');
        this.load.audio('explosion_audio', 'assets/audio/explosion.mp3');
        this.load.audio('hurt_audio', 'assets/audio/hurt.mp3');
        this.load.audio('select_audio', 'assets/audio/select.mp3');
        this.load.audio('game_audio', 'assets/audio/mustardgas.mp3');


    },
    create: function () {
        this.preloadBar.cropEnabled=false; //we no longer need to crop after bar is sized
    },
    update: function () { //this function will run automatically after create finishes....
        if(this.cache.isSoundDecoded('game_audio')&&this.ready==false) {
            this.ready = true;
            this.state.start('StartMenu');
        }
    }
};