import Phaser from "phaser";

export default class Boss1 {
    constructor(scene, x, y, key) { 

        this.scene = scene; 
        const anims = scene.anims;
        this.key = key;
        this.brunt = 40;
        this.sightRange = 100;
        this.healthPoints = 400;
        this.isAttacking = false;
        this.isTakingDamage = false;
        this.alive = true;

        anims.create({
            key: 'walkBoss1',
            frames: anims.generateFrameNumbers('bossWalk1', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
    
        anims.create({
            key: 'idleBoss1',
            frames: anims.generateFrameNumbers('bossIdle1', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
    
        anims.create({
            key: 'attackBoss1',
            frames: anims.generateFrameNumbers('bossAttack1', { start: 0, end: 5 }),
            frameRate: 10
        });

        anims.create({
            key: 'hurtBoss1',
            frames: anims.generateFrameNumbers('bossHurt1', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
        });

        anims.create({
            key: 'deathBoss1',
            frames: anims.generateFrameNumbers('bossDeath1', { start: 0, end: 5 }),
            frameRate: 10
        });

        this.sprite = scene.physics.add
        .sprite(x, y, 'idleBoss1', 0)
        .setBodySize(72, 104)
        .setBounce(0.1)
        .setCollideWorldBounds(true);
    }
    
    update(time, delta) {
        let enemyCenter = this.sprite.getCenter();
        let playerCenter = this.scene.player.sprite.getCenter();

        if (this.sprite.getCenter().y > 560) 
        {
            this.sprite.setCollideWorldBounds(false);
            this.healthPoints = 0;
        }

        if (this.healthPoints > 0){
            if (this.isTakingDamage)
            {
                this.sprite.play('hurtBoss1', true);
            }
            else if (Math.abs(enemyCenter.x - playerCenter.x) < this.sightRange)
            {
                if (this.checkOverlap(enemyCenter, playerCenter))
                {
                    if (!this.isAttacking && this.alive)
                    {
                        this.sprite.setVelocityX(0);
                        this.sprite.play('idleBoss1', true);
                        this.isAttacking = true;
                        let attackDelay = this.scene.time.delayedCall(500, () => this.attackPlayer(this.scene.player));
                    
                    }
                }
                else
                    this.moveToPlayer(enemyCenter, playerCenter);
            }
            else
            {
                this.sprite.setVelocityX(0);
                this.sprite.play('idleBoss1', true);
            }
        }
        else
        {
            this.sprite.setVelocityX(0);
            this.sprite.play('deathBoss1', true);
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
            this.sprite.play('idleBoss1', true);
        }
    }

    moveLeft()
    {
        this.sprite.setVelocityX(-20);
        this.sprite.play('walkBoss1', true);
        this.sprite.setFlipX(true);
    }

    moveRight()
    {
        this.sprite.setVelocityX(20);
        this.sprite.play('walkBoss1', true);
        this.sprite.setFlipX(false);
    }

    checkOverlap(enemyCenter, playerCenter)
    {
        return Math.abs(enemyCenter.x - playerCenter.x) < 10 && Math.abs(enemyCenter.y - playerCenter.y) < 10;
    }

    attackPlayer(player)
    {
        this.sprite.play('attackBoss1', true);

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

