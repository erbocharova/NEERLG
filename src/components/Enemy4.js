import Phaser from "phaser";
import HealthPickup from "./HealthPickup";

export default class Enemy3 extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, key) {
        super(scene, x, y, 'idleEnemy4', 0);

        scene.add.existing(this);
        scene.physics.add.existing(this, false);

        this.scene = scene;
        this.key = key;
        this.brunt = 30;
        this.sightRange = 64;
        this.healthPoints = 200;
        this.isAttacking = false;
        this.isTakingDamage = false;
        this.alive = true;

        this.setBodySize(40, 25);
        this.setOffset(0);
        this.setCollideWorldBounds(true);

        this.createAnimations();
        this.on('animationcomplete', this.onAnimationComplete, this);
    }

    createAnimations() {
        const anims = this.scene.anims;
    
        anims.create({
            key: 'idleEnemy4',
            frames: anims.generateFrameNumbers('enemy4Spritesheet', { start: 0, end: 3 }),
            frameRate: 12,
            repeat: -1
        });
    
        anims.create({
            key: 'attackEnemy4',
            frames: anims.generateFrameNumbers('enemy4Spritesheet', { start: 4, end: 7 }),
            frameRate: 12,
            //repeat: -1
        });

        anims.create({
            key: 'hurtEnemy4',
            frames: anims.generateFrameNumbers('enemy4Spritesheet', { start: 8, end: 9 }),
            frameRate: 12,
            repeat: -1
        });

        anims.create({
            key: 'deathEnemy4',
            frames: anims.generateFrameNumbers('enemy4Spritesheet', { start: 12, end: 13 }),
            frameRate: 12,
        })
    }
    
    update(time, delta) {
        let enemyCenter = this.getCenter();
        let playerCenter = this.scene.player.getCenter();

        if (this.healthPoints > 0){
            if (this.isTakingDamage)
            {
                this.play('hurtEnemy4', true);
            }
            else if (Math.abs(enemyCenter.x - playerCenter.x) < this.sightRange)
            {
                if (!this.isAttacking && this.alive)
                    {
                        this.play('idleEnemy4', true);
                        this.isAttacking = true;
                        let attackDelay = this.scene.time.delayedCall(500, () => this.attackPlayer(this.scene.player));
                    
                    }
            }
            else
            {
                this.play('idleEnemy4', true);
            }
        }
        else
        {
            this.die();
        }
    }
  
    onAnimationComplete(animation) {
        if (animation.key === 'deathEnemy4') {
            this.anims.stop();
            this.setFrame(13);
            this.setActive(false);
        }
    }
  
    die() {
        this.play('deathEnemy4', true);
        this.alive = false;
    }

    checkOverlap(enemyCenter, playerCenter)
    {
        return Math.abs(enemyCenter.x - playerCenter.x) < 10 && Math.abs(enemyCenter.y - playerCenter.y) < 10;
    }

    attackPlayer(player)
    {
        this.play('attackEnemy4', true);

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

