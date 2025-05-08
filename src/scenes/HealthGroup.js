import Phaser from 'phaser';

export default class HealthGroup extends Phaser.GameObjects.Group {
    constructor(scene, x, y) {
        super(scene);

        this.scene = scene;
        this.x = x;
        this.y = y;

        this.healthImage = this.scene.add.image(x, y, 'iconset', 17);
        this.add(this.healthImage);
        this.healthBar = this.scene.add.graphics();
        this.add(this.healthBar);
    }

    DrawHealthBar(x, playerHealthPoints) {
        this.healthBar.clear();

        this.healthBar.lineStyle(2, 0xffffff, 1);
        this.healthBar.strokeRect(x, 20, 100, 20);

        this.healthBar.fillStyle(0xff0000, 1);
        this.healthBar.fillRect(x, 20, (playerHealthPoints * 100 / this.scene.player.maxHealthPoints), 20);
    }

    updateHealthPosition(playerHealthPoints) {
        const cam = this.scene.cameras.main;
        const newX = cam.worldView.right - 124;

        this.DrawHealthBar(newX, playerHealthPoints);

        this.healthImage.x = newX - 20;
    }

    destroy() {
        this.healthImage.destroy();
        this.healthBar.destroy();
        super.destroy();
    }
}