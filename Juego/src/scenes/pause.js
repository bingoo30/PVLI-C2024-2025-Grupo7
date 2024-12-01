/**
 * Escena de Título.
 * @extends Phaser.Scene
 */
export default class Pause extends Phaser.Scene {
	/**
	 * Escena principal.
	 * @extends Phaser.Scene
	 */
	constructor() {
		super({ key: 'Pause' });
	}
	/**
	 * Cargamos todos los assets que vamos a necesitar
	 */
	preload() {
		this.load.image('pauseBackground', 'assets/GUI/pause.png');

	}
	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create(data) {
		// Recuperar la clave de la escena previa
		const previousSceneKey = data.previousScene;

		// Obtener la instancia de la escena previa
		this.previousScene = this.scene.get(previousSceneKey);

		const background = this.add.image(0, 0, 'pauseBackground').setOrigin(0, 0);
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
				this.previousScene.resumeGame(); // Llama al método solo si está definido
			} else if (!this.previousScene) {
				console.error("previousScene no es válido");
			}
			else {
				console.error("resumeGame no está definido");
			}
			
			
		});
		acvs.on('pointerdown', () => {
			this.scene.start('AchievementScene', { previousScene: this.scene.key });

		});
		tree.on('pointerdown', () => {
			this.scene.start('AbilityTree');
		});
	}
}