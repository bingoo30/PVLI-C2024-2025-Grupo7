/**
 * Escena de Título.
 * @extends Phaser.Scene
 */
export default class Stop extends Phaser.Scene {
	/**
	 * Escena principal.
	 * @extends Phaser.Scene
	 */
	constructor() {
		super({ key: 'pause' });
	}
	init(previousScene) {
		this.previousScene = previousScene;
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
	create() {
		//console.log("me he creado", this.scene.key);
		let resume = this.add.text(this.sys.game.canvas.width * 0.5, this.sys.game.canvas.height * 0.25, 'RESUME', {
			fontFamily: 'PixelArt',
			fontSize: 48

		}).setOrigin(0.5, 0.5);
		resume.setInteractive();
		let tree = this.add.text(this.sys.game.canvas.width * 0.5, this.sys.game.canvas.height * 0.5, 'HABILITIES',{
			fontFamily: 'PixelArt',
			fontSize: 48

		}).setOrigin(0.5, 0.5);
		tree.setInteractive();
		let acvs = this.add.text(this.sys.game.canvas.width * 0.5, this.sys.game.canvas.height * 0.75, 'ACHIEVEMENTS', {
			fontFamily: 'PixelArt',
			fontSize: 48

		}).setOrigin(0.5, 0.5);

		resume.on('pointerdown', () => {
			this.scene.start(this.previousScene);
		});
		acvs.on('pointerdown', () => {
			this.scene.launch('AchievementScene');
		});
		tree.on('pointerdown', () => {
			this.scene.launch('AbilityTree');
		});
	}
}