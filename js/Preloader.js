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
        this.load.image('titlescreen','');
        this.load.bitmapFont('eightbitwonder','assets/fonts/eightbitwonder.png','assets/fonts/eightbitwonder.fnt');
        this.load.image('worldmap', 'assets/NoUSA2.png');
        this.load.image('Selinie neutral', 'assets/Selinie neutral.png');
        this.load.image('Selinie sad', 'assets/Selinie sad.png');
        this.load.image('Selinie mad', 'assets/Selinie mad.png');
        this.load.image('Selinie happy', 'assets/Selinie happy.png');

        this.load.image('Ernesto neutral', 'assets/Ernesto neutral.png');
        this.load.image('Ernesto sad', 'assets/Ernesto sad.png');
        this.load.image('Ernesto mad', 'assets/Ernesto mad.png');
        this.load.image('Ernesto happy', 'assets/Ernesto happy.png');

        this.load.image('Amjad neutral', 'assets/Amjad neutral.png');
        this.load.image('Amjad sad', 'assets/Amjad sad.png');
        this.load.image('Amjad mad', 'assets/Amjad mad.png');
        this.load.image('Amjad happy', 'assets/Amjad happy.png');

        this.load.image('AmjadFF', 'assets/AmjadFF.png');
        this.load.image('ErnestoFF', 'assets/ErnestoFF.png');
        this.load.image('SelinieFF', 'assets/SelinieFF.png');

        this.load.image('HiSelinie', 'assets/HiSelinie.png');
        this.load.image('HiErnesto', 'assets/HiErnesto.png');
        this.load.image('HiAmjad', 'assets/HiAmjad.png');


        this.load.image('Mainland', 'assets/Mainland.png')
        this.load.image('Alaska', 'assets/Alaska.png')

        this.load.audio('select_audio', 'assets/audio/select.mp3'); //keep audio, click sound
        this.load.audio('game_audio', 'assets/audio/Fantasy Game Loop.wav'); //keep audio


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