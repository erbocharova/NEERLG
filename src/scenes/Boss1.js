import Phaser from "phaser";

export default class Boss1 extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, key) {
        super(scene, x, y, 'idleBoss1', 0);

        scene.add.existing(this);
        scene.physics.add.existing(this, false);

        this.scene = scene;
        this.key = key;
        this.brunt = 40;
        this.sightRange = 100;
        this.healthPoints = 400;
        this.isAttacking = false;
        this.isTakingDamage = false;
        this.alive = true;

        this.setBodySize(80, 40);
        this.setBounce(0.1);
        this.setOffset(0);
        this.setCollideWorldBounds(true);

        this.createAnimations();
    }

    createAnimations() {
        const anims = this.scene.anims;

        anims.create({
            key: 'walkBoss1',
            frames: anims.generateFrameNumbers('boss1Spritesheet', { start: 6, end: 11 }),
            frameRate: 10,
            repeat: -1
        });
    
        anims.create({
            key: 'idleBoss1',
            frames: anims.generateFrameNumbers('boss1Spritesheet', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
    
        anims.create({
            key: 'attackBoss1',
            frames: anims.generateFrameNumbers('boss1Spritesheet', { start: 24, end: 29 }),
            frameRate: 10
        });

        anims.create({
            key: 'hurtBoss1',
            frames: anims.generateFrameNumbers('boss1Spritesheet', { start: 12, end: 13 }),
            frameRate: 10,
            repeat: -1
        });

        anims.create({
            key: 'deathBoss1',
            frames: anims.generateFrameNumbers('boss1Spritesheet', { start: 18, end: 23 }),
            frameRate: 10
        });
    }
    
    update(time, delta) {
        let enemyCenter = this.getCenter();
        let playerCenter = this.scene.player.getCenter();

        if (this.getCenter().y > 560) 
        {
            this.setCollideWorldBounds(false);
            this.healthPoints = 0;
        }

        if (this.healthPoints > 0){
            if (this.isTakingDamage)
            {
                this.play('hurtBoss1', true);
            }
            else if (Math.abs(enemyCenter.x - playerCenter.x) < this.sightRange)
            {
                if (this.checkOverlap(enemyCenter, playerCenter))
                {
                    if (!this.isAttacking && this.alive)
                    {
                        this.setVelocityX(0);
                        this.play('idleBoss1', true);
                        this.isAttacking = true;
                        let attackDelay = this.scene.time.delayedCall(500, () => this.attackPlayer(this.scene.player));
                    
                    }
                }
                else
                    this.moveToPlayer(enemyCenter, playerCenter);
            }
            else
            {
                this.setVelocityX(0);
                this.play('idleBoss1', true);
            }
        }
        else
        {
            this.setVelocityX(0);
            this.play('deathBoss1', true);
            this.alive = false;
            this.scene.enemiesList.splice(this.scene.enemiesList.indexOf(this), 1);
            let enemy1DestroyDelay = this.scene.time.delayedCall(1100, this.destroy());
        }
    }
  
    destroy() {
      super.destroy();
    }

    moveToPlayer(enemyCenter, playerCenter) {
        

        if (enemyCenter.x - playerCenter.x > 10)
        {
            this.moveLeft();
        }
        else if (enemyCenter.x - playerCenter.x < -10)
        {
            this.moveRight();
        }
        else
        {
            this.setVelocityX(0);
            this.play('idleBoss1', true);
        }
    }

    moveLeft()
    {
        this.setVelocityX(-20);
        this.play('walkBoss1', true);
        this.setFlipX(true);
    }

    moveRight()
    {
        this.setVelocityX(20);
        this.play('walkBoss1', true);
        this.setFlipX(false);
    }

    checkOverlap(enemyCenter, playerCenter)
    {
        return Math.abs(enemyCenter.x - playerCenter.x) < 10 && Math.abs(enemyCenter.y - playerCenter.y) < 10;
    }

    attackPlayer(player)
    {
        this.play('attackBoss1', true);

        if (this.checkOverlap(this.getCenter(), player.getCenter()))
        {
            player.takeDamage(this.brunt);
        }

        
        let timedEvent = this.scene.time.delayedCall(1000, () => this.isAttacking = false);
    }

    takeDamage(brunt)
    {
        this.isTakingDamage = true;
        this.healthPoints = this.healthPoints - brunt;
        let timedEvent = this.scene.time.delayedCall(600, () => this.isTakingDamage = false);
    }

  }
