import Phaser from "phaser";

export default class Enemy1 extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, key) {
        super(scene, x, y, 'enemyIdle1', 0);
        
        scene.add.existing(this);
        scene.physics.add.existing(this, false);

        this.scene = scene;
        this.key = key;
        this.brunt = 10;
        this.sightRange = 64;
        this.healthPoints = 50;
        this.isAttacking = false;
        this.isTakingDamage = false;
        this.alive = true;

        this.setBodySize(20, 25);
        this.setBounce(0.1);
        this.setOffset(0);
        this.setCollideWorldBounds(true);

        this.createAnimations();
        this.on('animationcomplete', this.onAnimationComplete, this);
    }

    createAnimations() {
        const anims = this.scene.anims;  

        anims.create({
            key: 'idleEnemy1',
            frames: anims.generateFrameNumbers('enemy1Spritesheet', { start: 0, end: 3 }),
            frameRate: 12
        });
    
        anims.create({
            key: 'attackEnemy1',
            frames: anims.generateFrameNumbers('enemy1Spritesheet', { start: 6, end: 11 }),
            frameRate: 12,
            //repeat: -1
        });

        anims.create({
            key: 'walkEnemy1',
            frames: anims.generateFrameNumbers('enemy1Spritesheet', { start: 12, end: 17 }),
            frameRate: 12,
            repeat: -1
        });

        anims.create({
            key: 'hurtEnemy1',
            frames: anims.generateFrameNumbers('enemy1Spritesheet', { start: 18, end: 19 }),
            frameRate: 12,
            repeat: 0
        });

        anims.create({
            key: 'deathEnemy1',
            frames: anims.generateFrameNumbers('enemy1Spritesheet', { start: 24, end: 29 }),
            frameRate: 12,
            repeat: 0
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
                this.play('hurtEnemy1', true);
            }
            else if (Math.abs(enemyCenter.x - playerCenter.x) < this.sightRange)
            {
                if (this.checkOverlap(enemyCenter, playerCenter))
                {
                    if (!this.isAttacking && this.alive)
                    {
                        this.setVelocityX(0);
                        this.play('idleEnemy1', true);
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
                this.play('idleEnemy1', true);
            }
        }
        else
        {
            this.setVelocityX(0);
            this.die();
        }
    }

    onAnimationComplete(animation) {
        if (animation.key === 'deathEnemy1') {
            this.anims.stop(); // Остановка анимации
            this.setFrame(29); // Фиксация последнего кадра
            this.setActive(false);
        }
    }
  
    die() {
        this.play('deathEnemy1', true);
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
            this.play('idleEnemy1', true);
        }
    }

    moveLeft()
    {
        this.setVelocityX(-50);
        this.play('walkEnemy1', true);
        this.setFlipX(true);
    }

    moveRight()
    {
        this.setVelocityX(50);
        this.play('walkEnemy1', true);
        this.setFlipX(false);
    }

    checkOverlap(enemyCenter, playerCenter)
    {
        return Math.abs(enemyCenter.x - playerCenter.x) < 10 && Math.abs(enemyCenter.y - playerCenter.y) < 10;
    }

    attackPlayer(player)
    {
        this.play('attackEnemy1', true);

        if (this.checkOverlap(this.getCenter(), player.getCenter()))
        {
            player.takeDamage(this.brunt);
        }

        //this.sprite.play('attackEnemy2', true);
        let timedEvent = this.scene.time.delayedCall(1000, () => this.isAttacking = false);
    }

    takeDamage(brunt)
    {
        this.isTakingDamage = true;
        this.healthPoints -= brunt;
        let timedEvent = this.scene.time.delayedCall(600, () => this.isTakingDamage = false);
    }

  }

