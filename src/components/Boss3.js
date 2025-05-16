import Phaser from "phaser";

export default class Boss3 extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, key) {
        super(scene, x, y, 'idleBoss3', 0);

        scene.add.existing(this);
        scene.physics.add.existing(this, false);

        this.scene = scene;
        this.key = key;
        this.brunt = 40;
        this.sightRange = 100;
        this.healthPoints = 2000;
        this.isAttacking = false;
        this.isTakingDamage = false;
        this.alive = true;

        this.setBodySize(80, 50);
        this.setBounce(0.1);
        this.setOffset(0);
        this.setCollideWorldBounds(true);

        this.createAnimations();
        this.on('animationcomplete', this.onAnimationComplete, this);
    }

    createAnimations() {
        const anims = this.scene.anims;
    
        anims.create({
            key: 'idleBoss3',
            frames: anims.generateFrameNumbers('boss3Spritesheet', { start: 0, end: 3 }),
            frameRate: 12,
            repeat: -1
        });

        anims.create({
            key: 'walkBoss3',
            frames: anims.generateFrameNumbers('boss3Spritesheet', { start: 6, end: 9 }),
            frameRate: 12,
            repeat: -1
        });
    
        anims.create({
            key: 'attackBoss3',
            frames: anims.generateFrameNumbers('boss3Spritesheet', { start: 12, end: 17 }),
            frameRate: 12
        });

        anims.create({
            key: 'specialAttackBoss3',
            frames: anims.generateFrameNumbers('boss3Spritesheet', { start: 18, end: 23 }),
            frameRate: 12
        });

        anims.create({
            key: 'hurtBoss3',
            frames: anims.generateFrameNumbers('boss3Spritesheet', { start: 24, end: 25 }),
            frameRate: 12,
            repeat: -1
        });

        anims.create({
            key: 'deathBoss3',
            frames: anims.generateFrameNumbers('boss3Spritesheet', { start: 30, end: 35 }),
            frameRate: 12
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
                this.play('hurtBoss3', true);
            }
            else if (Math.abs(enemyCenter.x - playerCenter.x) < this.sightRange)
            {
                if (this.checkOverlap(enemyCenter, playerCenter))
                {
                    if (!this.isAttacking && this.alive)
                    {
                        this.setVelocityX(0);
                        this.play('idleBoss3', true);
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
                this.play('idleBoss3', true);
            }
        }
        else
        {
            this.setVelocityX(0);
            this.die();
        }
    }
  
    onAnimationComplete(animation) {
        if (animation.key === 'deathBoss3') {
            this.anims.stop();
            this.setFrame(35);
            this.setActive(false);
        }
    }
  
    die() {
        this.play('deathBoss3', true);
        this.alive = false;
    }

    moveToPlayer(enemyCenter, playerCenter) {
        if (enemyCenter.x - playerCenter.x > 20)
        {
            this.moveLeft();
        }
        else if (enemyCenter.x - playerCenter.x < -20)
        {
            this.moveRight();
        }
        else
        {
            this.setVelocityX(0);
            this.play('idleBoss3', true);
        }
    }

    moveLeft()
    {
        this.setVelocityX(-20);
        this.play('walkBoss3', true);
        this.setFlipX(true);
    }

    moveRight()
    {
        this.setVelocityX(20);
        this.play('walkBoss3', true);
        this.setFlipX(false);
    }

    checkOverlap(enemyCenter, playerCenter)
    {
        return Math.abs(enemyCenter.x - playerCenter.x) < 20 && Math.abs(enemyCenter.y - playerCenter.y) < 20;
    }

    attackPlayer(player)
    {
        this.play('attackBoss3', true);

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
