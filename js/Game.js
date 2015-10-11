/**
 * Created by mdaum on 10/11/2015.
 */
BunnyDefender.Game = function (game) {
    this.totalBunnies;
    this.bunnyGroup;
    this.totalSpacerocks;
    this.spacerockgroup;
    this.burst;//emitter
    this.gameover;
    this.countdown;
    this.overmessage;
    this.secondsElapsed;
    this.timer;
    this.music;
    this.ouch;
    this.boom;
    this.ding;
};
BunnyDefender.Game.prototype = {
    create: function () {
        this.totalBunnies = 20;
        this.totalSpacerocks = 13;
        this.gameover = false;
        this.secondsElapsed=0;
        this.timer=this.time.create(false);//don't remove yourself from game after it is out!
        this.timer.loop(1000,this.updateSeconds,this);//every second run this method
        this.music = this.add.audio('game_audio');
        this.music.play('', 0, 0.3, true);   //marker, position, volume, loop
        this.ouch = this.add.audio('hurt_audio');
        this.boom = this.add.audio('explosion_audio');
        this.ding = this.add.audio('select_audio');
        this.buildWorld();

    },
    updateSeconds:function(){
    this.secondsElapsed++;
},
    buildWorld: function () { //building background first
        this.add.image(0, 0, 'sky');
        this.add.image(0, 800, 'hill');
        this.buildBunnies();
        this.buildSpaceRocks();
        this.buildEmitter();
        this.countdown=this.add.bitmapText(10,10,'eightbitwonder','Bunnies Left '+this.totalBunnies,20);
        this.timer.start();
    },
    buildBunnies: function () { //and now the bunnies
        this.bunnygroup = this.add.group(); //control all bunnies at once
        this.bunnygroup.enableBody = true; //can now interact w/ other objects
        for (var i = 0; i < this.totalBunnies; i++) {
            var b = this.bunnygroup.create(this.rnd.integerInRange(-10, this.world.width - 50), this.rnd.integerInRange(this.world.height - 180, this.world.height - 60), 'bunny', 'Bunny0000'); //random numbers needed here to find initial position...
            b.anchor.setTo(0.5, 0.5);
            b.body.moves = false;//physics engine will not touch this, ie we can move this manually
            b.animations.add('Rest', this.game.math.numberArray(1, 58)); //resting,the numbers correspond to frames in our texture atlas
            b.animations.add('Walk', this.game.math.numberArray(68, 107)); //walking
            b.animations.play('Rest', 24, true);
            this.assignBunnyMovement(b);
        } //creating each bunny
    },
    assignBunnyMovement: function (b) {
        bposition = Math.floor(this.rnd.realInRange(50, this.world.width - 50)); //pos bunny will move to
        bdelay = this.rnd.integerInRange(2000, 6000); //when they start moving
        if (bposition < b.x) { //what direction should bunny face??
            b.scale.x = 1; //keep image
        } else {
            b.scale.x = -1;//flip image FROM ANCHOR POINT
        }
        t = this.add.tween(b).to({x: bposition}, 3500, Phaser.Easing.Quadratic.InOut, true, bdelay);//tween.to(where you wanna move,how long you tween,tweening function to make movement natural,autostart?,delay)
        t.onStart.add(this.startBunny, this); //when it is time to tween a bunny, we call function on current bunny
        t.onComplete.add(this.stopBunny, this);
    },

    startBunny: function (b) { //stop resting, start walking
        b.animations.stop('Rest');
        b.animations.play('Walk', 24, true);//24 fps, autoloop (if animation ends it loops until we stop)
    },

    stopBunny: function (b) {
        b.animations.stop('Walk');
        b.animations.play('Rest', 24, true);
        this.assignBunnyMovement(b); //now we figure out where bunny will go next!
    },
    buildSpaceRocks: function () {
        this.spacerockgroup = this.add.group();
        for (var i = 0; i < this.totalSpacerocks; i++) {
            var r = this.spacerockgroup.create(this.rnd.integerInRange(0, this.world.width), this.rnd.realInRange(-1500, 0), 'spacerock', 'SpaceRock0000');//where we gonna put it?
            var scale = this.rnd.realInRange(0.3, 1.0); //how big?
            r.scale.x = scale; //scaling its x and y the same
            r.scale.y = scale;
            this.physics.enable(r, Phaser.Physics.ARCADE);//giving it the whole arcade physics library, easy!
            r.enableBody = true;
            r.body.velocity.y = this.rnd.integerInRange(200, 400); //assigning velocity in y direction
            r.animations.add('Fall'); //fall animation already defined
            r.animations.play('Fall', 24, true);
            r.checkWorldBounds = true;//will fire event when rock leaves world bounds
            r.events.onOutOfBounds.add(this.resetRock, this);//duh
        }
    },
    resetRock: function (r) { //reseting the rock, passing in rock
        if (r.y > this.world.height) { //making sure it left for real
            this.respawnRock(r);
        }
    },

    respawnRock: function (r) { //respawing the rock
        if (!this.gameover) {
            r.reset(this.rnd.integerInRange(0, this.world.width), this.rnd.realInRange(-1500, 0));
            //this is a phaser function that says where we throw it now....same object....
            r.body.velocity.y = this.rnd.integerInRange(200, 400); // reseting its velocity
        }
    },
    buildEmitter: function () {
        this.burst = this.add.emitter(0, 0, 80);//this makes the burst object an emitter(where you want it xy, how many particles at a time)
        this.burst.minParticleScale = 0.3; //smallest
        this.burst.maxParticleScale = 1.2;//biggest
        this.burst.minParticleSpeed.setTo(-30, 30);
        this.burst.maxParticleSpeed.setTo(30, -30);
        this.burst.makeParticles('explosion');//what image we make particles out of
        this.input.onDown.add(this.fireBurst, this);//so on an input down we add the response....
    },

    fireBurst: function (pointer) { //pointer knows the event, i.e the mouseclick pos
        if (!this.gameover) {
            this.boom.play();
            this.boom.volume = 0.2;
            this.burst.emitX = pointer.x;
            this.burst.emitY = pointer.y;//now we have our cordinates and we start the burst
            this.burst.start(true, 2000, null, 20);//true determines whether burst acts as explosion or not...so all at once or gradual? , lifespan of each particle, frequency our emitter emits (not needed here), quantity per click.... so based on this we can do 4 particle bursts at once...
        }
    },
    burstCollision: function (r, b) {
        this.respawnRock(r);
    },

    bunnyCollision: function (r, b) {
        if (b.exists) {
            this.respawnRock(r);
            this.makeGhost(b);
            this.ouch.play();
            b.kill();//will eliminate the sprite
            this.totalBunnies--;
            this.checkBunniesLeft();
        }
    },
    checkBunniesLeft: function () {
        if (this.totalBunnies == 0) {
            this.music.stop();
            this.gameover = true;//game over
            this.countdown.setText('Bunnies Left 0');
            this.overmessage = this.add.bitmapText(this.world.centerX-180, this.world.centerY-40, 'eightbitwonder', 'GAME OVER\n\n' + this.secondsElapsed, 42);//showing score under...
            this.overmessage.align = "center";
            this.overmessage.inputEnabled = true;
            this.overmessage.events.onInputDown.addOnce(this.quitGame, this); //after you click we quit game...only once....
        }
        else{
            this.countdown.setText('Bunnies Left '+this.totalBunnies);
        }
    },
    friendlyFire: function (b, e) {
        if (b.exists) {
            this.makeGhost(b);
            this.ouch.play();
            b.kill();
            this.totalBunnies--;
            this.checkBunniesLeft();
        }
    },
    makeGhost: function (b) {//passing in dead bunny
        bunnyghost = this.add.sprite(b.x - 20, b.y - 180, 'ghost');
        bunnyghost.anchor.setTo(0.5, 0.5);
        bunnyghost.scale.x = b.scale.x;//faces same place the bunny was
        this.physics.enable(bunnyghost, Phaser.Physics.ARCADE); //arcade physics
        bunnyghost.enableBody = true;
        bunnyghost.checkWorldBounds = true;
        bunnyghost.body.velocity.y = -800; //very fast upwards
    },
    quitGame: function(pointer) { //on the click we start everything over....
        this.ding.play();
        this.state.start('StartMenu');
    },
    update: function () {//here we check for collisions...
        this.physics.arcade.overlap(this.spacerockgroup, this.burst, this.burstCollision, null, this);
        this.physics.arcade.overlap(this.spacerockgroup, this.bunnygroup, this.bunnyCollision, null, this);
        this.physics.arcade.overlap(this.bunnygroup, this.burst, this.friendlyFire, null, this);
    }
};