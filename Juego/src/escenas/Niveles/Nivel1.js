import Player from '../../objetos/Player/player.js';
import Enemy from '../../objetos/Enemies/enemy.js';
import NavMesh from '../../objetos/NavMesh/navmesh.js';
import Floor from '../../objetos/Escenario/floor.js';
import Character from '../../objetos/Player/character.js';

//constante
const SCALE = 4;
/**
 * Escena principal de juego.
 * @extends Phaser.Scene
 */
export default class Animation extends Phaser.Scene {
	
	constructor() {
		super({ key: 'nivel1' });
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
		const map = this.make.tilemap({ key: 'mapa1', tileWidth: 32, tileHeight: 32 });
		this.map = map;
		const tileset = map.addTilesetImage('mapTiles', 'tileset');
		const sueloLayer = map.createLayer('suelo', tileset);
		const paredLayer = map.createLayer('pared', tileset);
		this.scale = SCALE;

		this.finder = new EasyStar.js();

		var grid = [];
		for (var y = 0; y < map.height; y++) {
			var col = [];
			for (var x = 0; x < map.width; x++) {
				// In each cell we store the ID of the tile, which corresponds
				// to its index in the tileset of the map ("ID" field in Tiled)
				const tile = this.map.getTileAt(x, y);

				col.push(tile);
			}
			grid.push(col);
		}
		this.finder.setGrid(grid);

		var tiles = this.map.tilesets[0];
		var properties = tiles.tileProperties;
		var acceptableTiles = [];


		for (var i = tiles.firstgid - 1; i < tileset.total; i++) { // firstgid and total are fields from Tiled that indicate the range of IDs that the tiles can take in that tileset
			if (!properties.hasOwnProperty(i)) {
				// If there is no property indicated at all, it means it's a walkable tile
				acceptableTiles.push(i + 1);
				continue;
			}
			if (!properties[i].collide) acceptableTiles.push(i + 1);
			if (properties[i].cost) this.finder.setTileCost(i + 1, properties[i].cost); // If there is a cost attached to the tile, let's register it
		}
		this.finder.setAcceptableTiles(acceptableTiles);


		// Create the NavMesh based on the tilemap
		//this.navMesh = new NavMesh(sueloLayer, 32);



		//sueloLayer.setPosition(-1024*3.5,-1024*3.5);
		//paredLayer.setPosition(-1024*3.5,-1024*3.5);

		paredLayer.setCollisionByProperty({ collides: true });
		sueloLayer.setScale(SCALE);
		paredLayer.setScale(SCALE);

		//const navMesh = this.navMeshPlugin.buildMeshFromTilemap("mesh", map, [sueloLayer]);

		

		//buscamos la capa de objetos donde estan las posiciones iniciales
		const objectLayer = map.getObjectLayer('position');
		const playerPos = objectLayer.objects.find(obj => obj.name == 'playerPosition');

		// Verificar si el objeto fue encontrado
		if (!playerPos) console.log('Position player no encontrado.');
		const playerX = playerPos.x * SCALE;
		const playerY = playerPos.y * SCALE;

		this.player = new Player(this, playerX, playerY);
		this.player.setScale(SCALE);

		this.enemy = new Enemy(this, playerX+200, playerY+100, this.player);
		this.enemy.setScale(SCALE);
	

		let scene = this; // Nos guardamos una referencia a la escena para usarla en la función anidada que viene a continuación
		this.physics.add.collider(this.enemy, paredLayer);

		this.physics.add.collider(this.player, paredLayer);
		this.cameras.main.startFollow(this.player);

		this.physics.add.collider(this.player, this.enemy, (player, enemy) => {
			player.onPlayerGotHit(enemy.getDamage());
			enemy.onEnemyDeath();
		});

	}
	getTileID(x, y) {
		var tile = this.map.getTileAt(x, y);
		return tile.index;
	};
	
	update(t, dt) {

		this.enemy.update(dt);

	

	}

}
