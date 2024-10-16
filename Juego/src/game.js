let config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	pixelArt: true,
	scale: {
		autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
	},
	scene: [Nivel1, Nivel2, Nivel3, Nivel4,Skill, Pausa, Inicio,Credits],	// Decimos a Phaser cual es nuestra escena
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 },
			debug: false
		}
	}
};

new Phaser.Game(config);