import Nivel1 from './escenas/Niveles/Nivel1.js';
import Title from './escenas/title.js';
import Loading from './escenas/loading.js';


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
	//scene: [Loading, Inicio, Nivel1, Nivel2, Nivel3, Nivel4, Habilidad, Pausa, Creditos],	// Decimos a Phaser cual es nuestra escena
	scene: [Loading, Title, Nivel1],

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

	plugins: {
		scene: [
			{
				key: "PhaserNavMeshPlugin", // Key to store the plugin class under in cache
				plugin: PhaserNavMeshPlugin, // Class that constructs plugins
				mapping: "navMeshPlugin", // Property mapping to use for the scene, e.g. this.navMeshPlugin
				start: true
			}
		]
	},

	title: "Madness",
	version: "1.0.0"

};

new Phaser.Game(config);