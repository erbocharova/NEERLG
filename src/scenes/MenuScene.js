import Phaser from "phaser";
import background1 from "../../assets/Tileset/Background/Day/1.png"
import bgnNight5 from "../../assets/Tileset/Background/Night/5.png"
import bgnNight6 from "../../assets/Tileset/Background/Night/6.png"
import tile from "../../assets/Tileset/Tiles/Tiles_01.png"
import playerSpritesheet from "../../assets/Characters/Cyborg/Cyborg.png"
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
import enemy1Spritesheet from "../../assets/Enemies/1/Enemy1.png"
import enemyAttack1 from "../../assets/Enemies/1/Attack1.png"
import enemyIdle1 from "../../assets/Enemies/1/Idle1.png"
import enemyWalk1 from "../../assets/Enemies/1/Walk1.png"
import enemyHurt1 from "../../assets/Enemies/1/Hurt1.png"
import enemyDeath1 from "../../assets/Enemies/1/Death1.png"
import heartIcon from "../../assets/Implant/Icons/Icon9_18.png"
import startBtn from "../../assets/GUI/Buttons/Start.png"
import continueBtn from "../../assets/GUI/Buttons/Continue.png"
import backgroundDay from "../../assets/Tileset/Background/Day/day.png"
import bgnDay6 from "../../assets/Tileset/Background/Day/6.png"
import bgnNight1 from "../../assets/Tileset/Background/Night/1.png"
import bgnNight11 from "../../assets/Tileset/Background/Night/1_1.png"
import bgnNight4 from "../../assets/Tileset/Background/Night/4_1.png"
import tile1 from "../../assets/Tileset/Tiles/Tiles_35.png"
import door from "../../assets/Tileset/Objects/Door3.png"
import bossAttack1 from "../../assets/Bosses/2/Attack1.png"
import bossIdle1 from "../../assets/Bosses/2/Idle.png"
import bossWalk1 from "../../assets/Bosses/2/Walk.png"
import bossHurt1 from "../../assets/Bosses/2/Hurt.png"
import bossDeath1 from "../../assets/Bosses/2/Death.png"
import logo from "../../assets/GUI/Logo/Logo.png"

export default class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    preload() {
        this.load.image('startButton', startBtn);
        this.load.image('continueButton', continueBtn);
        this.load.image('logo', logo);

        this.load.image('backgroundDay1', background1);
        this.load.image('backgroundDay', backgroundDay);
        this.load.image('backgroundDay6', bgnDay6);
        this.load.image('backgroundNight1', bgnNight1);
        this.load.image('backgroundNight11', bgnNight11);
        this.load.image('backgroundNight4', bgnNight4);
        this.load.image('backgroundNight5', bgnNight5);
        this.load.image('backgroundNight6', bgnNight6);

        this.load.image('tile1', tile1);
        this.load.image('tile', tile);

        this.load.image('door', door);

        this.load.spritesheet('playerSpritesheet', playerSpritesheet, { frameWidth: 40, frameHeight: 40});

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

        this.load.spritesheet('enemy1Spritesheet', enemy1Spritesheet, {frameWidth: 20, frameHeight: 25});
        this.load.spritesheet('enemyAttack1', enemyAttack1, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('enemyIdle1', enemyIdle1, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('enemyWalk1', enemyWalk1, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('enemyHurt1', enemyHurt1, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('enemyDeath1', enemyDeath1, { frameWidth: 32, frameHeight: 32 });

        this.load.spritesheet('bossAttack1', bossAttack1, { frameWidth: 72, frameHeight: 42 });
        this.load.spritesheet('bossIdle1', bossIdle1, { frameWidth: 72, frameHeight: 42 });
        this.load.spritesheet('bossWalk1', bossWalk1, { frameWidth: 72, frameHeight: 42 });
        this.load.spritesheet('bossHurt1', bossHurt1, { frameWidth: 72, frameHeight: 42 });
        this.load.spritesheet('bossDeath1', bossDeath1, { frameWidth: 72, frameHeight: 42 });

        this.load.image('heart-icon', heartIcon);
    }

    create() {
        const camera = this.cameras.main;
        camera.setSize(1024, 576);
        camera.setBounds(0, 0, 1024, 576);

        let lastSavedSceneKey = localStorage.getItem('currentScene');
        
        this.background = this.add.tileSprite(512, 288, 1024, 576, 'backgroundNight11');
        this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 - 120, 'logo');

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