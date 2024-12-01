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
		this.load.image('start', 'assets/GUI/start_button.png');
		//this.load.image('background', 'assets/GUI/fondoinicio1.png');
		this.load.image('end', 'assets/GUI/gameover.png');
		this.load.image('healthBarBackground', 'assets/GUI/health_bar_1.png');
		this.load.image('healthBar', 'assets/GUI/health_bar_2_b.png');
		this.load.image('expBarBackground', 'assets/GUI/exp_bar_background.png');
		this.load.image('expBar', 'assets/GUI/exp_bar.png');

		this.load.spritesheet('PiuAnim', 'assets/piu/piu.png', {
			frameWidth: 25,  // Ancho de cada cuadro
			frameHeight: 10, // Altura de cada cuadro
			endFrame: 16      // Número de cuadros en el sprite sheet
		});

		this.load.image('start', 'assets/GUI/start_button.png');
		this.load.image('logros', 'assets/GUI/achievements.png');
		this.load.image('background', 'assets/GUI/beckground_start_1.png');
		this.load.audio('TitleSample', 'assets/audio/MenuPrincipal.mp3');

		this.load.image('achievement', 'assets/achievs/achievement.png');
		this.load.image('LockedAchievement', 'assets/achievs/locked.png');
		this.load.image('PrevButton', 'assets/achievs/previous.png');
		this.load.image('NextButton', 'assets/achievs/next.png');

		// #endregion

		// #region Player

		this.load.image('Player', 'assets/character/player.png');
		this.load.image('Bala', 'assets/bullet/bullet_1.png');
		this.load.image('Bala2', 'assets/bullet/bullet_2.png');
		this.load.image('Particle', 'assets/effects/particles_1.png');
		this.load.image('Coin', 'assets/coin/coin.png');

		this.load.spritesheet('playerSheet', 'assets/character/player_sheet.png',{
			frameWidth: 32,  // Ancho de cada cuadro
			frameHeight: 32, // Altura de cada cuadro
			endFrame: 13      // Número de cuadros en el sprite sheet
		});

		// #endregion

		// #region Enemies

		this.load.image('Bob', 'assets/enemies/bob.png');
		this.load.image('Crac', 'assets/enemies/crac.png');
		this.load.image('Letus', 'assets/enemies/letus.png');
		this.load.image('Zaro', 'assets/enemies/zaro_placeholder.png');

		// #endregion

		// #region Tilemaps

		this.load.tilemapTiledJSON('mapa1', 'assets/map/map_1/mapa_1.json');
		this.load.image('tileset', 'assets/map/map_1/map_tiles.png');
		this.load.json('navmesh', 'assets/map/map_1/mapa_1.json');

		// #endregion

		// #region Audio

		this.load.audio('MainSample', 'assets/audio/batallaPrincipal.wav');

		// #endregion

		// #region JSONS
		// Cargar el archivo JSON de logros.
		this.load.json('achievementData', 'src/scenes/achievements/achievements_datas.json');
		this.load.json('treeData', 'src/objects/player/tree_data.json');
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

		//#region animaciones
		// Definimos las animaciones en un array
		const animations = [
			{ key: 'playerIdleDown', start: 1, end: 1, frameRate: 5, repeat:0 },
			{ key: 'playerIdleRight', start: 3, end: 3, frameRate: 5, repeat: 0 },
			{ key: 'playerIdleUp', start: 8, end: 8, frameRate: 5, repeat: 0 },
			{ key: 'playerIdleLeft', start: 11, end: 11, frameRate: 5, repeat: 0 },
			{ key: 'playerWalkDown', start: 0, end: 2, frameRate: 8, repeat: -1 },
			{ key: 'playerWalkRight', start: 3, end: 6, frameRate: 8, repeat: -1 },
			{ key: 'playerWalkUp', start: 7, end: 9, frameRate: 8, repeat: -1 },
			{ key: 'playerWalkLeft', start: 10, end: 13, frameRate: 8, repeat: -1 }
		];

		animations.forEach(({ key, start, end, frameRate, repeat }) => {
			this.anims.create({
				key,
				frames: this.anims.generateFrameNumbers('playerSheet', { start, end }),
				frameRate,
				repeat
			});
		});




		//#endregion



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