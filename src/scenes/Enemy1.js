import Phaser, { GameObjects } from "phaser";

export default class Enemy1{
    constructor(scene, x, y, key) {
        
        this.scene = scene;
        
        const anims = scene.anims;

        this.key = key;
        this.brunt = 50;
        this.sightRange = 64;
        this.healthPoints = 50;
        this.isAttacking = false;
        this.isTakingDamage = false;
        this.alive = true;


        anims.create({
            key: 'walkEnemy1',
            frames: anims.generateFrameNumbers('enemyWalk1', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
    
        anims.create({
            key: 'idleEnemy1',
            frames: anims.generateFrameNumbers('enemyIdle1', { start: 0, end: 3 }),
            frameRate: 10
        });
    
        anims.create({
            key: 'attackEnemy1',
            frames: anims.generateFrameNumbers('enemyAttack1', { start: 0, end: 5 }),
            frameRate: 10,
            //repeat: -1
        });

        anims.create({
            key: 'hurtEnemy1',
            frames: anims.generateFrameNumbers('enemyHurt1', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: 0
        });

        anims.create({
            key: 'deathEnemy1',
            frames: anims.generateFrameNumbers('enemyDeath1', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: 0
        });

        this.sprite = scene.physics.add
        .sprite(x, y, 'idleEnemy1', 0)
        .setBodySize(10, 30)
        .setBounce(0.1)
        .setCollideWorldBounds(true);
    }
    
    update(time, delta, player) {
        let enemyCenter = this.sprite.getCenter();
        let playerCenter = player.sprite.getCenter();

        if (this.sprite.getCenter().y > 560) 
        {
            this.sprite.setCollideWorldBounds(false);
            this.healthPoints = 0;
        }

        if (this.healthPoints > 0){
            if (this.isTakingDamage)
            {
                this.sprite.play('hurtEnemy1', true);
            }
            else if (Math.abs(enemyCenter.x - playerCenter.x) < this.sightRange)
            {
                if (this.checkOverlap(enemyCenter, playerCenter))
                {
                    if (!this.isAttacking && this.alive)
                    {
                        this.sprite.setVelocityX(0);
                        this.sprite.play('idleEnemy1', true);
                        this.isAttacking = true;
                        let attackDelay = this.scene.time.delayedCall(500, () => this.attackPlayer(player));
                    
                    }
                }
                else
                    this.moveToPlayer(enemyCenter, playerCenter);
            }
            else
            {
                this.sprite.setVelocityX(0);
                this.sprite.play('idleEnemy1', true);
            }
        }
        else
        {
            this.sprite.setVelocityX(0);
            this.sprite.play('deathEnemy1', true);
            this.alive = false;
            this.scene.enemiesList.splice(this.scene.enemiesList.indexOf(this), 1);
            let enemy1DestroyDelay = this.scene.time.delayedCall(1100, this.destroy());
        }
    }
  
    destroy() {
      this.sprite.destroy();
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
            this.sprite.setVelocityX(0);
            this.sprite.play('idleEnemy1', true);
        }
    }

    moveLeft()
    {
        this.sprite.setVelocityX(-50);
        this.sprite.play('walkEnemy1', true);
        this.sprite.setFlipX(true);
    }

    moveRight()
    {
        this.sprite.setVelocityX(50);
        this.sprite.play('walkEnemy1', true);
        this.sprite.setFlipX(false);
    }

    checkOverlap(enemyCenter, playerCenter)
    {
        return Math.abs(enemyCenter.x - playerCenter.x) < 10 && Math.abs(enemyCenter.y - playerCenter.y) < 10;
    }

    attackPlayer(player)
    {
        this.sprite.play('attackEnemy1', true);

        if (this.checkOverlap(this.sprite.getCenter(), player.sprite.getCenter()))
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

