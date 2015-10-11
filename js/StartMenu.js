/**
 * Created by mdaum on 10/11/2015.
 */
BunnyDefender.StartMenu=function(game){
    this.startBG;
    this.startBG2;
    this.startPrompt;
    this.ding;
};
BunnyDefender.StartMenu.prototype = {

    create: function () {
        startBG = this.add.image(this.world.centerX-100, this.world.centerY-120, 'titlescreen'); //top left hand corner
        startBG2= this.add.image(this.world.centerX-325,this.world.centerY-320,'titleimage');
        startBG.inputEnabled = true; //now we can accept clicks/touches
        startBG.events.onInputDown.addOnce(this.startGame, this); //will happen when input happens

        startPrompt = this.add.bitmapText(this.world.centerX-240, this.world.centerY+180, 'eightbitwonder', 'Touch Center to Start!', 24);
        this.ding = this.add.audio('select_audio');
    },

    startGame: function (pointer) { //takes in a click...
        this.ding.play();
        this.state.start('Game'); //now we finally build the game....
    }
};