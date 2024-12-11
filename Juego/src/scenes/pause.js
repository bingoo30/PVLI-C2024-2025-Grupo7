
export default class Pause extends Phaser.Scene {
	/**
	 * Escena de Pausa.
	 * @extends Phaser.Scene
	 */
	constructor() {
		super({ key: 'Pause' });
	}
	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create(data) {
		this.sound.pauseAll();
		// Recuperar la clave de la escena previa
		const previousSceneKey = data.previousScene;

		// efecto de sonido del botón
		var buttonSFX = this.sound.add('buttonPressedAudio');
		buttonSFX.setVolume(0.5);

		// Obtener la instancia de la escena previa
		this.previousScene = this.scene.get(previousSceneKey);

		const background = this.add.image(this.sys.game.canvas.width * 0.5, this.sys.game.canvas.height * 0.5, 'pauseBackground').setOrigin(0.5,0.5);
		background.setDisplaySize(this.scale.width, this.scale.height);

		//console.log("me he creado", this.scene.key);
		let resume = this.add.text(this.sys.game.canvas.width * 0.5, this.sys.game.canvas.height * 0.25, 'RESUME', {
			fontFamily: 'PixelArt',
			fontSize: 48

		}).setOrigin(0.5, 0.5);
		resume.setInteractive();
		let tree = this.add.text(this.sys.game.canvas.width * 0.5, this.sys.game.canvas.height * 0.5, 'ABILITIES',{
			fontFamily: 'PixelArt',
			fontSize: 48

		}).setOrigin(0.5, 0.5);
		tree.setInteractive();
		let acvs = this.add.text(this.sys.game.canvas.width * 0.5, this.sys.game.canvas.height * 0.75, 'ACHIEVEMENTS', {
			fontFamily: 'PixelArt',
			fontSize: 48

		}).setOrigin(0.5, 0.5);
		acvs.setInteractive();

		resume.on('pointerdown', () => {
			
			if (this.previousScene && typeof this.previousScene.resumeGame === 'function') {
				this.sound.resumeAll(); // Reanuda todos los sonidos pausados
				this.previousScene.resumeGame(); // Llama al método solo si est?definido
			} else if (!this.previousScene) {
				console.error("previousScene no es válido");
			}
			else {
				console.error("resumeGame no est?definido");
			}
			
			
		});
		acvs.on('pointerdown', () => {
			buttonSFX.play();
			this.scene.start('AchievementScene', { previousScene: this.scene.key });

		});
		tree.on('pointerdown', () => {
			buttonSFX.play();
			this.scene.start('AbilityTree', { previousScene: this.scene.key });
		});
	}
}