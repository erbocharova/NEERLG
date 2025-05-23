import Phaser from 'phaser'
import MenuScene from './scenes/MenuScene'
import Level1Scene from './scenes/Level1Scene'
import Level2Scene from './scenes/Level2Scene'
import Level3Scene from './scenes/Level3Scene'
import EndScene from './scenes/EndScene'
import DeathScene from './scenes/DeathScene'

const config = {
	type: Phaser.AUTO,
	width: 3072, 
	zoom:2,
	pixelArt: true,
	height: 576,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { x:0, y: 300 },
			debug: true
		}
	},
	scene: [MenuScene, Level1Scene, Level2Scene, Level3Scene, EndScene, DeathScene]
};

const game2 = new Phaser.Game(config);
