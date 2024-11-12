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
		this.load.image('start', '/PVLI-C2024-2025-Grupo7/Juego/assets/GUI/start.png');
		this.load.image('background', '/PVLI-C2024-2025-Grupo7/Juego/assets/GUI/fondoinicio.png');
		this.load.image('end', '/PVLI-C2024-2025-Grupo7/Juego/assets/GUI/gameover.png');
		this.load.image('healthBarBackground', '/PVLI-C2024-2025-Grupo7/Juego/assets/GUI/healthBar1.png');
		this.load.image('healthBar', '/PVLI-C2024-2025-Grupo7/Juego/assets/GUI/healthBar2.png');
		this.load.image('expBarBackground', '/PVLI-C2024-2025-Grupo7/Juego/assets/GUI/expBarBackground.png');
		this.load.image('expBar', '/PVLI-C2024-2025-Grupo7/Juego/assets/GUI/expBar.png');

		this.load.spritesheet('PiuAnim', '/PVLI-C2024-2025-Grupo7/Juego/assets/Piu.png', {
			frameWidth: 25,  // Ancho de cada cuadro
			frameHeight: 10, // Altura de cada cuadro
			endFrame: 16      // Número de cuadros en el sprite sheet
		});

		// #endregion

		// #region Player

		this.load.image('Player', '/PVLI-C2024-2025-Grupo7/Juego/assets/player.png');
		this.load.image('Bala', '/PVLI-C2024-2025-Grupo7/Juego/assets/bala.png');
		this.load.image('Bala2', '/PVLI-C2024-2025-Grupo7/Juego/assets/bala2.png');
		this.load.image('Particle', '/PVLI-C2024-2025-Grupo7/Juego/assets/particles.png');
		this.load.image('Coin', '/PVLI-C2024-2025-Grupo7/Juego/assets/coin.png');

		// #endregion

		// #region Enemies

		this.load.image('Bob', '/PVLI-C2024-2025-Grupo7/Juego/assets/Bob.png');
		this.load.image('Crac', '/PVLI-C2024-2025-Grupo7/Juego/assets/Crac.png');
		this.load.image('Letus', '/PVLI-C2024-2025-Grupo7/Juego/assets/Letus.png');

		// #endregion

		// #region Tilemaps

		this.load.tilemapTiledJSON('mapa1', '/PVLI-C2024-2025-Grupo7/Juego/assets/map/mapa1.json');
		this.load.image('tileset', '/PVLI-C2024-2025-Grupo7/Juego/assets/map/mapTiles.png');
		this.load.json('navmesh', '/PVLI-C2024-2025-Grupo7/Juego/assets/map/mapa1.json');

		// #endregion

		// #region Audio

		this.load.audio('MainSample', '/PVLI-C2024-2025-Grupo7/Juego/assets/audio/batallaPrincipal.wav');

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
		//console.log("me he creado", this.scene.key);

		this.anims.create({
			key: 'PiuLoad',
			frames: this.anims.generateFrameNumbers('PiuAnim', { start: 0, end: 16 }),
			frameRate: 8,  // Velocidad de animación
			repeat: -1      // -1 para repetir indefinidamente
		});

		// Añadir el sprite animado al centro de la pantalla
		let loadingSprite = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2, 'PiuAnim');

		loadingSprite.play('PiuLoad');
		loadingSprite.setScale(8); // Escalar el sprite al doble de su tamaño


		this.loadingText = this.add.text(
			loadingSprite.x,                    // Colocar el texto en el centro horizontal del sprite
			loadingSprite.y + loadingSprite.displayHeight / 2 + 20, // Justo debajo del sprite (20 píxeles debajo)
			'.',                                 // Texto inicial
			{ fontSize: '32px', fill: '#000' }
		).setOrigin(0.5); // Centrar el texto horizontalmente

		// Configurar el evento de puntos animados
		this.dots = '.';
		this.time.addEvent({
			delay: 300,
			callback: this.updateDots,
			callbackScope: this,
			loop: true
		});
	}

	updateDots() {
		// Añadir puntos hasta tres y reiniciar
		this.dots = this.dots.length < 3 ? this.dots + '.' : '.';
		this.loadingText.setText(this.dots);
	}
}