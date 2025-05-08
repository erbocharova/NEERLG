import Phaser from "phaser";

import bgnDay1 from "../../assets/Tileset/Background/Day/1.png"
import bgnDay2 from "../../assets/Tileset/Background/Day/2.png"
import bgnDay3 from "../../assets/Tileset/Background/Day/3.png"
import bgnDay4 from "../../assets/Tileset/Background/Day/4.png"
import bgnDay6 from "../../assets/Tileset/Background/Day/6.png"
import bgnDay7 from "../../assets/Tileset/Background/Day/7.png"
import bgnNight1 from "../../assets/Tileset/Background/Night/1.png"
import bgnNight11 from "../../assets/Tileset/Background/Night/1_1.png"
import bgnNight4 from "../../assets/Tileset/Background/Night/4_1.png"
import bgnNight5 from "../../assets/Tileset/Background/Night/5.png"
import bgnNight6 from "../../assets/Tileset/Background/Night/6.png"
import overlay from "../../assets/Tileset/Background/Overlay_illumination_1.png"

import tileset from "../../assets/Tileset/Tiles/Tileset.png"

import heartIcon from "../../assets/Implant/Icons/Icon9_18.png"
import iconset from "../../assets/Implant/Icons/Iconset.png"
import door from "../../assets/Tileset/Objects/Door3.png"

import playerSpritesheet from "../../assets/Characters/Cyborg/Cyborg.png"
import enemy3Spritesheet from "../../assets/Enemies/3/Enemy3Spritesheet.png"
import enemy1Spritesheet from "../../assets/Enemies/1/Enemy1.png"
import boss1Spritesheet from "../../assets/Bosses/2/Boss1Spritesheet.png"

import startBtn from "../../assets/GUI/Buttons/Start.png"
import continueBtn from "../../assets/GUI/Buttons/Continue.png"
import logo from "../../assets/GUI/Logo/Logo.png"

export default class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    preload() {
        this.load.image('startButton', startBtn);
        this.load.image('continueButton', continueBtn);
        this.load.image('logo', logo);

        this.load.image('backgroundDay1', bgnDay1);
        this.load.image('backgroundDay2', bgnDay2);
        this.load.image('backgroundDay3', bgnDay3);
        this.load.image('backgroundDay4', bgnDay4);
        this.load.image('backgroundDay6', bgnDay6);
        this.load.image('backgroundDay7', bgnDay7);
        this.load.image('backgroundNight1', bgnNight1);
        this.load.image('backgroundNight11', bgnNight11);
        this.load.image('backgroundNight4', bgnNight4);
        this.load.image('backgroundNight5', bgnNight5);
        this.load.image('backgroundNight6', bgnNight6);

        this.load.image('door', door);

        this.load.spritesheet('playerSpritesheet', playerSpritesheet, { frameWidth: 40, frameHeight: 40});
        this.load.spritesheet('enemy3Spritesheet', enemy3Spritesheet, { frameWidth: 40, frameHeight: 46 });
        this.load.spritesheet('enemy1Spritesheet', enemy1Spritesheet, {frameWidth: 20, frameHeight: 25});
        this.load.spritesheet('boss1Spritesheet', boss1Spritesheet, { frameWidth: 80, frameHeight: 40 });

        
        this.load.spritesheet('tileset', tileset, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('iconset', iconset, { frameWidth: 32, frameHeight: 32 });

        this.load.image('backgroundDeath', overlay);
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