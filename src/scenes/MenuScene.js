import Phaser from "phaser";

export default class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    preload() {
        this.load.image('startButton', 'assets/start.png');
        this.load.image('continueButton', 'assets/continue.png');

        this.load.image('backgroundDay1', 'assets/Tileset/Background/Day/1.png');
        this.load.image('backgroundDay', 'assets/Tileset/Background/Day/day.png');
        this.load.image('backgroundDay6', 'assets/Tileset/Background/Day/6.png');
        this.load.image('backgroundNight1', 'assets/Tileset/Background/Night/1.png');
        this.load.image('backgroundNight4', 'assets/Tileset/Background/Night/4.png');
        this.load.image('backgroundNight5', 'assets/Tileset/Background/Night/5.png');
        this.load.image('backgroundNight6', 'assets/Tileset/Background/Night/6.png');

        this.load.image('tile1', 'assets/Tileset/1 Tiles/Tiles_35.png');
        this.load.image('tile', 'assets/Tileset/1 Tiles/Tiles_01.png');

        this.load.image('door', 'assets/Tileset/3 Objects/Door3.png');

        this.load.spritesheet('playerIdle', 'assets/Characters/3 Cyborg/Cyborg_idle.png', { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('playerRun', 'assets/Characters/3 Cyborg/Cyborg_run.png', { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('playerJump', 'assets/Characters/3 Cyborg/Cyborg_jump.png', { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('playerHandHit', 'assets/Characters/3 Cyborg/Cyborg_attack1.png', { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('playerLegHit', 'assets/Characters/3 Cyborg/Cyborg_punch.png', { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('playerHurt', 'assets/Characters/3 Cyborg/Cyborg_hurt.png', { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('playerDeath', 'assets/Characters/3 Cyborg/Cyborg_death.png', { frameWidth: 48, frameHeight: 48 });

        this.load.spritesheet('enemyWalk3', 'assets/Enemies/3/Walk.png', { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('enemyAttack3', 'assets/Enemies/3/Attack.png', { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('enemyIdle3', 'assets/Enemies/3/Idle.png', { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('enemyHurt3', 'assets/Enemies/3/Hurt.png', { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('enemyDeath3', 'assets/Enemies/3/Death.png', { frameWidth: 48, frameHeight: 48 });

        this.load.spritesheet('enemyAttack1', 'assets/Enemies/1/Attack1.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('enemyIdle1', 'assets/Enemies/1/Idle1.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('enemyWalk1', 'assets/Enemies/1/Walk1.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('enemyHurt1', 'assets/Enemies/1/Hurt1.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('enemyDeath1', 'assets/Enemies/1/Death1.png', { frameWidth: 32, frameHeight: 32 });

        this.load.spritesheet('bossAttack1', 'assets/Bosses/2/Attack1.png', { frameWidth: 72, frameHeight: 42 });
        this.load.spritesheet('bossIdle1', 'assets/Bosses/2/Idle.png', { frameWidth: 72, frameHeight: 42 });
        this.load.spritesheet('bossWalk1', 'assets/Bosses/2/Walk.png', { frameWidth: 72, frameHeight: 42 });
        this.load.spritesheet('bossHurt1', 'assets/Bosses/2/Hurt.png', { frameWidth: 72, frameHeight: 42 });
        this.load.spritesheet('bossDeath1', 'assets/Bosses/2/Death.png', { frameWidth: 72, frameHeight: 42 });

        this.load.image('heart-icon', '/assets/Implant/1 Icons/Icon9_18.png');
    }

    create() {
        const camera = this.cameras.main;
        camera.setSize(1024, 576);
        camera.setBounds(0, 0, 1024, 576);

        let lastSavedSceneKey = localStorage.getItem('currentScene');
        
        this.background = this.add.tileSprite(512, 288, 1024, 576, 'backgroundNight1');
        this.background = this.add.tileSprite(512, 288, 1024, 576, 'backgroundNight4');

        const startButton = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'startButton')
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.start('Level1Scene');
            });

        if (lastSavedSceneKey) {
            const continueButton = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2  + 64, 'continueButton')
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.start(lastSavedSceneKey);
            })
        }
    }

    update() {}
}