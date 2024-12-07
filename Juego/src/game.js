import Level1 from './scenes/levels/level_1.js';
import Level2 from './scenes/levels/level_2.js';
import Boss from './scenes/levels/boss_scene.js';
import Title from './scenes/title.js';
import Loading from './scenes/loading.js';
import GameOver from './scenes/gameover.js';
import Pause from './scenes/pause.js';
import AchievementScene from './scenes/achievements/achievement_scene.js';
import AbilityTree from './scenes/ability_tree.js';
import DialogScene from './scenes/dialog.js';



let config = {
	type: Phaser.AUTO,
	parent: 'juego',
	width: 1000,
	height: 600,
	pixelArt: true,
	mipmapFilter: 'LINEAR_MIPMAP_LINEAR',
	scale: {
		autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,

		mode: Phaser.Scale.FIT,
		min: {
			width: 400,
			height: 300
		},
		max: {
			width: 1600,
			height: 1200
		},
		zoom: 1

	},
	//scene: [Loading, Inicio, Nivel1, Nivel2, Nivel3, Nivel4, Habilidad, Pausa, GameOver,Creditos],	// Decimos a Phaser cual es nuestra escena
	scene: [Loading, Title,DialogScene, Boss, Level1,Level2, GameOver, AchievementScene, AbilityTree, Pause],

	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
			debug: true
		},

		checkCollision: {
			up: true,
			down: true,
			left: true,
			right: true
		}

	},


	title: "Madness",
	version: "1.0.0"

};

new Phaser.Game(config);