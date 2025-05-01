import Phaser from "phaser";

export default class HealthPickup extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'heart-icon');

        scene.add.existing(this);
        this.setInteractive();
        this.isCollected = false;
        this.setName('healthPickup');

        this.healAmount = 20;

        this.setScale(0.7);
        this.startBounce();
    }

    collect(playerMaxHealthPoints, playerHealthPoints) {
        if (!this.isCollected) {

            if (playerHealthPoints + this.healAmount <= playerMaxHealthPoints) {
                playerHealthPoints += this.healAmount;
            }
            else {
                playerHealthPoints = playerMaxHealthPoints;
            }
            this.isCollected = true;
            this.destroy();
        }
        return playerHealthPoints;
    }

    startBounce() {
        this.scene.tweens.add({
            targets: this,
            y: this.y - 4,
            duration: 200,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
    }

    destroy() {
        super.destroy();
    }
}