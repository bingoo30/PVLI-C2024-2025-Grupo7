/**
 * Escena de loading.
 * @extends Phaser.Scene
 */
export default class AbilityTree extends Phaser.Scene {
	constructor() {
		super({ key: 'AbilityTree' });
	}
	preload() {
		this.load.image('abilityBackground', 'assets/tree/background.png');
		this.load.image('juegoDeProyectiles', 'assets/tree/juegoDeProyectiles.png');
		this.load.image('francotirador', 'assets/tree/francotirador.png');
		this.load.image('utilidad', 'assets/tree/utilidad.png');
		this.load.image('LockedAbility', 'assets/tree/utilidad.png');
	}
	create() {
		//fondo
		const background = this.add.image(0,0,'abilityBackground');

		//Titulos 
		const juegoDeProyectiles = this.add.text(this.sys.game.canvas.width * 0.25, this.sys.game.canvas.height * 0.2, 'Juego de proyectiles', {
			fontFamily: 'PixelArt',
			fontSize: 36

		}).setOrigin(0.5, 0.5);

		const francotirador = this.add.text(this.sys.game.canvas.width * 0.5, this.sys.game.canvas.height * 0.2, 'Francotirador explosivo', {
			fontFamily: 'PixelArt',
			fontSize: 36

		}).setOrigin(0.5, 0.5);

		const utilidad = this.add.text(this.sys.game.canvas.width * 0.75, this.sys.game.canvas.height * 0.2, 'Utilidad', {
			fontFamily: 'PixelArt',
			fontSize: 36

		}).setOrigin(0.5, 0.5);

		this.abilities = [];
		// #region botones interactuables
		this.rama1Button = this.add.image(this.sys.game.canvas.width * 0.25, this.sys.game.canvas.height * 0.2 + 200, 'LockedAbility');
		this.rama1Button.setInteractive();


		// #endregion
	}
}