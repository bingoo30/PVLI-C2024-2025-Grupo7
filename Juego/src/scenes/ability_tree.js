import AbilityIcon from "../UI/abilityIcon.js";
import StatusIcon from "../UI/statusIcon.js";


/**
 * Escena de arbol del player.
 * @extends Phaser.Scene
 */
export default class AbilityTree extends Phaser.Scene {
	constructor() {
		super({ key: 'AbilityTree' });
	}
	preload() {
		this.load.image('titleHeader', '/PVLI-C2024-2025-Grupo7/Juego/assets/tree/titleHeader.png');
		this.load.image('LockedAbility', '/PVLI-C2024-2025-Grupo7/Juego/assets/tree/locked.png');
		this.load.image('statusBall', '/PVLI-C2024-2025-Grupo7/Juego/assets/tree/statusBall.png');
		this.load.image('statusBackground', '/PVLI-C2024-2025-Grupo7/Juego/assets/tree/statusBackground.png');
		const treeDatas = this.cache.json.get('treeData');
		// Precargar los sprites de las habilidades
		treeDatas.forEach(data => {
			this.load.image(data.unlockedSprite, `/PVLI-C2024-2025-Grupo7/Juego/assets/tree/${data.unlockedSprite}.png`);
		});
		
	}
	create(data) {

		// Recuperar la clave de la escena previa
		const previousSceneKey = data.previousScene;

		this.player = this.registry.get('player'); // Recuperamos al jugador

		//fondo
		const background = this.add.image(0, 0, 'pauseBackground').setOrigin(0,0);
		background.setDisplaySize(this.scale.width, this.scale.height);

		let header1 = this.add.image(this.sys.game.canvas.width * 0.17, this.sys.game.canvas.height * 0.2, 'titleHeader').setOrigin(0.5).setScale(0.7);
		//Titulos 
		const juegoDeProyectiles = this.add.text(this.sys.game.canvas.width * 0.17, this.sys.game.canvas.height * 0.2-10, 'Juego de proyectiles', {
			fontFamily: 'PixelArt',
			color: '#4A9969',
			fontSize: 24

		}).setOrigin(0.5, 0.5);

		let header2 = this.add.image(this.sys.game.canvas.width * 0.5, this.sys.game.canvas.height * 0.2, 'titleHeader').setOrigin(0.5).setScale(0.7);
		const francotirador = this.add.text(this.sys.game.canvas.width * 0.5, this.sys.game.canvas.height * 0.2 - 10, 'Francotirador explosivo', {
			fontFamily: 'PixelArt',
			color: '#4A9969',
			fontSize: 24

		}).setOrigin(0.5, 0.5);

		let header3 = this.add.image(this.sys.game.canvas.width * 0.83, this.sys.game.canvas.height * 0.2, 'titleHeader').setOrigin(0.5).setScale(0.7);
		const utilidad = this.add.text(this.sys.game.canvas.width * 0.83, this.sys.game.canvas.height * 0.2-13, 'Utilidad', {
			fontFamily: 'PixelArt',
			color: '#4A9969',
			fontSize: 24

		}).setOrigin(0.5, 0.5);


		//puntos de habilidad
		this.abilityPointText = this.add.text(this.sys.game.canvas.width * 0.60, this.sys.game.canvas.height * 0.1, `AbilityPoints: ${this.player.abilityPoint}`, {
			fontFamily: 'PixelArt',
			color: '#4A9969',
			fontSize: 18

		}).setOrigin(0.5, 0.5);

		this.statusPointText = this.add.text(this.sys.game.canvas.width * 0.60, this.sys.game.canvas.height * 0.15, `StatusPoints: ${this.player.statusPoint}`, {
			fontFamily: 'PixelArt',
			color: '#4A9969',
			fontSize: 18

		}).setOrigin(0.5, 0.5);


		//habilidades
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
				data.previousIsLocked,
				this.player
			);
			this.abilities.push(ability);
		}

		//status
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

		let exitButton = this.add.image(50, 50, 'ExitButton').setScale(0.25);
		exitButton.setRotation(0.75);
		exitButton.setInteractive(); // Hacemos el sprite interactivo para que lance eventos

		const exitSound = this.sound.add('exitButtonAudio');
		exitSound.setVolume(0.5);
		//para salir //problema, cuando solo cuando quito la escena en title, no queda ninguna 
		exitButton.on('pointerdown', () => {
			exitSound.play();
			this.time.addEvent({
				delay: 500, 
				callback: () => {
					this.scene.stop(); // Detiene la escena actual.
					this.scene.start(previousSceneKey);
				}
			});
		});
	}
	update(time, dt) {
		super.update(time, dt);

		this.statusPointText.setText(`AbilityPoints: ${this.player.abilityPoint}`);
		this.abilityPointText.setText(`StatusPoints: ${this.player.statusPoint}`);
	}
}