import Phaser from "phaser";

export default class HealthPickup extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'iconset', 17);

        scene.add.existing(this);
        scene.physics.add.existing(this, false);
        this.setInteractive();
        this.isActive = false;

        this.healAmount = 20;

        this.setScale(0.7);
    }

    startBounce() {
        this.scene.tweens.add({
            targets: this,
            y: this.y + 6,
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