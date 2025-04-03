import Phaser, { Cameras, GameObjects } from 'phaser'
import ProceduralLevelGenerator from './ProceduralLevelGenerator';
import Player from "./Player";
import Enemy1 from "./Enemy1";
import Enemy3 from "./Enemy3";
import Platform from "./Platforms";
import HealthGroup from './HealthGroup';
import HealthPickup from './HealthPickup';

export default class Level2Scene extends Phaser.Scene {
    constructor() {
        super({key: 'Level2Scene'});
        this.playerAlive = true;
    }
 
    preload()
    {
    }

    create()
    {
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


            // Создание игры (автоматическая генерация отключена)
        /*let generator = new ProceduralLevelGenerator();

        let platforms = generator.generateLevel();

        let platformGroup = this.physics.add.staticGroup();

        let platformList = [];
        for (let i = 0; i < platforms.length; i++)
        {
            for (let index = platforms[i].leftEdge; index <= platforms[i].rightEdge; index++)
            {
                platformList.push({
                    x: index * 32 + 16,
                    y: platforms[i].platformHeight * 32 + 16  
                    });
            }
        }

        platformList.forEach(platform => {
            platformGroup.create(platform.x, platform.y, 'tile1');
        });*/

        let platformGroup = this.physics.add.staticGroup();

        
        let customPlatforms = [];

        //убираем основную платформу, чтобы сделать бесконечную пропасть
        /*for (let i = 16; i < 384; i += 32){
            let platform = new Platform(this, i, 560);
            customPlatforms.push(platform);
        }

        for (let i = 544; i < 1024; i += 32){
            let platform = new Platform(this, i, 560);
            customPlatforms.push(platform);
        }*/

        for (let i = 16; i < 112; i += 32){
            let platform = new Platform(this, i, 400);
            customPlatforms.push(platform);
        }

        customPlatforms.push(new Platform(this, 144, 304));

        for (let i = 174; i < 334; i += 32){
            let platform = new Platform(this, i, 464);
            customPlatforms.push(platform);
        }

        customPlatforms.push(new Platform(this, 174, 432));

        for (let i = 398; i < 462; i += 32){
            let platform = new Platform(this, i, 432);
            customPlatforms.push(platform);
        }

        for (let i = 526; i < 622; i += 32){
            let platform = new Platform(this, i, 368);
            customPlatforms.push(platform);
        }

        customPlatforms.push(new Platform(this, 494, 338));

        for (let i = 238; i < 430; i += 32){
            let platform = new Platform(this, i, 240);
            customPlatforms.push(platform);
        }

        for (let i = 686; i < 750; i += 32){
            let platform = new Platform(this, i, 272);
            customPlatforms.push(platform);
        }

        customPlatforms.push(new Platform(this, 814, 240));

        for (let i = 782; i < 878; i += 32){
            let platform = new Platform(this, i, 336);
            customPlatforms.push(platform);
        }

        for (let i = 878; i < 1024; i += 32){
            let platform = new Platform(this, i, 176);
            customPlatforms.push(platform);
        }


        customPlatforms.forEach(platform => {
            platformGroup.create(platform.x, platform.y, 'tile1');
        })

     
        
        this.player = new Player(this, 16, 350);
        this.physics.add.collider(this.player, platformGroup);
        this.cameras.main.startFollow(this.player, true);

        //создание 3 врагов из класса Enemy1
        this.enemy1 = new Enemy1(this, 100, 530, "enemy1");
        this.physics.add.collider(this.enemy1, platformGroup);
        this.physics.add.overlap(this.player, this.enemy1);

        this.enemy2 = new Enemy1(this, 316, 432, "enemy2");
        this.physics.add.collider(this.enemy2, platformGroup);
        this.physics.add.overlap(this.player, this.enemy2);

        this.enemy3 = new Enemy1(this, 900, 530, "enemy3");
        this.physics.add.collider(this.enemy3, platformGroup);
        this.physics.add.overlap(this.player, this.enemy3);

        //создание 2 врагов из класса Enemy3
        this.enemy4 = new Enemy3(this, 250, 180, "enemy4");
        this.physics.add.collider(this.enemy4, platformGroup);
        this.physics.add.overlap(this.player, this.enemy4);

        this.enemy5 = new Enemy3(this, 1000, 120, "enemy5");
        this.physics.add.collider(this.enemy5, platformGroup);
        this.physics.add.overlap(this.player, this.enemy5);

        this.enemy6 = new Enemy3(this, 600, 300, "enemy6");
        this.physics.add.collider(this.enemy6, platformGroup);
        this.physics.add.overlap(this.player, this.enemy6);

        this.enemiesList = [this.enemy1, this.enemy2, this.enemy3, this.enemy4, this.enemy5, this.enemy6];

        //переключение между сценами по кнопке Enter
        this.input.keyboard.on('keydown', function(event) {
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
}