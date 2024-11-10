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
		// #region Images

		// #region UI
		this.cameras.main.setBackgroundColor('#d3d3d3'); 
		this.load.image('start', 'assets/GUI/start.png');
		this.load.image('background', 'assets/GUI/fondoinicio.png');
		this.load.image('end', 'assets/GUI/gameover.png');

		this.load.spritesheet('PiuAnim', 'assets/Piu.png', {
			frameWidth: 25,  // Ancho de cada cuadro
			frameHeight: 10, // Altura de cada cuadro
			endFrame: 17      // Número de cuadros en el sprite sheet
		});

		// #endregion

		// #region Player

		this.load.image('Player', 'assets/player.png');
		this.load.image('Bala', 'assets/bala.png');
		this.load.image('Bala2', 'assets/bala2.png');
		this.load.image('Particle', 'assets/particles.png');
		this.load.image('Coin', 'assets/coin.png');

		// #endregion

		// #region Enemies

		this.load.image('Bob', 'assets/Bob.png');
		this.load.image('Crac', 'assets/Crac.png');
		this.load.image('Letus', 'assets/Letus.png');

		// #endregion

		// #region Tilemaps

		this.load.tilemapTiledJSON('mapa1', 'assets/map/mapa1.json');
		this.load.image('tileset', 'assets/map/mapTiles.png');
		this.load.json('navmesh', 'assets/map/mapa1.json');

		// #endregion

		// #region Audio

		this.load.audio('MainSample', 'assets/audio/batallaPrincipal.wav');

		// #endregion

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

		this.anims.create({
			key: 'loading',
			frames: this.anims.generateFrameNumbers('PiuAnim', { start: 0, end: 17 }),
			frameRate: 15,  // Velocidad de animación
			repeat: -1      // -1 para repetir indefinidamente
		});

		// Añadir el sprite animado al centro de la pantalla
		let loadingSprite = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2, 'PiuAnim');
		loadingSprite.play('loading');
		loadingSprite.setScale(8); // Escalar el sprite al doble de su tamaño

		//console.log("me he creado", this.scene.key);

		//this.loadingText = this.add.text(400, 300, 'Loading', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);

		//this.dots = '.';
		//this.time.addEvent({
		//	delay: 300,
		//	callback: this.updateDots,
		//	callbackScope: this,
		//	loop: true
		//});
	}

	updateDots() {
		// Add dots up to three and reset
		this.dots = this.dots.length < 3 ? this.dots + '.' : '';
		this.loadingText.setText('Loading' + this.dots);
	}
}
