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
		this.load.image('titleHeader', 'assets/tree/titleHeader.png');
		this.load.image('LockedAbility', 'assets/tree/locked.png');
		const treeDatas = this.cache.json.get('treeData');
		// Precargar dinámicamente los sprites de logros
		treeDatas.forEach(data => {
			this.load.image(data.unlockedSprite, `assets/tree/${data.unlockedSprite}.png`);
		});

		this.load.on('complete', function (f) {
			this.scene.time.addEvent({
				delay: 200,
				callback: () => { console.log("cargado"); }
			})
		});
	}
	create() {
		//fondo
		const background = this.add.image(0, 0, 'pauseBackground').setOrigin(0,0);
		background.setDisplaySize(this.scale.width, this.scale.height);

		let header1 = this.add.image(this.sys.game.canvas.width * 0.25, this.sys.game.canvas.height * 0.2, 'titleHeader').setOrigin(0.5);
		//header1.setScale(1);
		//Titulos 
		const juegoDeProyectiles = this.add.text(this.sys.game.canvas.width * 0.25, this.sys.game.canvas.height * 0.2-10, 'Juego de proyectiles', {
			fontFamily: 'PixelArt',
			fontSize: 36

		}).setOrigin(0.5, 0.5);

		let header2 = this.add.image(this.sys.game.canvas.width * 0.75, this.sys.game.canvas.height * 0.2, 'titleHeader').setOrigin(0.5);
		const utilidad = this.add.text(this.sys.game.canvas.width * 0.75, this.sys.game.canvas.height * 0.2-15, 'Utilidad', {
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