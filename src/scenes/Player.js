import Phaser from "phaser";

export default class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y) {
        super(scene, x, y, 'playerIdle', 0);

        scene.add.existing(this);
        scene.physics.add.existing(this, false);

        this.scene = scene;
        this.maxHealthPoints = 100;
        this.healthPoints = 100;
        this.brunt = 50;
        this.isTakingDamage = false;
        this.alive = true;

        this.setBodySize(40, 40);
        this.setBounce(0.1);
        this.setCollideWorldBounds(true);

        this.createAnimations();

        const { W, A, D, SPACE, ENTER, R, F } = Phaser.Input.Keyboard.KeyCodes;
        this.keys = scene.input.keyboard.addKeys({
            space: SPACE,
            enter: ENTER,
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
            frameRate: 10
        });

        anims.create({
            key: 'run',
            frames: anims.generateFrameNumbers('playerSpritesheet', { start: 6, end: 11 }),
            frameRate: 10,
            repeat: -1
        });

        anims.create({
            key: 'jump',
            frames: anims.generateFrameNumbers('playerSpritesheet', { start: 12, end: 15 }),
            frameRate: 10,
        });

        anims.create({
            key: 'handHit',
            frames: anims.generateFrameNumbers('playerSpritesheet', { start: 18, end: 23 }),
            frameRate: 10
        });

        anims.create({
            key: 'legHit',
            frames: anims.generateFrameNumbers('playerSpritesheet', { start: 24, end: 29 }),
            frameRate: 10
        });

        anims.create({
            key: 'hurt',
            frames: anims.generateFrameNumbers('playerSpritesheet', { start: 30, end: 31 }),
            frameRate: 10
        });

        anims.create({
            key: 'death',
            frames: anims.generateFrameNumbers('playerSpritesheet', { start: 36, end: 41 }),
            frameRate: 10
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
                this.setVelocityX(-100);
                if (this.body.onFloor()) {
                    this.play('run', true);
                }
            }

            else if (keys.right.isDown) {
                this.setVelocityX(100);

                if (this.body.onFloor()) {
                    this.play('run', true);
                }
            }

            else if (keys.f.isDown || keys.r.isDown) {
                if (keys.f.isDown) {
                    this.play('handHit', true);
                }
                else {
                    this.play('legHit', true);
                }
                this.scene.enemiesList.forEach((enemy) => {
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
                this.setVelocityY(-250);
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
