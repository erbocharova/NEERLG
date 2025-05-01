import Phaser from 'phaser'
import ProceduralLevelGenerator from './ProceduralLevelGenerator';
import Player from "./Player";
import Enemy1 from "./Enemy1";
import Enemy3 from "./Enemy3";
import Platform from "./Platforms";
import HealthGroup from './HealthGroup';
import HealthPickup from './HealthPickup';

export default class Level2Scene extends Phaser.Scene {
    constructor() {
        super({ key: 'Level2Scene' });
        this.playerAlive = true;
    }

    preload() {
    }

    create() {
        localStorage.setItem('currentScene', this.scene.key);
        console.log('Welcome to Level 2!');

        this.background0 = this.add.tileSprite(512, 288, 6144, 576, 'backgroundNight1');
        this.background1 = this.add.tileSprite(512, 288, 6144, 576, 'backgroundNight5');
        this.background2 = this.add.tileSprite(512, 288, 6144, 576, 'backgroundNight6');

        this.background0.tilePositionX = 0;
        this.background1.tilePositionX = 0;
        this.background2.tilePositionX = 0;

        this.add.text(0, 0, 'Level 2', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });

        const camera = this.cameras.main;
        camera.setSize(1024, 576);
        camera.setBounds(0, 0, 3072, 576);

        this.healthBar = new HealthGroup(this, camera.width - 144, 30);

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
            platformGroup.create(platform.x, platform.y, 'tile1');
        });

        this.player = new Player(this, 16, 350);
        this.physics.add.collider(this.player, platformGroup);
        this.cameras.main.startFollow(this.player, true);

        this.createEnemies(platforms);

        this.enemiesList.forEach(enemy => {
            this.physics.add.collider(enemy, platformGroup);
            this.physics.add.overlap(this.player, enemy);
        })

        //переключение между сценами по кнопке Enter
        this.input.keyboard.on('keydown', function (event) {
            if (event.key === 'Enter' /*&& this.enemiesList.length === 0*/) {
                this.scene.switch('EndScene');
            }
        }, this);
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
        this.enemiesList = [];
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
                const key = `${enemyType}_${this.enemiesList.length}`;

                if (enemyType == "Enemy1") {
                    const enemy = new Enemy1(this, platformX, platform.platformHeight * tileSize - 25, key);
                    this.enemiesList.push(enemy);
                    enemy1Count++;
                } else {
                    const enemy = new Enemy3(this, platformX, platform.platformHeight * tileSize - 48, key);
                    this.enemiesList.push(enemy);
                    enemy3Count++;
                }
            }
        })
    }
}