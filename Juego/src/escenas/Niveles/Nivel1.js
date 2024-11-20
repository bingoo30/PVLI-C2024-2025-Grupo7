import Player from '../../objetos/Player/player.js';
import Crac from '../../objetos/Enemies/Crac.js'
import Pool from '../../objetos/OurPool.js'
import NavMesh from '../../objetos/NavMesh/navmesh.js';
import Bob from '../../objetos/Enemies/Bob.js';
import HealthBar from '../../UI/HealthBar.js';
import ExpBar from '../../UI/ExpBar.js';
import Coin from '../../objetos/Enemies/coin.js';
import Bullet from '../../objetos/Shooting/bullet.js';

import DialogueManager from '../../UI/DialogManager.js';
import DialogText from '../../UI/dialog_plugin.js';
import NPC from '../../objetos/NPC/NPC.js'

//import Coin from '../../objetos/Enemies/coin.js'
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
	preload() {
		this.load.json('dialogues', 'assets/Dialogues/dialogues_intro.json');
		this.load.json('dialogues_Flush', 'assets/Dialogues/dialogues_Flush.json');
		this.load.image('Flush', 'assets/Character/Flush.png');
	}
	
	/**  
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
		//console.log("me he creado", this.scene.key);
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
		
		this.Crac = new Crac(this, playerX + 1500, playerY + 100, this.player, 1);
		this.Crac.setScale(SCALE);

		this.Bob = new Bob(this, playerX + 1200, playerY + 200, this.player, 1);
		this.Bob.setScale(SCALE);

		this.enemies = this.add.group();
		this.enemies.add(this.Crac);
		this.enemies.add(this.Bob);

		// #endregion
		
		// #region Pools

		//coins
		const MAX = 300;
		let toAdds = [];
		this.coins = new Pool(this, MAX, 'Coin');
		for (let i = 0; i < MAX; i++) {
			let toAdd = new Coin(this, 0, 0, 1);
			toAdds.push(toAdd);
		}
		this.coins.addMultipleEntity(toAdds);

		//bullets
		toAdds = [];
		this.playerBullets = new Pool(this, MAX,'Bullet');
		for (let i = 0; i < MAX; i++) {
			let toAdd = new Bullet(this, 0,0,'Bala2');
			toAdds.push(toAdd);
		}
		this.playerBullets.addMultipleEntity(toAdds);
		this.player.setPool(this.playerBullets);

		toAdds = [];
		this.enemyBullets = new Pool(this, MAX,'Bullet');
		for (let i = 0; i < MAX; i++) {
			let toAdd = new Bullet(this, 0, 0, 'Bala');
			toAdds.push(toAdd);
		}
		this.enemyBullets.addMultipleEntity(toAdds);
		this.Crac.setPool(this.enemyBullets);
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

		//console.log(this.map.tileWidth)
		//console.log(this.map.tileWidth)
		//console.log(this.map.height)
		this.finder = new EasyStar.js();
		//console.log("suelo",this.sueloLayer)

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
		//console.log(grid);
		//console.log(this.map)
		this.finder.setGrid(grid);
		var tiles = this.map.tilesets[0];
		//console.log(tiles)
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

		//#region UI
		this.expBar = new ExpBar(this, 20, 30);
		this.healthBar = new HealthBar(this, 20, 10);

		const dialogos = this.cache.json.get('dialogues');

		this.dialog = new DialogText(this, {
			borderThickness: 4,
			borderColor: 0xcb3234,
			borderAlpha: 1,
			windowAlpha: 0.6,
			windowColor: 0x000000,
			windowHeight: 150,
			padding: 32,
			closeBtnColor: 'white',
			dialogSpeed: 4,
			fontSize: 24,
			fontFamily: "TimesNewRoman"
		});

		this.dialogManager = new DialogueManager(this);
		this.dialogManager.initialize(this.dialog, dialogos);
		this.dialogManager.showDialogue();
		//#endregion

		// #region NPC
		const NPCX = (playerPos.x + 200) * SCALE;
		const NPCY = (playerPos.y + 10) * SCALE;
		
		this.Flush = new NPC(this, NPCX, NPCY, 'Flush', 'dialogues_Flush');
		this.Flush.setScale(SCALE);

		// #endregion

		// #region Collision

		this.paredLayer.setCollisionByProperty({ collides: true });

		this.physics.add.collider(this.enemies, this.paredLayer);

		this.physics.add.collider(this.player, this.paredLayer);

		this.physics.add.collider(this.player, this.Flush);

		//colision player-enemigos
		this.physics.add.collider(this.player, this.enemies, (player, enemy) => {
			player.knockback(500, enemy);
			player.onPlayerGotHit(enemy.getDamage());
			this.healthBar.updateHealth(this.player.life, this.player.maxLife);

		});
		//colision bala player-enemigos
		this.physics.add.collider(this.playerBullets.getPhaserGroup(), this.enemies, (playerBullet, enemy) => {
			enemy.onEnemyGotHit(this.player.getDamage(), this.coins);
			// mandaria a la pool de las balas de player otra vez
			playerBullet.destroyBullet(this.playerBullets);
		});
		//colision bala enemigos-player
		this.physics.add.collider(this.enemyBullets.getPhaserGroup(), this.player, (enemyBullet, player) => {
			player.knockback(200, enemyBullet);
			player.onPlayerGotHit(enemyBullet.getDamage());
			this.healthBar.updateHealth(this.player.life, this.player.maxLife);
			// mandaria a la pool de las balas de los enemigos otra vez
			enemyBullet.destroyBullet(this.enemyBullets);
		});
		//colision fichas-player
		this.physics.add.collider(this.player, this.coins.getPhaserGroup(), (player, coin) => {
			player.onPlayerCollectedXP(coin.getExp());
			if (player.getXpAcu() >= player.getXpToLevelUp()) {
				player.levelUp();
			}
			this.expBar.updateExp(player.getXpAcu(), player.getXpToLevelUp());
			coin.destroyCoin(this.coins);
			//console.log(this.expBar);
		});
		//colision balas-paredes
		this.physics.add.collider(this.playerBullets.getPhaserGroup(), this.paredLayer, (bullet, wall) => {
			bullet.destroyBullet(this.playerBullets);
		});
		this.physics.add.collider(this.enemyBullets.getPhaserGroup(), this.paredLayer, (bullet, wall) => {
			bullet.destroyBullet(this.enemyBullets);
		});

		// #endregion

		this.cameras.main.startFollow(this.player);

		// #region sonido
		this.MainSample = this.sound.add('MainSample');
		this.MainSample.play();
		this.MainSample.setLoop(true);
		// #endregion

		const startTile = this.map.worldToTileXY(this.Crac.x, this.Crac.y);
		const endTile = this.map.worldToTileXY(400, 400);  // Destino deseado
		this.findPath(startTile, endTile);

	}

	changeScene() {
		this.MainSample.stop();
		this.scene.start("gameover") 
		
	}
	
	update(t, dt) {

		if (this.dialogManager.isDialogueActive) {
			this.physics.world.pause();
		} else {
			this.physics.world.resume();
		}
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
				//console.warn("No se encontró un camino.");
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
				//console.warn("No se encontró un camino.");
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
