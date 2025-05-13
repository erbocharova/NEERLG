import Phaser from "phaser";
import HealthPickup from "./HealthPickup";

export default class Enemy3 extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, key) {
        super(scene, x, y, 'enemyIdle3', 0);

        scene.add.existing(this);
        scene.physics.add.existing(this, false);

        this.scene = scene;
        this.key = key;
        this.brunt = 20;
        this.sightRange = 64;
        this.healthPoints = 100;
        this.isAttacking = false;
        this.isTakingDamage = false;
        this.alive = true;

        this.setBodySize(40, 46);
        this.setBounce(0.1);
        this.setOffset(0);
        this.setCollideWorldBounds(true);

        this.createAnimations();
        this.on('animationcomplete', this.onAnimationComplete, this);
    }

    createAnimations() {
        const anims = this.scene.anims;

        anims.create({
            key: 'walkEnemy3',
            frames: anims.generateFrameNumbers('enemy3Spritesheet', { start: 6, end: 11 }),
            frameRate: 12,
            repeat: -1
        });
    
        anims.create({
            key: 'idleEnemy3',
            frames: anims.generateFrameNumbers('enemy3Spritesheet', { start: 0, end: 3 }),
            frameRate: 12,
            repeat: -1
        });
    
        anims.create({
            key: 'attackEnemy3',
            frames: anims.generateFrameNumbers('enemy3Spritesheet', { start: 24, end: 29 }),
            frameRate: 12,
            //repeat: -1
        });

        anims.create({
            key: 'hurtEnemy3',
            frames: anims.generateFrameNumbers('enemy3Spritesheet', { start: 12, end: 13 }),
            frameRate: 12,
            repeat: -1
        });

        anims.create({
            key: 'deathEnemy3',
            frames: anims.generateFrameNumbers('enemy3Spritesheet', { start: 18, end: 23 }),
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
                this.play('hurtEnemy3', true);
            }
            else if (Math.abs(enemyCenter.x - playerCenter.x) < this.sightRange)
            {
                if (this.checkOverlap(enemyCenter, playerCenter))
                {
                    if (!this.isAttacking && this.alive)
                    {
                        this.setVelocityX(0);
                        this.play('idleEnemy3', true);
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
                this.play('idleEnemy3', true);
            }
        }
        else
        {
            this.setVelocityX(0);
            this.die();
        }
    }
  
    onAnimationComplete(animation) {
        if (animation.key === 'deathEnemy3') {
            this.anims.stop();
            this.setFrame(23); // Фиксация последнего кадра
            this.setActive(false);
            this.spawnHealthPickup(this.x, this.y);
        }
    }
  
    die() {
        this.play('deathEnemy3', true);
        this.alive = false;
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
            this.play('idleEnemy3', true);
        }
    }

    moveLeft()
    {
        this.setVelocityX(-20);
        this.play('walkEnemy3', true);
        this.setFlipX(true);
    }

    moveRight()
    {
        this.setVelocityX(20);
        this.play('walkEnemy3', true);
        this.setFlipX(false);
    }

    checkOverlap(enemyCenter, playerCenter)
    {
        return Math.abs(enemyCenter.x - playerCenter.x) < 10 && Math.abs(enemyCenter.y - playerCenter.y) < 10;
    }

    attackPlayer(player)
    {
        this.play('attackEnemy3', true);

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

    spawnHealthPickup(x, y) {
        const healthPickup = this.scene.healthPickupGroup.getFirstDead();
        healthPickup.setPosition(x, y);
        healthPickup.setVisible(true);
        healthPickup.setActive(true);
        healthPickup.isActive = true;
        healthPickup.startBounce();

    }

  }

