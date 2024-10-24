import Player from '../../objetos/Player/player.js';
import Floor from '../../objetos/Escenario/floor.js';

/**
 * Escena principal de juego.
 * @extends Phaser.Scene
 */
export default class Animation extends Phaser.Scene {
	
	constructor() {
		super({ key: 'nivel1' });
	}
	
	preload(){
		//this.load.image('suelo', 'assets/suelo.gif');
		this.load.image('Player', 'assets/player.png');
		this.load.tilemapTiledJSON('mapa1', 'assets/map/mapa1.json');
		this.load.image('tileset', 'assets/map/mapTiles.png');

	}
	
	/**  
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
		console.log("me he creado", this.scene.key);

		//Imagen de fondo
		//this.add.image(0, 0, 'suelo').setOrigin(0, 0);

		//Tilemap
		const map = this.make.tilemap({ key: 'mapa1' });
		const tileset = map.addTilesetImage('mapTiles', 'tileset');
		const sueloLayer = map.createLayer('suelo', tileset);
		const paredLayer = map.createLayer('pared', tileset);

		sueloLayer.setOrigin(0, 1);
		paredLayer.setOrigin(0, 1);


		paredLayer.setCollisionByProperty({ collides: true });

		sueloLayer.setScale(4);
		paredLayer.setScale(4);
		
		//Instanciamos nuestro personaje, que es un caballero, y la plataforma invisible que hace de suelo
		let player = new Player(this, 200, 200);
		player.setScale(4);

		//let floor = new Floor(this, 50);
		let scene = this; // Nos guardamos una referencia a la escena para usarla en la función anidada que viene a continuación

		this.physics.add.collider(player, paredLayer);

		this.cameras.main.startFollow(player);

		

	}

	init(){

	}

	update(time, dt) {
		
		

	}

}
