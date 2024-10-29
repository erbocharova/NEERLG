import Phaser from "phaser";

export default class Enemy3 {
    constructor(scene, x, y, key) {


        
        this.scene = scene;
        
        const anims = scene.anims;

        this.key = key;
        this.brunt = 100;
        this.sightRange = 64;
        this.healthPoints = 100;
        this.isAttacking = false;
        this.isTakingDamage = false;
        this.alive = true;


        anims.create({
            key: 'walkEnemy',
            frames: anims.generateFrameNumbers('enemyWalk3', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
    
        anims.create({
            key: 'idleEnemy',
            frames: anims.generateFrameNumbers('enemyIdle3', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
    
        anims.create({
            key: 'attackEnemy',
            frames: anims.generateFrameNumbers('enemyAttack3', { start: 0, end: 5 }),
            frameRate: 10,
            //repeat: -1
        });

        anims.create({
            key: 'hurtEnemy',
            frames: anims.generateFrameNumbers('enemyHurt3', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
        });

        anims.create({
            key: 'deathEnemy',
            frames: anims.generateFrameNumbers('enemyDeath3', { start: 0, end: 5 }),
            frameRate: 10
        });

        this.sprite = scene.physics.add
        .sprite(x, y, 'idleEnemy', 0)
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
                this.sprite.play('hurtEnemy', true);
            }
            else if (Math.abs(enemyCenter.x - playerCenter.x) < this.sightRange)
            {
                if (this.checkOverlap(enemyCenter, playerCenter))
                {
                    if (!this.isAttacking && this.alive)
                    {
                        this.sprite.setVelocityX(0);
                        this.sprite.play('idleEnemy', true);
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
                this.sprite.play('idleEnemy', true);
            }
        }
        else
        {
            this.sprite.setVelocityX(0);
            this.sprite.play('deathEnemy', true);
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
            this.sprite.play('idleEnemy', true);
        }
    }

    moveLeft()
    {
        this.sprite.setVelocityX(-20);
        this.sprite.play('walkEnemy', true);
        this.sprite.setFlipX(true);
    }

    moveRight()
    {
        this.sprite.setVelocityX(20);
        this.sprite.play('walkEnemy', true);
        this.sprite.setFlipX(false);
    }

    checkOverlap(enemyCenter, playerCenter)
    {
        return Math.abs(enemyCenter.x - playerCenter.x) < 10 && Math.abs(enemyCenter.y - playerCenter.y) < 10;
    }

    attackPlayer(player)
    {
        this.sprite.play('attackEnemy', true);

        if (this.checkOverlap(this.sprite.getCenter(), player.sprite.getCenter()))
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

