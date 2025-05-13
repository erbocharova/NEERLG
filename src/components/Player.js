import Phaser from "phaser";

export default class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y) {
        super(scene, x, y, 'idle', 0);

        scene.add.existing(this);
        scene.physics.add.existing(this, false);

        this.scene = scene;
        this.maxHealthPoints = 100;
        this.healthPoints = 100;
        this.brunt = 20;
        this.velocityX = 100;
        this.velocityY = 250;
        this.isTakingDamage = false;
        this.alive = true;
        this.isReadyForSpecialAttack = true;

        this.setBodySize(40, 40);
        this.setBounce(0.1);
        this.setOffset(0);
        this.setCollideWorldBounds(true);

        this.createAnimations();
        this.on('animationcomplete', this.onAnimationComplete, this);

        const { W, A, D, SPACE, E, R, F } = Phaser.Input.Keyboard.KeyCodes;
        this.keys = scene.input.keyboard.addKeys({
            space: SPACE,
            e: E,
            up: W,
            left: A,
            right: D,
            f: F,
            r: R,
        });
    }

    createAnimations() {
        const anims = this.scene.anims;

        anims.create({
            key: 'idle',
            frames: anims.generateFrameNumbers('playerSpritesheet', { start: 0, end: 3 }),
            frameRate: 12
        });

        anims.create({
            key: 'run',
            frames: anims.generateFrameNumbers('playerSpritesheet', { start: 8, end: 13 }),
            frameRate: 12,
            repeat: -1
        });

        anims.create({
            key: 'jump',
            frames: anims.generateFrameNumbers('playerSpritesheet', { start: 16, end: 19 }),
            frameRate: 12,
        });

        anims.create({
            key: 'handHit',
            frames: anims.generateFrameNumbers('playerSpritesheet', { start: 24, end: 29 }),
            frameRate: 12
        });

        anims.create({
            key: 'legHit',
            frames: anims.generateFrameNumbers('playerSpritesheet', { start: 32, end: 37 }),
            frameRate: 12
        });

        anims.create({
            key: 'hurt',
            frames: anims.generateFrameNumbers('playerSpritesheet', { start: 40, end: 41 }),
            frameRate: 12
        });

        anims.create({
            key: 'death',
            frames: anims.generateFrameNumbers('playerSpritesheet', { start: 48, end: 53 }),
            frameRate: 12
        });

        anims.create({
            key: 'specialAttack',
            frames: anims.generateFrameNumbers('playerSpritesheet', { start: 56, end: 63 }),
            frameRate: 12
        })
    }


    update(time, delta) {
        const { keys } = this;

        let playerCenter = this.getCenter();

        if (this.isTakingDamage) {
            this.play('hurt', true);
        }
        else {
            if (keys.left.isDown) {
                this.setVelocityX(-this.velocityX);
                if (this.body.onFloor()) {
                    this.play('run', true);
                }
            }
            else if (keys.right.isDown) {
                this.setVelocityX(this.velocityX);
                if (this.body.onFloor()) {
                    this.play('run', true);
                }
            }
            else if (keys.e.isDown && this.isReadyForSpecialAttack) {
                this.play('specialAttack', true);
                this.scene.enemiesGroup.getChildren().forEach((enemy) => {
                    if (this.checkOverlap(enemy.getCenter(), playerCenter)) {
                        enemy.takeDamage(this.brunt);
                    }
                });
            }
            else if (keys.f.isDown) {
                //this.setVelocityX(0); /* Сохраняет скорость по X и бьет. Оставить как фичу?*/
                this.play('handHit', true);
                this.scene.enemiesGroup.getChildren().forEach((enemy) => {
                    if (this.checkOverlap(enemy.getCenter(), playerCenter)) {
                        enemy.takeDamage(this.brunt);
                    }
                });
            }
            else if (keys.r.isDown) {
                this.play('legHit', true);
                this.scene.enemiesGroup.getChildren().forEach((enemy) => {
                    if (this.checkOverlap(enemy.getCenter(), playerCenter)) {
                        enemy.takeDamage(this.brunt);
                    }
                });
            }
            else {
                this.setVelocityX(0);
                if (this.body.onFloor()) {
                    this.play('idle', true);
                }
            }


            if ((keys.space.isDown || keys.up.isDown) && this.body.onFloor()) {
                this.setVelocityY(-this.velocityY);
                this.play('jump', true);
            }


            if (this.body.velocity.x > 0) {
                this.setFlipX(false);
            }
            else if (this.body.velocity.x < 0) {
                this.setFlipX(true);
            }
        }
    }

    onAnimationComplete(animation) {
        if (animation.key === 'specialAttack') {
            this.isReadyForSpecialAttack = false;
            let timedEvent = this.scene.time.delayedCall(10000, () => this.isReadyForSpecialAttack = true);
        }
    }

    takeDamage(brunt) {
        this.isTakingDamage = true;
        this.healthPoints -= brunt;
        let timedEvent = this.scene.time.delayedCall(600, () => this.isTakingDamage = false);
    }

    checkOverlap(enemyCenter, playerCenter) {
        return Math.abs(enemyCenter.x - playerCenter.x) < 10 && Math.abs(enemyCenter.y - playerCenter.y) < 10;
    }


    destroy() {
        super.destroy();
    }
}
