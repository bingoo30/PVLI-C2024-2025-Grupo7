import AbilityIcon from "../UI/abilityIcon.js";

/**
 * Escena de loading.
 * @extends Phaser.Scene
 */
export default class AbilityTree extends Phaser.Scene {
	constructor() {
		super({ key: 'AbilityTree' });
	}
	init(abilityPoints, statusPoints) {
		this.abilityPoints = abilityPoints;
		this.statusPoints = statusPoints;

	}
	preload() {
		this.load.image('abilityBackground', 'assets/tree/background.png');
		this.load.image('titleHeader', 'assets/tree/titleHeader.png');
		this.load.image('LockedAbility', 'assets/tree/unlockedAbility.png');
		this.load.json('treeData', './tree_data.json');
	}
	create() {
		//fondo
		const background = this.add.image(0,0,'abilityBackground').setOrigin(0.5);

		let header1 = this.add.image(this.sys.game.canvas.width * 0.25, this.sys.game.canvas.height * 0.2, 'titleHeader').setOrigin(0.5);
		header1.setScale(0.5);
		//Titulos 
		const juegoDeProyectiles = this.add.text(this.sys.game.canvas.width * 0.25, this.sys.game.canvas.height * 0.2, 'Juego de proyectiles', {
			fontFamily: 'PixelArt',
			fontSize: 36

		}).setOrigin(0.5, 0.5);

		let header2 = this.add.image(this.sys.game.canvas.width * 0.5, this.sys.game.canvas.height * 0.2, 'titleHeader').setOrigin(0.5);
		header2.setScale(0.5);
		const francotirador = this.add.text(this.sys.game.canvas.width * 0.5, this.sys.game.canvas.height * 0.2, 'Francotirador explosivo', {
			fontFamily: 'PixelArt',
			fontSize: 36

		}).setOrigin(0.5, 0.5);

		let header3 = this.add.image(this.sys.game.canvas.width * 0.75, this.sys.game.canvas.height * 0.2, 'titleHeader').setOrigin(0.5);
		header3.setScale(0.5);
		const utilidad = this.add.text(this.sys.game.canvas.width * 0.75, this.sys.game.canvas.height * 0.2, 'Utilidad', {
			fontFamily: 'PixelArt',
			fontSize: 36

		}).setOrigin(0.5, 0.5);


		this.abilities = [];
		const treeData = this.cache.json.get('treeData');
		for (let i = 0; i < treeData.length; i++) {
			const data = treeData[i]; // Obtener los datos de la habilidad actual.
			const ability = new AbilityIcon( //creo el objeto
				this,
				data.x,
				data.y,
				data.title,
				data.unlockedSprite,
				data.info,
				data.locked
			);
			this.abilities.push(ability);
		}
		// #endregion
	}
	update(time, dt) {
		super.update(time, dt);
	}
}