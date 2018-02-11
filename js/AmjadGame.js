/**
 * Created by mdaum on 10/11/2015.
 */
BunnyDefender.AmjadGame = function (game) {
    this.totalTries;
    this.gameover;
    this.countdown;
    this.overmessage;
    this.timer;
    this.music;
    this.ouch;
    this.boom;
    this.ding;
    this.congratulations;
};
BunnyDefender.AmjadGame.prototype = {
    create: function () {
        this.totalTries = 3;
        this.gameover = false;
        this.timer=this.time.create(false);//don't remove yourself from game after it is out!
        this.timer.loop(1000,this.updateSeconds,this);//every second run this method
        this.music = this.add.audio('game_audio');
        this.music.play('', 0, 0.3, true);   //marker, position, volume, loop
        this.ouch = this.add.audio('hurt_audio');
        this.boom = this.add.audio('select_audio'); 
        this.ding = this.add.audio('select_audio');
        this.scale.minWidth = 700;
        this.scale.minHeight = 550;        
        this.buildWorld();

    },

    // buildWorld: function () { //building background first
    //     this.add.image(0, 0, 'sky');
    //     this.add.image(0, 800, 'hill');
    //     this.buildEmitter(); //shows burst
    //     this.timer.start(); //dont need timer
    // },


    buildWorld: function() { //building background
        worldmap = this.add.image(-65, 0 , 'worldmap');worldmap.scale.setTo(0.65, 1)
        worldmap.inputEnabled = true;
        worldmap.events.onInputDown.add(this.decreaseTries, this);
        usa = this.add.image(72,361, 'Mainland');usa.scale.setTo(0.65, 1)
        alaska = this.add.image(9, 258, 'Alaska');alaska.scale.setTo(0.65, 1)
        usa.inputEnabled = true;
        alaska.inputEnabled = true;

        usa.events.onInputDown.add(this.win, this);
        alaska.events.onInputDown.add(this.win, this);

        amjadneutral = this.add.image(0, 648,'Amjad neutral');amjadneutral.scale.setTo(0.2,0.2)
        amjadneutral.visible=true;
        amjadsad = this.add.image(0,648, 'Amjad sad'); amjadsad.scale.setTo(0.2, 0.2)
        amjadsad.visible = false;
        amjadmad = this.add.image(0,648, 'Amjad mad'); amjadmad.scale.setTo(0.2,0.2)
        amjadmad.visible=false;
        amjadhappy  = this.add.image(0,648, 'Amjad happy'); amjadhappy.scale.setTo(0.2, 0.2)
        amjadhappy.visible = false;

        amjadFF = this.add.image(55, 590, 'AmjadFF'); amjadFF.scale.setTo(.5,.5)
        amjadFF.visible = false;
        amjadHi = this.add.image(55, 590, 'HiAmjad'); amjadHi.scale.setTo(.5,.5)
        amjadHi.visible = true;
        this.countdown=this.add.bitmapText(20,20,'eightbitwonder','Tries Left '+this.totalTries,20); // number of tries left

    },

    decreaseTries: function() {
       //this.countdown.setText('Tries Left '+this.totalTries);
        this.totalTries--;
        /*if (this.totalTries == 3){
            this.totalTries--;
            //this.countdown.setText('Tries Left '+this.totalTries);
        }
        else*/ if(this.totalTries == 2){
            //this.totalTries--;
            amjadHi.visible =false;
            amjadsad.visible =true;
            amjadneutral.visible=false;
            this.countdown.setText('Tries Left '+this.totalTries);
        }
        else if(this.totalTries == 1){
            //this.totalTries--;
            amjadmad.visible=true;
            amjadsad.visible=false;
            this.countdown.setText('Tries Left '+this.totalTries);
        }
        else{
            this.music.stop();
            this.countdown.setText('Tries Left 0');
            this.overmessage = this.add.bitmapText(100, 300, 'eightbitwonder', 'GAME OVER\n\n', 42);//showing score under...
            this.overmessage.align = "center";
            this.overmessage.inputEnabled = true;
            this.overmessage.events.onInputDown.addOnce(this.quitGame, this); //after you click we quit game...only once....        
        }
    },

    win: function(){
        amjadhappy.visible=true;
        amjadneutral.visible=false;
        amjadsad.visible=false;
        amjadmad.visible=false;
        amjadHi.visible =false;
        amjadFF.visible = true;
        this.congratulations=this.add.bitmapText(100, 250,'eightbitwonder','You got it!',42); // number of tries left
        this.continue = this.add.bitmapText(170,400, 'eightbitwonder', 'Continue', 20);
        this.continue.inputEnabled = true;
        this.continue.events.onInputDown.addOnce(this.quitGame, this); //after you click we quit game...only once...
     },


    // checkTriesLeft: function () {
    //     if (this.totalTries <= 0) {
    //         this.music.stop();
    //         this.countdown.setText('Tries Left 0');
    //         this.overmessage = this.add.bitmapText(this.world.centerX, this.world.centerY, 'eightbitwonder', 'GAME OVER\n\n', 42);//showing score under...
    //         this.overmessage.align = "center";
    //         this.overmessage.inputEnabled = true;
    //         this.overmessage.events.onInputDown.addOnce(this.quitGame, this); //after you click we quit game...only once....
    //     }
    // },


    quitGame: function(pointer) { //on the click we start everything over....
        this.ding.play();
        this.state.start('StartMenu');
    },

};



