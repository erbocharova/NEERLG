export default class Player{
    constructor(scene, x, y) {

        
        this.scene = scene;
        // Create the animations we need from the player spritesheet
        const anims = scene.anims;
        this.healthPoints = 1000;
        this.brunt = 50;
        this.isTakingDamage = false;
        this.alive = true;

        anims.create({
            key: 'run',
            frames: anims.generateFrameNumbers('playerRun', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
    
        anims.create({
            key: 'idle',
            frames: anims.generateFrameNumbers('playerIdle', { start: 0, end: 3 }),
            frameRate: 10
        });
    
        anims.create({
            key: 'jump',
            frames: anims.generateFrameNumbers('playerJump', { start: 0, end: 3 }),
            frameRate: 10,
        });

        anims.create({
            key: 'handHit',
            frames: anims.generateFrameNumbers('playerHandHit', { start: 0, end: 5}), 
            frameRate: 10
        });

        anims.create({
            key: 'legHit',
            frames: anims.generateFrameNumbers('playerLegHit', { start: 0, end: 5}), 
            frameRate: 10
        });

        anims.create({
            key: 'hurt',
            frames: anims.generateFrameNumbers('playerHurt', { start: 0, end: 1}), 
            frameRate: 10
        });

        anims.create({
            key: 'death',
            frames: anims.generateFrameNumbers('playerDeath', { start: 0, end: 5}),
            frameRate: 10
        })

        this.sprite = scene.physics.add
        .sprite(x, y, "playerIdle", 0)
        .setBodySize(10, 30)
        .setBounce(0.1)
        .setCollideWorldBounds(true);

        // Track the arrow keys & WASD
        const { LEFT, RIGHT, UP,  W, A, D, SPACE, ENTER, R, E } = Phaser.Input.Keyboard.KeyCodes;
        this.keys = scene.input.keyboard.addKeys({
            left: LEFT,
            right: RIGHT,
            up: UP,
            space: SPACE,
            enter: ENTER,
            w: W,
            a: A,
            d: D,
            e: E,
            r: R,
        });
    }
    


    update(time, delta) {
        const { keys, sprite } = this;

        let playerCenter = this.sprite.getCenter();

        if (this.isTakingDamage)
        {
            this.sprite.play('hurt', true);
        }
        else {
            if (keys.left.isDown) {
                sprite.setVelocityX(-100);
                if (sprite.body.onFloor()) {
                    sprite.play('run', true);
                }
            } 
            
            else if (keys.right.isDown) {
                sprite.setVelocityX(100);
                
                if (sprite.body.onFloor()) {
                    sprite.play('run', true);
                }
            } 

            else if (keys.e.isDown || keys.r.isDown) {
                if (keys.e.isDown)
                {
                    sprite.play('handHit', true);
                }
                else { 
                    sprite.play('legHit', true);
                }
                this.scene.enemiesList.forEach((enemy) =>
                    {
                        if (this.checkOverlap(enemy.sprite.getCenter(), playerCenter))
                            {
                                enemy.takeDamage(this.brunt);
                            }
                        
                    });
                }
            

            else {
                // If no keys are pressed, the player keeps still
                sprite.setVelocityX(0);
                // Only show the idle animation if the player is footed
                // If this is not included, the player would look idle while jumping
                if (sprite.body.onFloor()) {
                    sprite.play('idle', true);
                }
            }
            
            // Player can jump while walking any direction by pressing the space bar
            // or the 'UP' arrow
            if ((keys.space.isDown || keys.up.isDown) && sprite.body.onFloor()) {
                    //this.scene.jumpSound.play();

                    sprite.setVelocityY(-250);
                    sprite.play('jump', true);
            }

            
            if (sprite.body.velocity.x > 0) {
                sprite.setFlipX(false);
            } 
            else if (sprite.body.velocity.x < 0) {
                // otherwise, make them face the other side
                sprite.setFlipX(true);
            }
        }
    }

    takeDamage(brunt)
    {
        this.isTakingDamage = true;
        this.healthPoints -= brunt;
        let timedEvent = this.scene.time.delayedCall(600, () => this.isTakingDamage = false);
    }

    checkOverlap(enemyCenter, playerCenter)
    {
        return Math.abs(enemyCenter.x - playerCenter.x) < 10 && Math.abs(enemyCenter.y - playerCenter.y) < 10;
    }

  
    destroy() {
      this.sprite.destroy();
    }
  }