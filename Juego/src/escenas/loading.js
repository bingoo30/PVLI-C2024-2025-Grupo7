/**
 * Escena de loading.
 * @extends Phaser.Scene
 */
export default class Loading extends Phaser.Scene {
	/**
	 * Escena principal.
	 * @extends Phaser.Scene
	 */
	constructor() {
		super({ key: 'loading' });
	}

	/**
	 * Cargamos todos los assets que vamos a necesitar
	 */
	preload() {
		this.load.image('start', 'assets/GUI/start.png');
		this.load.image('background', 'assets/GUI/fondoinicio.png');
		this.load.image('Player', 'assets/player.png');
		this.load.image('Enemy', 'assets/player.png');
		this.load.tilemapTiledJSON('mapa1', 'assets/map/mapa1.json');
		this.load.image('tileset', 'assets/map/mapTiles.png');

		this.load.on('complete', function (f) {
			this.scene.time.addEvent({
				delay: 2000,
				callback: () => { this.scene.scene.start("title") }
			})
		});
		

	}
	
	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
		console.log("me he creado", this.scene.key);

		this.loadingText = this.add.text(400, 300, 'Loading', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);

		this.dots = '.';
		this.time.addEvent({
			delay: 300,
			callback: this.updateDots,
			callbackScope: this,
			loop: true
		});
	}

	updateDots() {
		// Add dots up to three and reset
		this.dots = this.dots.length < 3 ? this.dots + '.' : '';
		this.loadingText.setText('Loading' + this.dots);
	}
}
