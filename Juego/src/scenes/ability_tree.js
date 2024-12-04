import AbilityIcon from "../UI/abilityIcon.js";
import StatusIcon from "../UI/statusIcon.js";


/**
 * Escena de loading.
 * @extends Phaser.Scene
 */
export default class AbilityTree extends Phaser.Scene {
	constructor() {
		super({ key: 'AbilityTree' });
	}
	preload() {
		this.load.image('titleHeader', 'assets/tree/titleHeader.png');
		this.load.image('LockedAbility', 'assets/tree/locked.png');
		this.load.image('statusBall', 'assets/tree/statusBall.png');
		this.load.image('statusBackground', 'assets/tree/statusBackground.png');
		const treeDatas = this.cache.json.get('treeData');
		// Precargar los sprites de las habilidades
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
	create(data) {

		// Recuperar la clave de la escena previa
		const previousSceneKey = data.previousScene;

		this.player = this.registry.get('player'); // Recuperamos al jugador

		//fondo
		const background = this.add.image(0, 0, 'pauseBackground').setOrigin(0,0);
		background.setDisplaySize(this.scale.width, this.scale.height);

		let header1 = this.add.image(this.sys.game.canvas.width * 0.25, this.sys.game.canvas.height * 0.2, 'titleHeader').setOrigin(0.5);
		//header1.setScale(1);
		//Titulos 
		const juegoDeProyectiles = this.add.text(this.sys.game.canvas.width * 0.25, this.sys.game.canvas.height * 0.2-10, 'Juego de proyectiles', {
			fontFamily: 'PixelArt',
			color: '#4A9969',
			fontSize: 36

		}).setOrigin(0.5, 0.5);

		let header2 = this.add.image(this.sys.game.canvas.width * 0.75, this.sys.game.canvas.height * 0.2, 'titleHeader').setOrigin(0.5);
		const utilidad = this.add.text(this.sys.game.canvas.width * 0.75, this.sys.game.canvas.height * 0.2-15, 'Utilidad', {
			fontFamily: 'PixelArt',
			color: '#4A9969',
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
				data.locked,
				this.player
			);
			this.abilities.push(ability);
		}

		this.status = [];
		const statusData = this.cache.json.get('statusData');
		for (let i = 0; i < statusData.length; i++) {
			const data = statusData[i]; // Obtener los datos de la habilidad actual.
			const s = new StatusIcon( //creo el objeto
				this,
				data.x,
				data.y,
				data.title,
				data.count,
				this.player
			);
			this.status.push(s);
		}
		// #endregion

		var exitButton = this.add.image(50, 50, 'ExitButton').setScale(0.25);
		exitButton.setRotation(0.75);
		exitButton.setInteractive(); // Hacemos el sprite interactivo para que lance eventos


		//para salir //problema, cuando solo cuando quito la escena en title, no queda ninguna 
		exitButton.on('pointerdown', pointer => {
			this.scene.stop(); // Detiene la escena actual.
			this.scene.start(previousSceneKey);
		});
	}
	update(time, dt) {
		super.update(time, dt);
	}
}