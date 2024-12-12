export default class Victory extends Phaser.Scene {
	/**
	 * Escena de victoria
	 * @extends Phaser.Scene
	 */
	preload() {
		this.load.image('victoryImage', 'assets/GUI/victory.png');
		this.load.json('VictoryDialog', 'assets/dialogues/dialogues_victory.json');
	}
	constructor() {
		super({ key: 'victory' });
	}

	create(data) {
		this.sound.stopAll(); // Detiene todos los sonidos en reproducci¨®n

		const victory = this.add.image(this.sys.game.canvas.width / 2, 20, 'victoryImage').setOrigin(0.5, 0).setScale(1.2);

		let GameOverButton = this.add.image(this.sys.game.canvas.width * 0.5, this.sys.game.canvas.height * 0.6, 'ExitToMainMenuButton').setScale(0.35).setInteractive().setVisible(false);

		const dialogos = this.cache.json.get('VictoryDialog');
		this.time.delayedCall(2000, () => {
			this.changeToDialogScene({ sceneKey: this.scene.key, backgroundType: 'dark', dialogos: dialogos});
			victory.setVisible(false);

			this.add.text(this.sys.game.canvas.width * 0.5, this.sys.game.canvas.height * 0.5, 'END', {
				fontSize: 90,
				fontFamily: "PixelArt",
				fill: '#FFFFFF',
				align: 'left'
			}).setOrigin(0.5, 0.5);

			GameOverButton.setVisible(true);
		});

		GameOverButton.on('pointerup', () => {
			this.scene.start('title', { player: data.player, tries: data.tries }); //Cambiamos a la escena de juego
		});


	}
	changeToDialogScene(data) {
		this.scene.launch('Dialog', data);
		this.scene.bringToTop('Dialog');
		this.scene.pause();
	}
}
