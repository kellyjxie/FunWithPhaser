/**
 * Created by mdaum on 10/11/2015.
 */
BunnyDefender.SelinieGame = function (game) {
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
BunnyDefender.SelinieGame.prototype = {
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

        selinieneutral = this.add.image(0, 648,'Selinie neutral');selinieneutral.scale.setTo(0.2,0.2)
        selinieneutral.visible=true;
        seliniesad = this.add.image(0,648, 'Selinie sad'); seliniesad.scale.setTo(0.2, 0.2)
        seliniesad.visible = false;
        seliniemad = this.add.image(0,648, 'Selinie mad'); seliniemad.scale.setTo(0.2,0.2)
        seliniemad.visible=false;
        seliniehappy  = this.add.image(0,648, 'Selinie happy'); seliniehappy.scale.setTo(0.2, 0.2)
        seliniehappy.visible = false;
        selinieFF = this.add.image(55, 590, 'SelinieFF'); selinieFF.scale.setTo(.5,.5)
        selinieFF.visible = false;
        selinieHi = this.add.image(55, 590, 'HiSelinie'); selinieHi.scale.setTo(.5,.5)
        selinieHi.visible = true;
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
            selinieHi.visible = false;
            seliniesad.visible =true;
            selinieneutral.visible=false;
            this.countdown.setText('Tries Left '+this.totalTries);
        }
        else if(this.totalTries == 1){
            //this.totalTries--;
            seliniemad.visible=true;
            seliniesad.visible=false;
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
        seliniehappy.visible=true;
        selinieneutral.visible=false;
        seliniesad.visible=false;
        seliniemad.visible=false;
        selinieHi.visible = false;
        this.congratulations=this.add.bitmapText(100, 300,'eightbitwonder','Good job!',42); // number of tries left
        selinieFF.visible = true;
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
        this.state.start('ErnestoGame');
    },

};



