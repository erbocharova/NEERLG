import Phaser, { Scale } from 'phaser'
import Level1Scene from './scenes/Level1Scene'
import Level2Scene from './scenes/Level2Scene'
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
			debug: false
		}
	},
	scene: [Level1Scene, EndScene, DeathScene]
	
};

const game = new Phaser.Game(config);
