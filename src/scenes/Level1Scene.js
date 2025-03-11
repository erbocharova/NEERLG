import Phaser, { Cameras, GameObjects } from 'phaser';
import Player from "./Player";
import Enemy1 from "./Enemy1";
import Enemy3 from './Enemy3';
import Boss1 from './Boss1';
import { platformData } from './platformData';
import Platform from "./Platforms";

export default class Level1Scene extends Phaser.Scene {
    constructor() {
        super({ key: 'Level1Scene' });
        this.playerAlive = true;
    }

    preload() {
        this.load.image('background0', 'assets/Tileset/Background/Day/1.png');
        this.load.image('background1', 'assets/Tileset/Background/Day/day.png');
        this.load.image('background2', 'assets/Tileset/Background/Day/6.png');
        this.load.image('tile', 'assets/Tileset/1 Tiles/Tiles_01.png');

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
        this.background0 = this.add.tileSprite(512, 288, 6144, 576, 'background0');
        this.background1 = this.add.tileSprite(512, 288, 6144, 576, 'background1');
        this.background2 = this.add.tileSprite(512, 288, 6144, 576, 'background2');

        this.background0.tilePositionX = 0;
        this.background1.tilePositionX = 0;
        this.background2.tilePositionX = 0;

        this.add.text(0, 0, 'Level 1', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
        this.add.text(0, 16, 'Press W, A, D to move', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
        this.add.text(0, 32, 'Press E to hit with hand', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
        this.add.text(0, 48, 'Press R to kick', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
        this.add.text(0, 64, 'Kill all enemies and press Enter', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });

        const camera = this.cameras.main;
        camera.setSize(1024, 576);
        camera.setBounds(0, 0, 3072, 576);

        this.healthGroup = this.add.group();
        this.healthImage = this.add.image(camera.width - 144, 30, 'heart-icon');
        this.healthBar = this.add.graphics();
        this.healthGroup.add(this.healthImage);
        this.healthGroup.add(this.healthBar);
        
        // Создание платформ
        let platformGroup = this.physics.add.staticGroup();
        let customPlatforms = [];

        for (let i = 0; i < platformData.length; i += 1) {
            for (let j = 0; j < 1; j += 1) {
                let platform = new Platform(this, platformData[i][j], platformData[i][j + 1]);
                customPlatforms.push(platform);
            }
        }

        customPlatforms.forEach(platform => {
            platformGroup.create(platform.x, platform.y, 'tile');
        });

        // Добавление игрока
        this.player = new Player(this, 32, 368);
        this.physics.add.collider(this.player.sprite, platformGroup);

        this.cameras.main.startFollow(this.player.sprite, true);

        // Добавление врагов
        this.enemiesList = [];

        this.enemy1 = new Enemy1(this, 256, 512, "enemy1");
        this.physics.add.collider(this.enemy1.sprite, platformGroup);
        this.physics.add.overlap(this.player.sprite, this.enemy1.sprite);
        this.enemiesList.push(this.enemy1);

        this.enemy2 = new Enemy1(this, 448, 448, "enemy2");
        this.physics.add.collider(this.enemy2.sprite, platformGroup);
        this.physics.add.overlap(this.player.sprite, this.enemy2.sprite);
        this.enemiesList.push(this.enemy2);

        this.enemy3 = new Enemy1(this, 64, 320, "enemy3");
        this.physics.add.collider(this.enemy3.sprite, platformGroup);
        this.physics.add.overlap(this.player.sprite, this.enemy3.sprite);
        this.enemiesList.push(this.enemy3);

        this.miniBoss1 = new Enemy3(this, 800, 270, "miniBoss1");
        this.physics.add.collider(this.miniBoss1.sprite, platformGroup);
        this.physics.add.overlap(this.player.sprite, this.miniBoss1.sprite);
        this.enemiesList.push(this.miniBoss1);

        this.enemy4 = new Enemy1(this, 1152, 480, "enemy4");
        this.physics.add.collider(this.enemy4.sprite, platformGroup);
        this.physics.add.overlap(this.player.sprite, this.enemy4.sprite);
        this.enemiesList.push(this.enemy4);

        this.enemy5 = new Enemy1(this, 1580, 448, "enemy5");
        this.physics.add.collider(this.enemy5.sprite, platformGroup);
        this.physics.add.overlap(this.player.sprite, this.enemy5.sprite);
        this.enemiesList.push(this.enemy5);

        this.enemy6 = new Enemy1(this, 1696, 160, "enemy6");
        this.physics.add.collider(this.enemy6.sprite, platformGroup);
        this.physics.add.overlap(this.player.sprite, this.enemy6.sprite);
        this.enemiesList.push(this.enemy6);

        this.enemy7 = new Enemy1(this, 2368, 480, "enemy7");
        this.physics.add.collider(this.enemy7.sprite, platformGroup);
        this.physics.add.overlap(this.player.sprite, this.enemy7.sprite);
        this.enemiesList.push(this.enemy7);

        this.enemy8 = new Enemy1(this, 2176, 480, "enemy8");
        this.physics.add.collider(this.enemy8.sprite, platformGroup);
        this.physics.add.overlap(this.player.sprite, this.enemy8.sprite);
        this.enemiesList.push(this.enemy8);

        this.enemy9 = new Enemy1(this, 2048, 480, "enemy9");
        this.physics.add.collider(this.enemy9.sprite, platformGroup);
        this.physics.add.overlap(this.player.sprite, this.enemy9.sprite);
        this.enemiesList.push(this.enemy9);

        this.miniBoss2 = new Enemy3(this, 1856, 460, "miniBoss2");
        this.physics.add.collider(this.miniBoss2.sprite, platformGroup);
        this.physics.add.overlap(this.player.sprite, this.miniBoss2.sprite);
        this.enemiesList.push(this.miniBoss2);

        this.boss = new Boss1(this, 2784, 472, "boss");
        this.physics.add.collider(this.boss.sprite, platformGroup);
        this.physics.add.overlap(this.player.sprite, this.boss.sprite);
        this.enemiesList.push(this.boss);

        // переключение между сценами по кнопке Enter
        this.input.keyboard.on('keydown', function (event) {
            if (event.key === 'Enter'/* && this.enemiesList.length === 0*/) {
                this.scene.switch('Level2Scene');
            }
        }, this);

    }

    update(time, delta) {
        this.updateHealthPosition();
        this.moveBackgroundImage();
        
        if (this.playerAlive) {
            if (this.player.healthPoints > 0) {
                this.player.update(time, delta);
            }
            else {
                this.player.sprite.play('death', true);
                this.playerAlive = false;
                let playerDestroyDelay = this.time.delayedCall(800, this.player.destroy);
            }

            this.enemiesList.forEach((enemy) => {
                enemy.update(time, delta);
            })
        }
        else {
            this.scene.switch('DeathScene');
        }
    }

    DrawHealthBar(x) {
        this.healthBar.clear();

        this.healthBar.lineStyle(2, 0xffffff, 1);
        this.healthBar.strokeRect(x, 20, 100, 20);

        this.healthBar.fillStyle(0xff0000, 1);
        this.healthBar.fillRect(x, 20, this.player.healthPoints, 20);
    }

    updateHealthPosition() {
        // Текущая позиция камеры
        const cam = this.cameras.main;
        const newX = cam.worldView.right - 124;

        this.DrawHealthBar(newX);

        this.healthImage.x = newX - 20;
    }

    moveBackgroundImage() {
        const newX = this.cameras.main.scrollX;

        const layerWidth0 = this.background0.width;
        const layerWidth1 = this.background1.width;
        const layerWidth2 = this.background2.width;

        this.background0.tilePositionX = ((newX * 0.25) % layerWidth0) + layerWidth0;
        this.background1.tilePositionX = ((newX * 0.5) % layerWidth1) + layerWidth1;
        this.background2.tilePositionX = ((newX * 0.8) % layerWidth2) + layerWidth2;
 
    }
}
