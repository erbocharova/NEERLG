import Phaser from "phaser";
import background1 from "../../assets/Tileset/Background/Day/1.png"
import bgnNight5 from "../../assets/Tileset/Background/Night/5.png"
import bgnNight6 from "../../assets/Tileset/Background/Night/6.png"
import tile from "../../assets/Tileset/Tiles/Tiles_01.png"
import playerIdle from "../../assets/Characters/Cyborg/Cyborg_idle.png"
import playerRun from "../../assets/Characters/Cyborg/Cyborg_run.png"
import playerJump from "../../assets/Characters/Cyborg/Cyborg_jump.png"
import playerHandHit from "../../assets/Characters/Cyborg/Cyborg_attack1.png"
import playerLegHit from "../../assets/Characters/Cyborg/Cyborg_punch.png"
import playerHurt from "../../assets/Characters/Cyborg/Cyborg_hurt.png"
import playerDeath from "../../assets/Characters/Cyborg/Cyborg_death.png"
import enemyWalk3 from "../../assets/Enemies/3/Walk.png"
import enemyAttack3 from "../../assets/Enemies/3/Attack.png"
import enemyIdle3 from "../../assets/Enemies/3/Idle.png"
import enemyHurt3 from "../../assets/Enemies/3/Hurt.png"
import enemyDeath3 from "../../assets/Enemies/3/Death.png"
import enemyAttack1 from "../../assets/Enemies/1/Attack1.png"
import enemyIdle1 from "../../assets/Enemies/1/Idle1.png"
import enemyWalk1 from "../../assets/Enemies/1/Walk1.png"
import enemyHurt1 from "../../assets/Enemies/1/Hurt1.png"
import enemyDeath1 from "../../assets/Enemies/1/Death1.png"
import heartIcon from "../../assets/Implant/Icons/Icon9_18.png"

export default class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    preload() {
        this.load.image('startButton', 'assets/start.png');
        this.load.image('continueButton', 'assets/continue.png');

        this.load.image('backgroundDay1', background1);
        this.load.image('backgroundDay', 'assets/Tileset/Background/Day/day.png');
        this.load.image('backgroundDay6', 'assets/Tileset/Background/Day/6.png');
        this.load.image('backgroundNight1', 'assets/Tileset/Background/Night/1.png');
        this.load.image('backgroundNight4', 'assets/Tileset/Background/Night/4.png');
        this.load.image('backgroundNight5', bgnNight5);
        this.load.image('backgroundNight6', bgnNight6);

        this.load.image('tile1', 'assets/Tileset/1 Tiles/Tiles_35.png');
        this.load.image('tile', tile);

        this.load.image('door', 'assets/Tileset/3 Objects/Door3.png');

        this.load.spritesheet('playerIdle', playerIdle, { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('playerRun', playerRun, { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('playerJump', playerJump, { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('playerHandHit', playerHandHit, { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('playerLegHit', playerLegHit, { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('playerHurt', playerHurt, { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('playerDeath', playerDeath, { frameWidth: 48, frameHeight: 48 });

        this.load.spritesheet('enemyWalk3', enemyWalk3, { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('enemyAttack3', enemyAttack3, { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('enemyIdle3', enemyIdle3, { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('enemyHurt3', enemyHurt3, { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('enemyDeath3', enemyDeath3, { frameWidth: 48, frameHeight: 48 });

        this.load.spritesheet('enemyAttack1', enemyAttack1, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('enemyIdle1', enemyIdle1, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('enemyWalk1', enemyWalk1, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('enemyHurt1', enemyHurt1 { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('enemyDeath1', enemyDeath1, { frameWidth: 32, frameHeight: 32 });

        this.load.spritesheet('bossAttack1', 'assets/Bosses/2/Attack1.png', { frameWidth: 72, frameHeight: 42 });
        this.load.spritesheet('bossIdle1', 'assets/Bosses/2/Idle.png', { frameWidth: 72, frameHeight: 42 });
        this.load.spritesheet('bossWalk1', 'assets/Bosses/2/Walk.png', { frameWidth: 72, frameHeight: 42 });
        this.load.spritesheet('bossHurt1', 'assets/Bosses/2/Hurt.png', { frameWidth: 72, frameHeight: 42 });
        this.load.spritesheet('bossDeath1', 'assets/Bosses/2/Death.png', { frameWidth: 72, frameHeight: 42 });

        this.load.image('heart-icon', heartIcon);
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