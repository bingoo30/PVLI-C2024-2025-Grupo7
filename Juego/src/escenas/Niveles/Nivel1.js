import Player from '../../objetos/Player/player.js';
import Crac from '../../objetos/Enemies/Crac.js'
import Enemy from '../../objetos/Enemies/enemy.js';
import NavMesh from '../../objetos/NavMesh/navmesh.js';
import Floor from '../../objetos/Escenario/floor.js';

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

		// #region Entities

		// #region Map

		this.map = this.make.tilemap({ key: 'mapa1', tileWidth: 32, tileHeight: 32 });
		this.tileset = this.map.addTilesetImage('mapTiles', 'tileset');
		this.sueloLayer = this.map.createLayer('suelo', this.tileset);
		if (!this.sueloLayer) {
			console.error("La capa 'suelo' no se ha creado correctamente.");
		}
		this.paredLayer = this.map.createLayer('pared', this.tileset);
		if (!this.paredLayer) {
			console.error("La capa 'suelo' no se ha creado correctamente.");
		}
		this.sueloLayer.setScale(SCALE);
		this.paredLayer.setScale(SCALE);

		// #endregion


		// #region Player

		const objectLayer = this.map.getObjectLayer('position');
		const playerPos = objectLayer.objects.find(obj => obj.name == 'playerPosition');
		// Verificar si el objeto fue encontrado
		if (!playerPos) console.log('Position player no encontrado.');
		const playerX = playerPos.x * SCALE;
		const playerY = playerPos.y * SCALE;
		this.player = new Player(this, playerX, playerY);
		this.player.setScale(SCALE);

		// #endregion

		// #region Enemy


		this.Crac = new Crac(this, playerX + 200, playerY + 100, this.player);
		this.Crac.setScale(0.3);

		this.enemy = this.add.group();
		this.enemy.add(this.Crac);

		// #endregion


		// #region Debug
		const debugGraphics = this.add.graphics();
		this.paredLayer.renderDebug(debugGraphics, {
			tileColor: null, // No colorear los tiles
			collidingTileColor: new Phaser.Display.Color(243, 134, 48, 200), // Color para los tiles colisionables
			faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color para los bordes de colisión
		});
		// #endregion
		

		// #region Navmesh
		this.marker = this.add.graphics();
		this.marker.lineStyle(3, 0xffffff, 1);
		this.marker.strokeRect(0, 0, this.map.tileWidth, this.map.tileHeight);

		console.log(this.map.tileWidth)
		console.log(this.map.tileWidth)
		console.log(this.map.height)
		this.finder = new EasyStar.js();

		if (this.map) {
			var grid = [];
			for (var y = 0; y < this.sueloLayer.height; y++) {
				var col = [];
				for (var x = 0; x < this.sueloLayer.width; x++) {
					const tile = this.sueloLayer.getTileAt(x, y);
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


		for (var i = tiles.firstgid - 1; i < this.tileset.total; i++) { // firstgid and total are fields from Tiled that indicate the range of IDs that the tiles can take in that tileset
			if (!properties.hasOwnProperty(i)) {
				// If there is no property indicated at all, it means it's a walkable tile
				acceptableTiles.push(i + 1);
				continue;
			}
			if (!properties[i].collide) acceptableTiles.push(i + 1);
			if (properties[i].cost) this.finder.setTileCost(i + 1, properties[i].cost); // If there is a cost attached to the tile, let's register it
		}
		this.finder.setAcceptableTiles(acceptableTiles);


		// #endregion


		// #region Collision

		this.paredLayer.setCollisionByProperty({ collides: true });
		

		this.physics.add.collider(this.enemy, this.paredLayer);

		this.physics.add.collider(this.player, this.paredLayer);

		this.physics.add.collider(this.player, this.enemy, (player, enemy) => {
			player.onPlayerGotHit(enemy.getDamage());
			enemy.onEnemyDeath();
		})

		// #endregion

		this.cameras.main.startFollow(this.player);

		// #region sonido
		this.MainSample = this.sound.add('MainSample');
		this.MainSample.play();
		// #endregion
	}
	
	update(t, dt) {

		var worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);

		// Rounds down to nearest tile
		var pointerTileX = this.map.worldToTileX(worldPoint.x);
		var pointerTileY = this.map.worldToTileY(worldPoint.y);
		this.marker.x = this.map.tileToWorldX(pointerTileX);
		this.marker.y = this.map.tileToWorldY(pointerTileY);
		this.marker.setVisible(!this.checkCollision(pointerTileX, pointerTileY));

	}

	checkCollision(x, y) {
		var tile = this.map.getTileAt(x, y);
		if (!tile) {
			console.log("no hay tile");
			return;
		}
		console.log(tile)
		return tile.properties.collides == true;
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

	moveCharacter(path) {
		// Sets up a list of tweens, one for each tile to walk, that will be chained by the timeline
		var tweens = [];
		for (var i = 0; i < path.length - 1; i++) {
			var ex = path[i + 1].x;
			var ey = path[i + 1].y;
			tweens.push({
				targets: this.player,
				x: { value: ex * this.map.tileWidth, duration: 200 },
				y: { value: ey * this.map.tileHeight, duration: 200 }
			});
		}

		this.scene.tweens.timeline({
			tweens: tweens
		});
	};

	

}
