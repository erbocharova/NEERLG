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
        this.background1 = this.add.tileSprite(512, 288, 6144, 576, 'backgroundDay7');
        this.background2 = this.add.tileSprite(512, 288, 6144, 576, 'backgroundDay6');

        this.background0.tilePositionX = 0;
        this.background1.tilePositionX = 0;
        this.background2.tilePositionX = 0;

        this.add.text(0, 0, 'Level 1', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
        this.add.text(0, 16, 'Press W, A, D to move', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
        this.add.text(0, 32, 'Hold F to hit with hand', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
        this.add.text(0, 48, 'Hold R to kick', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
        this.add.text(0, 64, 'Kill all enemies', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });

        const camera = this.cameras.main;
        camera.setSize(1024, 576);
        camera.setBounds(0, 0, 3072, 576);

        // Создание платформ (с помощью ProceduralLevelGenarator.js)
        let generator = new ProceduralLevelGenerator();
        let platforms = generator.generateLevel();
        let platformGroup = this.physics.add.staticGroup();

        let platformList = [];
        for (let i = 0; i < platforms.length; i++) {
            for (let index = platforms[i].leftEdge; index <= platforms[i].rightEdge; index++) {
                platformList.push({
                    x: index * 32 + 16,
                    y: platforms[i].platformHeight * 32 + 16
                });
            }
        }

        platformList.forEach(platform => {
            platformGroup.create(platform.x, platform.y, 'tileset', 0);
        });

        // Создание платформы босса (с помощью platformData.js)
        let customPlatforms = [];

        for (let i = 0; i < platformData.length; i += 1) {
            for (let j = 0; j < 1; j += 1) {
                let platform = new Platform(this, platformData[i][j], platformData[i][j + 1]);
                customPlatforms.push(platform);
            }
        }

        customPlatforms.forEach(platform => {
            platformGroup.create(platform.x, platform.y, 'tileset', 0);
        });

        // Добавление игрока
        this.player = new Player(this, platformList[0].x + 16, platformList[0].y - 48);
        this.player.setOrigin(0.5, 0.5);
        this.physics.add.collider(this.player, platformGroup);

        this.cameras.main.startFollow(this.player, true);

        // Добавление врагов

        this.enemiesGroup = this.physics.add.group();

        this.createEnemies(platforms);

        this.boss = new Boss1(this, 2784, 472, "boss");
        this.enemiesGroup.add(this.boss);

        this.physics.add.collider(this.enemiesGroup, platformGroup);
        this.physics.add.overlap(this.player, this.enemiesGroup);

        // Создание лекарств

        this.healthPickupGroup = this.physics.add.group();
        for (let i = 0; i < 10; i++) {
            let healthPickup = new HealthPickup(this, 0, 0);
            this.healthPickupGroup.add(healthPickup).killAndHide(healthPickup);
        }
        this.physics.add.collider(this.healthPickupGroup, platformGroup);

        this.physics.add.overlap(this.player, this.healthPickupGroup, this.pickupHealth, null, this);

        // переключение между уровнями
        const doorToNextLevel = this.add.image(3056, 432, 'door')
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.switch('Level2Scene');
            });

        this.healthBar = new HealthGroup(this, camera.width - 144, 30);
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

            this.enemiesGroup.getChildren().forEach(enemy => {
                if (enemy.active){
                    enemy.update();
                }
            })
        }
        else {
            this.scene.switch('DeathScene');
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

    createEnemies(platforms) {
        const tileSize = 32;
        platforms.splice(0, 1);
        let enemy1Count = 0;
        let enemy3Count = 0;

        platforms.forEach(platform => {
            let enemiesCount = 0;
            let platformLength = platform.rightEdge - platform.leftEdge;
            const leftEdgePx = platform.leftEdge * tileSize + 16;
            const rightEdgePx = platform.rightEdge * tileSize + 16;

            if (platformLength <= 3) {
                enemiesCount = 1;
            } else if (platformLength > 3) {
                enemiesCount = 2;
            }

            for (let i = 0; i < enemiesCount; i++) {
                const platformX = Math.floor(Math.random() * (rightEdgePx - leftEdgePx + 1)) + leftEdgePx;
                const enemyType = enemy1Count / 3 > enemy3Count ? "Enemy3" : "Enemy1";
                const key = `${enemyType}_${this.enemiesGroup.getLength()}`;

                if (enemyType == "Enemy1") {
                    const enemy = new Enemy1(this, platformX, platform.platformHeight * tileSize - 25, key);
                    this.enemiesGroup.add(enemy);
                    enemy1Count++;
                } else {
                    const enemy = new Enemy3(this, platformX, platform.platformHeight * tileSize - 48, key);
                    this.enemiesGroup.add(enemy);
                    enemy3Count++;
                }
            }
        })
    }

    pickupHealth(player, healthPickup) {
        if (healthPickup.isActive) {
            switch (true) {
                case player.healthPoints === player.maxHealthPoints:
                    break;
                case player.healthPoints + healthPickup.healAmount <= player.maxHealthPoints:
                    player.healthPoints += healthPickup.healAmount;
                    healthPickup.destroy();
                    break;
                case player.healthPoints + healthPickup.healAmount > player.maxHealthPoints:
                    player.healthPoints = player.maxHealthPoints;
                    healthPickup.destroy();
                    break;
            }
        }
    }
}
