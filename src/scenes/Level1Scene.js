import Phaser from 'phaser'
import ProceduralLevelGenerator from './ProceduralLevelGenerator'
import Player from "./Player";
import Enemy1 from "./Enemy1";
import Enemy3 from './Enemy3';
import Boss1 from './Boss1';
import { platformData } from './platformData';
import Platform from "./Platforms";
import HealthGroup from './HealthGroup';
import HealthPickup from './HealthPickup';

export default class Level1Scene extends Phaser.Scene {
    constructor() {
        super({ key: 'Level1Scene' });
        this.playerAlive = true;
    }

    preload() { }

    create() {
        localStorage.setItem('currentScene', this.scene.key);

        this.background0 = this.add.tileSprite(512, 288, 6144, 576, 'backgroundDay1');
        this.background1 = this.add.tileSprite(512, 288, 6144, 576, 'backgroundDay');
        this.background2 = this.add.tileSprite(512, 288, 6144, 576, 'backgroundDay6');

        this.background0.tilePositionX = 0;
        this.background1.tilePositionX = 0;
        this.background2.tilePositionX = 0;

        this.add.text(0, 0, 'Level 1', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
        this.add.text(0, 16, 'Press W, A, D to move', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
        this.add.text(0, 32, 'Press F to hit with hand', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
        this.add.text(0, 48, 'Press R to kick', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
        this.add.text(0, 64, 'Kill all enemies', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });

        const camera = this.cameras.main;
        camera.setSize(1024, 576);
        camera.setBounds(0, 0, 3072, 576);

        this.healthBar = new HealthGroup(this, camera.width - 144, 30);

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
        this.player = new Player(this, 100, 368);
        this.physics.add.collider(this.player, platformGroup);

        this.cameras.main.startFollow(this.player, true);

        // Добавление врагов
        this.enemiesList = [];

        this.enemy1 = new Enemy1(this, 256, 512, "enemy1");
        this.physics.add.collider(this.enemy1, platformGroup);
        this.physics.add.overlap(this.player, this.enemy1);
        this.enemiesList.push(this.enemy1);

        this.enemy2 = new Enemy1(this, 448, 448, "enemy2");
        this.physics.add.collider(this.enemy2, platformGroup);
        this.physics.add.overlap(this.player, this.enemy2);
        this.enemiesList.push(this.enemy2);

        this.enemy3 = new Enemy1(this, 64, 320, "enemy3");
        this.physics.add.collider(this.enemy3, platformGroup);
        this.physics.add.overlap(this.player, this.enemy3);
        this.enemiesList.push(this.enemy3);

        this.miniBoss1 = new Enemy3(this, 800, 270, "miniBoss1");
        this.physics.add.collider(this.miniBoss1, platformGroup);
        this.physics.add.overlap(this.player, this.miniBoss1);
        this.enemiesList.push(this.miniBoss1);

        this.enemy4 = new Enemy1(this, 1152, 480, "enemy4");
        this.physics.add.collider(this.enemy4, platformGroup);
        this.physics.add.overlap(this.player, this.enemy4);
        this.enemiesList.push(this.enemy4);

        this.enemy5 = new Enemy1(this, 1580, 448, "enemy5");
        this.physics.add.collider(this.enemy5, platformGroup);
        this.physics.add.overlap(this.player, this.enemy5);
        this.enemiesList.push(this.enemy5);

        this.enemy6 = new Enemy1(this, 1696, 160, "enemy6");
        this.physics.add.collider(this.enemy6, platformGroup);
        this.physics.add.overlap(this.player, this.enemy6);
        this.enemiesList.push(this.enemy6);

        this.enemy7 = new Enemy1(this, 2368, 480, "enemy7");
        this.physics.add.collider(this.enemy7, platformGroup);
        this.physics.add.overlap(this.player, this.enemy7);
        this.enemiesList.push(this.enemy7);

        this.enemy8 = new Enemy1(this, 2176, 480, "enemy8");
        this.physics.add.collider(this.enemy8, platformGroup);
        this.physics.add.overlap(this.player, this.enemy8);
        this.enemiesList.push(this.enemy8);

        this.enemy9 = new Enemy1(this, 2048, 480, "enemy9");
        this.physics.add.collider(this.enemy9, platformGroup);
        this.physics.add.overlap(this.player, this.enemy9);
        this.enemiesList.push(this.enemy9);

        this.miniBoss2 = new Enemy3(this, 1856, 460, "miniBoss2");
        this.physics.add.collider(this.miniBoss2, platformGroup);
        this.physics.add.overlap(this.player, this.miniBoss2);
        this.enemiesList.push(this.miniBoss2);

        this.boss = new Boss1(this, 2784, 472, "boss");
        this.physics.add.collider(this.boss, platformGroup);
        this.physics.add.overlap(this.player, this.boss);
        this.enemiesList.push(this.boss);


        this.healthPickups = [];
        const healthPickup = new HealthPickup(this, 132, 512);
        this.healthPickups.push(healthPickup);

        this.healthPickups.forEach((pickup) => {
            pickup.setInteractive();
            this.input.keyboard.on('keydown-E', (event) => {
                const playerDistance = Phaser.Math.Distance.Between(this.player.x, this.player.y, pickup.x, pickup.y);
                if (playerDistance < 16) {
                    this.player.healthPoints = pickup.collect(this.player.maxHealthPoints, this.player.healthPoints);
                    console.log('хилл сюда!');
                }
            });
        })

        // переключение между уровнями
        const doorToNextLevel = this.add.image(3056, 432, 'door')
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.switch('Level2Scene');
            });
    }

    update(time, delta) {
        this.healthBar.updateHealthPosition(this.player.healthPoints);
        this.moveBackgroundImage();

        if (this.playerAlive) {
            if (this.player.healthPoints > 0) {
                this.player.update(time, delta);
            }
            else {
                this.player.play('death', true);
                this.playerAlive = false;
                let playerDestroyDelay = this.time.delayedCall(800, this.player.destroy);
            }

            this.enemiesList.forEach((enemy) => {
                enemy.update(time, delta);
            })
        }
        else {
            this.scene.stop();
            this.scene.start('DeathScene');
        }
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

    /* destroyScene() {
        console.log(this.background0);
        if (this.background0) this.background0.destroy();
        if (this.background1) this.background1.destroy();
        if (this.background2) this.background2.destroy();
        if (this.healthBar) {
            this.healthBar.destroy();
        }
    } */
}
