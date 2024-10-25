import Player from '../../objetos/Player/player.js';
import Enemy from '../../objetos/Enemies/enemy.js';
import Floor from '../../objetos/Escenario/floor.js';


const WALKABLE_RECTANGLES = [
    {
        "height": 176,
        "id": 5,
        "name": "",
        "rotation": 0,
        "type": "",
        "visible": true,
        "width": 368,
        "x": 1000,
        "y": 1096
    },
    {
        "height": 176,
        "id": 7,
        "name": "",
        "rotation": 0,
        "type": "",
        "visible": true,
        "width": 336,
        "x": 1416,
        "y": 1160
    },
    {
        "height": 16,
        "id": 9,
        "name": "",
        "rotation": 0,
        "type": "",
        "visible": true,
        "width": 48,
        "x": 1368,
        "y": 1256
    },
    {
        "height": 232,
        "id": 10,
        "name": "",
        "rotation": 0,
        "type": "",
        "visible": true,
        "width": 48,
        "x": 1256,
        "y": 864
    },
    {
        "height": 120,
        "id": 15,
        "name": "",
        "rotation": 0,
        "type": "",
        "visible": true,
        "width": 240,
        "x": 936,
        "y": 864
    },
    {
        "height": 184,
        "id": 17,
        "name": "",
        "rotation": 0,
        "type": "",
        "visible": true,
        "width": 432,
        "x": 936,
        "y": 680
    },
    {
        "height": 112,
        "id": 18,
        "name": "",
        "rotation": 0,
        "type": "",
        "visible": true,
        "width": 64,
        "x": 1368,
        "y": 744
    }
]



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
		//this.load.image('Player', 'assets/player.png');
		//this.load.tilemapTiledJSON('mapa1', 'assets/map/mapa1.json');
		//this.load.image('tileset', 'assets/map/mapTiles.png');

	}
	
	/**  
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
		console.log("me he creado", this.scene.key);

		//Imagen de fondo
		//this.add.image(0, 0, 'suelo').setOrigin(0, 0);
        //https://medium.com/@tajammalmaqbool11/mastering-2d-game-path-finding-with-phaser3-ai-path-finding-301807c74ba3
		//Tilemap
		const map = this.make.tilemap({ key: 'mapa1' });
		const tileset = map.addTilesetImage('mapTiles', 'tileset');
		const sueloLayer = map.createLayer('suelo', tileset);
		const paredLayer = map.createLayer('pared', tileset);


		sueloLayer.setPosition(-1024*3.5,-1024*3.5);
		paredLayer.setPosition(-1024*3.5,-1024*3.5);


		paredLayer.setCollisionByProperty({ collides: true });

		sueloLayer.setScale(4);
		paredLayer.setScale(4);


		const navMesh = this.navMeshPlugin.buildMeshFromTilemap("mesh", map, [sueloLayer]);

		const path = navMesh.findPath({ x: 400, y: 40 }, { x: 1000, y: -100 });

		console.log(path);

		let graphics = this.add.graphics();

		graphics.lineStyle(2, 0xff0000, 1);
		graphics.beginPath();
		graphics.moveTo(path[0].x, path[0].y);

		for (let idx = 1; idx < path.length; idx++) {
			graphics.lineTo(path[idx].x, path[idx].y);
		}

		graphics.strokePath();




		
		//Instanciamos nuestro personaje, que es un caballero, y la plataforma invisible que hace de suelo
		//let player = new Player(this, 200, 200);
		//player.setScale(4);

		//tipo,speedFactor, shootspeed, life, damage, prob
		this.player = new Player(this, 200, 200);
		this.player.setScale(4);


		this.enemy = new Enemy(this, 200, 200, this.player);
		this.enemy.setScale(4);
		//let floor = new Floor(this, 50);

		let scene = this; // Nos guardamos una referencia a la escena para usarla en la función anidada que viene a continuación
		this.physics.add.collider(this.enemy, paredLayer);

		this.physics.add.collider(this.player, paredLayer);
		this.cameras.main.startFollow(this.player);


	}

	init(){

	}

	update(time, dt) {
		
		if (this.enemy && !this.enemy.target) {
			//console.log("pasando el player");
			this.enemy.setTarget(this.player);
		}
	}

}
