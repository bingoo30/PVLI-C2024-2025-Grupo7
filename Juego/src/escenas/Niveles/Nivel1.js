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

		if (!sueloLayer) {
			console.error("La capa 'suelo' no se ha creado correctamente.");
		}

		this.marker = this.add.graphics();
		this.marker.lineStyle(3, 0xffffff, 1);
		this.marker.strokeRect(0, 0, this.map.tileWidth, this.map.tileHeight);

		console.log(this.map.tileWidth)
		console.log(map.tileWidth)
		console.log(map.height)


		this.finder = new EasyStar.js();

		if (this.map) {
			var grid = [];
			for (var y = 0; y < sueloLayer.height; y++) {
				var col = [];
				for (var x = 0; x < sueloLayer.width; x++) {
					const tile = sueloLayer.getTileAt(x, y);
					//console.error("El tile", tile);

					if (tile) {
						col.push(tile.index);  // Usa tile.index para obtener el índice del tile
					} else {
						col.push(-1);  // Usa un valor predeterminado para los tiles no encontrados
					}
				}
				grid.push(col);
			}
		} else {
			console.error("El mapa no está definido.");
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
	

	checkCollision(x, y) {
		var tile = this.map.getTileAt(x, y);
		console.log(tile)
		return tile.properties.collide == true;
	};


	// test
	handleClick(pointer) {
		var x = this.camera.scrollX + pointer.x;
		var y = this.camera.scrollY + pointer.y;
		var toX = Math.floor(x / 32);
		var toY = Math.floor(y / 32);
		var fromX = Math.floor(this.player.x / 32);
		var fromY = Math.floor(this.player.y / 32);
		console.log('going from (' + fromX + ',' + fromY + ') to (' + toX + ',' + toY + ')');

		this.finder.findPath(fromX, fromY, toX, toY, function (path) {
			if (path === null) {
				console.warn("Path was not found.");
			} else {
				console.log(path);
				Game.moveCharacter(path);
			}
		});
		this.finder.calculate(); // don't forget, otherwise nothing happens
	};


	update(t, dt) {

		var worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);

		// Rounds down to nearest tile
		var pointerTileX = this.map.worldToTileX(worldPoint.x);
		var pointerTileY = this.map.worldToTileY(worldPoint.y);
		this.marker.x = this.map.tileToWorldX(pointerTileX);
		this.marker.y = this.map.tileToWorldY(pointerTileY);

		
		var tile = this.map.getTileAt(pointerTileX, pointerTileY);
		//console.log(tile)
		this.marker.setVisible(!tile);

	}

}
