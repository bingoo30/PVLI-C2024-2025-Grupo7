import Player from '../../objetos/Player/player.js';
import Crac from '../../objetos/Enemies/Crac.js'
import Enemy from '../../objetos/Enemies/enemy.js';
import EnemyShooter from '../../objetos/Enemies/enemyShooter.js';
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
		//this.input.on('pointerup', this.handleClick, this);

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

		this.Crac = new Crac(this, playerX + 200, playerY + 100, this.player, SCALE);
		this.Crac.setScale(SCALE);

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
		this.marker.strokeRect(0, 0, this.map.tileWidth*SCALE, this.map.tileHeight*SCALE);

		console.log(this.map.tileWidth)
		console.log(this.map.tileWidth)
		console.log(this.map.height)
		this.finder = new EasyStar.js();
		console.log("suelo",this.sueloLayer)

		if (this.map) {
			var grid = [];
			for (var y = 0; y < this.sueloLayer.height; y++) {
				var col = [];
				for (var x = 0; x < this.sueloLayer.width; x++) {
					const tile = this.sueloLayer.getTileAt(x, y);

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
		console.log(grid);
		console.log(this.map)
		this.finder.setGrid(grid);
		var tiles = this.map.tilesets[0];
		console.log(tiles)
		var properties = tiles.tileProperties;
		var acceptableTiles = [];


		for (var i = tiles.firstgid - 1; i < this.tileset.total; i++) { // firstgid and total are fields from Tiled that indicate the range of IDs that the tiles can take in that tileset
			if (!properties.hasOwnProperty(i)) {
				// If there is no property indicated at all, it means it's a walkable tile
				acceptableTiles.push(i + 1);
				continue;
			}
			if (!properties[i].collides) acceptableTiles.push(i + 1);
			if (properties[i].cost) {
				this.finder.setTileCost(i + 1, properties[i].cost); // If there is a cost attached to the tile, let's register it
				//console.log("con coste")
			}
		}
		this.finder.setAcceptableTiles(acceptableTiles);
		//console.log(acceptableTiles);


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


		const startTile = this.map.worldToTileXY(this.Crac.x, this.Crac.y);
		const endTile = this.map.worldToTileXY(400, 400);  // Destino deseado
		this.findPath(startTile, endTile);

	}
	
	update(t, dt) {
		/*
		const playerTileX = this.map.worldToTileX(this.player.x);
		const playerTileY = this.map.worldToTileY(this.player.y);
		const CracTileX = this.map.worldToTileX(this.Crac.x);
		const CracTileY = this.map.worldToTileY(this.Crac.y);
		if (
			Phaser.Math.Distance.Between(this.phaserGuy.x, this.phaserGuy.y, this.player.x, this.player.y) < 5
		) {
			return;
		}

		// Calculate a path if there's none or it's complete
		if (!this.currentPath || this.currentPath.length === 0) {
			this.finder.findPath(CracTileX, CracTileY, playerTileX, playerTileY, (path) => {
				if (path === null) {
					console.warn("Path not found.");
				} else {
					console.warn("Path found.");


					this.currentPath = path;
					this.moveAlongPath();
				}
			});
			this.finder.calculate();
		}*/
		this.Crac.update();
	}
	moveAlongPath() {
		if (!this.currentPath || this.currentPath.length === 0) return;
		console.warn("Moving.");

		// Get the next step in the path
		const nextStep = this.currentPath.shift();
		if (!nextStep) return;

		// Convert tile coordinates to world coordinates
		const targetX = this.map.tileToWorldX(nextStep.x) + this.map.tileWidth * SCALE ;
		const targetY = this.map.tileToWorldY(nextStep.y) + this.map.tileHeight * SCALE ;
		console.warn("PlayerCalc:", targetX);
		console.warn("Player:", this.player.x);

		// Tween `phaserGuy` to the next step
		this.tweens.add({
			targets: this.Crac,
			x: targetX,
			y: targetY,
			duration: 900,
			onComplete: () => {
				// When the current tween completes, move to the next step
				if (this.currentPath.length > 0) {
					this.moveAlongPath();
				}
			}
		});
	}

	checkCollision(x, y) {
		var tile = this.sueloLayer.getTileAt(x, y);
		if (!tile) {
			console.log("no hay tile");
			return;
		}
		console.log(tile)
		return tile.properties.collides == true;
	};

	findPath(startTile, endTile) {
		// Encontrar la ruta desde el punto de inicio al de destino
		this.finder.findPath(startTile.x, startTile.y, endTile.x, endTile.y, path => {
			if (path === null) {
				console.warn("No se encontró un camino.");
				return;
			}
			this.Crac.setPath(path);  // Establecer el camino en el enemigo
		});
		this.finder.calculate();  // Comenzar el cálculo
	}

	findPath(startTile, endTile) {
		// Encontrar la ruta desde el punto de inicio al de destino
		this.finder.findPath(startTile.x, startTile.y, endTile.x, endTile.y, path => {
			if (path === null) {
				console.warn("No se encontró un camino.");
				return;
			}
			this.Crac.setPath(path);  // Establecer el camino en el enemigo
		});
		this.finder.calculate();  // Comenzar el cálculo
	}


	moveAlongPath() {
		if (!this.currentPath || this.currentPath.length === 0) return;
		console.warn("Moving.");

		// Get the next step in the path
		const nextStep = this.currentPath.shift();
		if (!nextStep) return;

		// Convert tile coordinates to world coordinates
		const targetX = this.map.tileToWorldX(nextStep.x) + this.map.tileWidth * SCALE ;
		const targetY = this.map.tileToWorldY(nextStep.y) + this.map.tileHeight * SCALE ;
		console.warn("PlayerCalc:", targetX);
		console.warn("Player:", this.player.x);

		// Tween `phaserGuy` to the next step
		this.tweens.add({
			targets: this.Crac,
			x: targetX,
			y: targetY,
			duration: 900,
			onComplete: () => {
				// When the current tween completes, move to the next step
				if (this.currentPath.length > 0) {
					this.moveAlongPath();
				}
			}
		});
	}
}
