import Phaser, { GameObjects } from 'phaser'
import ProceduralLevelGenerator from './ProceduralLevelGenerator'
import Player from "./Player";
//import Enemy3 from "./Enemy3";
import Enemy1 from "./Enemy1";
import Level2Scene from './Level2Scene'

export default class Level1Scene extends Phaser.Scene
{
    constructor()
    {
        super({key: 'Level1Scene'});
        this.playerAlive = true;
    }
 
    preload()
    {
        this.load.image('background0', 'assets/Tileset/Background/Day/1.png');
	    this.load.image('background1', 'assets/Tileset/Background/Day/day.png');
        this.load.image('background2', 'assets/Tileset/Background/Day/6.png');
        this.load.image('tile', 'assets/Tileset/1 Tiles/Tiles_01.png');
        this.load.spritesheet('playerIdle', 'assets/Characters/2 Punk/Punk_idle1.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('playerRun', 'assets/Characters/2 Punk/Punk_run1.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('playerJump', 'assets/Characters/2 Punk/Punk_jump1.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('playerHandHit', 'assets/Characters/2 Punk/Punk_attack1.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('playerLegHit', 'assets/Characters/2 Punk/Punk_punch.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('playerHurt', 'assets/Characters/2 Punk/Punk_hurt.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('playerDeath', 'assets/Characters/2 Punk/Punk_death.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('enemyWalk3', 'assets/Enemies/3/Walk.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('enemyAttack3', 'assets/Enemies/3/Attack.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('enemyIdle3', 'assets/Enemies/3/Idle.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('enemyHurt3', 'assets/Enemies/3/Hurt.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('enemyDeath3', 'assets/Enemies/3/Death.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('enemyAttack1', 'assets/Enemies/1/Attack1.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('enemyIdle1', 'assets/Enemies/1/Idle1.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('enemyWalk1', 'assets/Enemies/1/Walk1.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('enemyHurt1', 'assets/Enemies/1/Hurt1.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('enemyDeath1', 'assets/Enemies/1/Death1.png', { frameWidth: 32, frameHeight: 32 });
    }

    create()
    {
        this.add.image(512, 288, 'background0');
	    this.add.image(512, 288, 'background1');
        this.add.image(512, 288, 'background2');

        this.add.text(0, 0, 'Level 1', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
        this.add.text(0, 16, 'Press ←, →, ↑, ↓ to move', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
        this.add.text(0, 32, 'Press E to hit with hand', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
        this.add.text(0, 48, 'Press R to kick', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
        this.add.text(0, 64, 'Kill all enemies and press Enter', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });

            // Создание игры
        let generator = new ProceduralLevelGenerator();

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
            platformGroup.create(platform.x, platform.y, 'tile');
        });

     
        
        this.player = new Player(this, 16, 368);
        this.physics.add.collider(this.player.sprite, platformGroup);


        //this.enemy3 = new Enemy3(this, 502, 530);                     убрала героя из другого класса
        //this.physics.add.collider(this.enemy3.sprite, platformGroup);
        //this.physics.add.overlap(this.player.sprite, this.enemy3.sprite);

        this.enemy1 = new Enemy1(this, 900, 530, "enemy1");
        this.physics.add.collider(this.enemy1.sprite, platformGroup);
        this.physics.add.overlap(this.player.sprite, this.enemy1.sprite);

        this.enemy2 = new Enemy1(this, 100, 530, "enemy2");
        this.physics.add.collider(this.enemy2.sprite, platformGroup);
        this.physics.add.overlap(this.player.sprite, this.enemy2.sprite);
        
        //let enemiesGroup = this.add.group(this.enemy1, this.enemy2);

        this.enemiesList = [this.enemy1, this.enemy2];

        //переключение между сценами по кнопке Enter
        this.input.keyboard.on('keydown', function(event) {
            if (event.key === 'Enter'/* && this.enemiesList.length === 0*/) {
                this.scene.switch('Level2Scene');
            }
        }, this);

    }

    update(time, delta) {
        if (this.playerAlive)
        {
            if (this.player.healthPoints > 0)
            {
                this.player.update(time, delta);
            }
            else
            {
                this.player.sprite.play('death', true);
                this.playerAlive = false;
                let playerDestroyDelay = this.time.delayedCall(800, this.player.destroy);
            }

            this.enemiesList.forEach((enemy) => {
                enemy.update(time, delta, this.player);
            })
        }
        /*else if (this.enemiesList.length != 0)
            {
                this.scene.stop('Scene1');
                this.scene.launch('Scene2');
            }*/

        
        

        //let isAttacking = false;

        //this.physics.add.overlap(this.player.sprite, this.enemy.sprite, (() => this.enemy.attackPlayer(this.player)), (() => isAttacking));
     }
     
}
    
