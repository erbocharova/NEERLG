import Phaser from 'phaser'
import Level1Scene from './scenes/Level1Scene'
import Level2Scene from './scenes/Level2Scene'
import EndScene from './scenes/EndScene'
import DeathScene from './scenes/DeathScene'

var config = {
	type: Phaser.AUTO,
	width: 1024,
	height: 576,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 300 },
			debug: false
		}
	},
	scene: [Level1Scene, Level2Scene, EndScene, DeathScene]
	
};

var game = new Phaser.Game(config);
