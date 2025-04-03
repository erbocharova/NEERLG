import Phaser from 'phaser'
import ProceduralLevelGenerator from './ProceduralLevelGenerator'
import Player from "./Player";
//import Enemy3 from "./Enemy3";
import Enemy1 from "./Enemy1";
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
export default class Level1Scene extends Phaser.Scene
{
    constructor()
    {
        super({key: 'Level1Scene'});
        this.playerAlive = true;
    }



    preload()
    {
        this.load.image('background1', background1);
        this.load.image('background5', bgnNight5);
        this.load.image('background6', bgnNight6);
        this.load.image('tile', tile);
        this.load.spritesheet('playerIdle', playerIdle, { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('playerRun', playerRun, { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('playerJump', playerJump, { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('playerHandHit', playerHandHit, { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('playerLegHit', playerLegHit, { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('playerHurt', playerHurt, { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('playerDeath', playerDeath, { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('enemyWalk3', enemyWalk3, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('enemyAttack3', enemyAttack3, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('enemyIdle3', enemyIdle3, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('enemyHurt3', enemyHurt3, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('enemyDeath3', enemyDeath3, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('enemyAttack1', enemyAttack1, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('enemyIdle1', enemyIdle1, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('enemyWalk1', enemyWalk1, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('enemyHurt1', enemyHurt1, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('enemyDeath1', enemyDeath1, { frameWidth: 32, frameHeight: 32 });
        this.load.image('heart-icon', heartIcon);
    }

    create()
    {
        this.add.image(512, 288, 'background1');
        this.add.image(512, 288, 'background5');
        this.add.image(512, 288, 'background6');
        this.add.image(880, 30, 'heart-icon');

        this.add.text(0, 0, 'Level 1', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
        this.add.text(0, 16, 'Press ←, →, ↑ to move', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
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
        this.player.DrawHealthBar();
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
        else {
            this.scene.switch('DeathScene');
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
    
