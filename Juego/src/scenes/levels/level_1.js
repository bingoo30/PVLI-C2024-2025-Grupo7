import Player from '../../objects/player/player.js';
import Crac from '../../objects/enemies/crac.js'
import Pool from '../../objects/our_pool.js'
import NavMesh from '../../objects/navmesh/navmesh.js';
import Bob from '../../objects/enemies/bob.js';
import HealthBar from '../../UI/health_bar.js';
import ExpBar from '../../UI/exp_bar.js';
import Coin from '../../objects/enemies/coin.js';
import Bullet from '../../objects/shooting/bullet.js';
import Letus from '../../objects/enemies/letus.js';
import Zaro from '../../objects/enemies/zaro.js';

import DialogueManager from '../../UI/dialog_manager.js';
import DialogText from '../../UI/dialog_plugin.js';
import NPC from '../../objects/interactable_objects/npc.js';
import Door from '../../objects/interactable_objects/door.js';
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
		this.isGamePaused = false;
	}
	preload() {
		this.load.json('dialogues', 'assets/dialogues/dialogues_intro.json');
		this.load.json('dialogues_Flush', 'assets/dialogues/dialogues_Flush.json');
		this.load.image('Flush', 'assets/character/flush.png');
		this.load.image('verticalDoor', 'assets/map/vertical_door_1.png');
		this.load.image('horizontalDoor', 'assets/map/horizontal_door_1.png');
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

		//#region puerta
		this.doorGroup = this.add.group();
		this.doorLayer = this.map.getObjectLayer('Door');
		console.log(this.doorLayer);
		this.doorLayer.objects.forEach((objD) => {
			const door = new Door(this, objD.x * SCALE, objD.y * SCALE,
				objD.name,  // El tipo de puerta ('verticalDoor' o 'horizontalDoor')
				objD.width,  // El tamaño de la puerta en Tiled
				objD.height, // El tamaño de la puerta en Tiled
			);
			door.setScale(SCALE);
			// Añadir la puerta al grupo de puertas
			this.doorGroup.add(door);
		});

		//#endregion

		// #endregion

		// #region Player
		// #region Player Position

		const objectLayer = this.map.getObjectLayer('position');

		const playerPos = objectLayer.objects.find(obj => obj.name == 'playerPosition');

		// Verificar si el objeto fue encontrado
		if (!playerPos) console.log('Position player no encontrado.');

		const playerX = playerPos.x * SCALE;
		const playerY = playerPos.y * SCALE;

		// #endregion


		// #region Player
		this.player = new Player(this, playerX, playerY);
		this.player.setScale(SCALE);

		// #endregion

		// #endregion
		// #region Pools

		const MAX = 300;

		// #region Coins

		let toAdds = [];
		this.coins = new Pool(this, MAX, 'Coin');
		for (let i = 0; i < MAX; i++) {
			let toAdd = new Coin(this, 0, 0, 1);
			toAdds.push(toAdd);
		}
		this.coins.addMultipleEntity(toAdds);

		// #endregion

		// #region Player Bullets

		toAdds = [];
		this.playerBullets = new Pool(this, MAX, 'Bullet');
		for (let i = 0; i < MAX; i++) {
			let toAdd = new Bullet(this, 0, 0, 'Bala2');
			toAdds.push(toAdd);
		}
		this.playerBullets.addMultipleEntity(toAdds);
		this.player.setPool(this.playerBullets);

		// #endregion

		// #region Enemy Bullets

		toAdds = [];
		this.enemyBullets = new Pool(this, MAX, 'Bullet');
		for (let i = 0; i < MAX; i++) {
			let toAdd = new Bullet(this, 0, 0, 'Bala');
			toAdds.push(toAdd);
		}
		this.enemyBullets.addMultipleEntity(toAdds);


		//this.Crac.setPool(this.enemyBullets);
		//this.Zaro.setPool(this.enemyBullets);

		// #endregion

		// #endregion

		// #region Enemy

		this.arrayCracs = [];
		const cracLayer = this.map.getObjectLayer('Crac');
		cracLayer.objects.forEach(obj => {
			if (obj.name === 'Crac') { // Filtra por nombre
				const crac = new Crac(this, obj.x * SCALE, obj.y *SCALE, this.player, this.exp);
				crac.setScale(SCALE);
				crac.setPool(this.enemyBullets);
				// Agregar el Crac a la escena y al array
				//this.add.existing(crac);
				this.arrayCracs.push(crac);
			}
		});

		//console.log(this.arrayCracs); // Depuración: verificar el contenido del array


		this.enemies = this.add.group();
		this.enemies.addMultiple(this.arrayCracs);


		this.arrayBobs = [];
		const bobLayer = this.map.getObjectLayer('Bob');
		bobLayer.objects.forEach(obj => {
			if (obj.name === 'Bob') { // Filtra por nombre
				const bob = new Bob(this, obj.x * SCALE, obj.y * SCALE, this.player, this.exp);
				bob.setScale(SCALE);
				this.arrayBobs.push(bob);
			}
		});

		this.enemies.addMultiple(this.arrayBobs);

		//console.log(this.arrayBobs); // Depuración: verificar el contenido del array


		// //Configura cada objeto con su pool y jugador después de crearlo
		//cracObjects.forEach(crac => {
		//	crac.setPool(this.enemyBullets);   // Asocia el pool
		//	//this.Crac.setPool(this.enemyBullets);

		//	crac.player = this.player; // Asocia el jugador
		//});


		//objectLayer.objects.forEach(obj => {
		//	const bob = new Bob(this, obj.x, obj.y, this.player, 1);
		//	this.add.existing(bob);
		//});

		//this.enemies = this.add.group();
		//let cracs = [];

		//const cracsLayer = this.map.getObjectLayer('position');

		//cracsLayer.objects.forEach(crac => {
		//	// Asignar posición directamente desde el objeto crac
		//	let enemy = new Crac(this, crac.x * SCALE, crac.y * SCALE, this.player, 1);
		//	enemy.setPool();
		//	// Añadir al grupo de enemigos
		//	cracs.push(enemy);
		//});

		//this.enemies.addMultiple(cracs);

		// #endregion


		// #region Enemy


		

		//this.Crac = new Crac(this, playerX + 1500, playerY + 100, this.player, 1);
		//this.Crac.setScale(SCALE);

		//this.Bob = new Bob(this, playerX + 1200, playerY + 200, this.player, 1);
		//this.Bob.setScale(SCALE);
		// this.enemies.add(this.Bob);

		this.Zaro = new Zaro(this, playerX + 1800, playerY - 100, this.player, 1);
		this.Zaro.setScale(SCALE);
		this.Zaro.setPool(this.enemyBullets);
		this.enemies.add(this.Zaro);

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


		//console.log(this.map.tileWidth)
		//console.log(this.map.tileWidth)
		//console.log(this.map.height)
		//this.finder = new EasyStar.js();
		//console.log("suelo",this.sueloLayer)

		//if (this.map) {
		//	var grid = [];
		//	for (var y = 0; y < this.sueloLayer.height; y++) {
		//		var col = [];
		//		for (var x = 0; x < this.sueloLayer.width; x++) {
		//			const tile = this.sueloLayer.getTileAt(x, y);

		//			if (tile) {
		//				col.push(tile.index);  // Usa tile.index para obtener el índice del tile
		//			} else {
		//				col.push(-1);  // Usa un valor predeterminado para los tiles no encontrados
		//			}
		//		}
		//		grid.push(col);
		//	}
		//} else {
		//	console.error("El mapa no está definido.");
		//}

		//console.log(grid);
		//console.log(this.map)
		//this.finder.setGrid(grid);
		//var tiles = this.map.tilesets[0];
		////console.log(tiles)
		//var properties = tiles.tileProperties;
		//var acceptableTiles = [];


		//for (var i = tiles.firstgid - 1; i < this.tileset.total; i++) { // firstgid and total are fields from Tiled that indicate the range of IDs that the tiles can take in that tileset
		//	if (!properties.hasOwnProperty(i)) {
		//		// If there is no property indicated at all, it means it's a walkable tile
		//		acceptableTiles.push(i + 1);
		//		continue;
		//	}
		//	if (!properties[i].collides) acceptableTiles.push(i + 1);
		//	if (properties[i].cost) {
		//		this.finder.setTileCost(i + 1, properties[i].cost); // If there is a cost attached to the tile, let's register it
		//		//console.log("con coste")
		//	}
		//}
		//this.finder.setAcceptableTiles(acceptableTiles);
		//console.log(acceptableTiles);


		// #endregion

		//#region UI

		this.expBar = new ExpBar(this, 20, 30);

		this.healthBar = new HealthBar(this, 20, 10);

		const dialogos = this.cache.json.get('dialogues');

		//#region Dialog

		this.dialog = new DialogText(this, {
			borderThickness: 2,
			borderColor: 0xcb3234,
			borderAlpha: 1,
			windowAlpha: 0.8,
			windowColor: 0x000000,
			windowHeight: 180,
			padding: 32,
			closeBtnColor: 'white',
			dialogSpeed: 4,
			fontSize: 25,
			fontFamily: "PixelArt"
		});
		this.dialogManager = new DialogueManager(this);
		this.dialogManager.initialize(this.dialog, dialogos);
		this.dialogManager.showDialogue();

		// #endregion

		//#endregion

		// #region NPC
		const NPCX = (playerPos.x + 100) * SCALE;
		const NPCY = (playerPos.y + 10) * SCALE;

		this.Flush = new NPC(this, NPCX, NPCY, 'Flush', 'dialogues_Flush');
		this.Flush.setScale(SCALE);

		// #endregion

		// #region Collision

		this.paredLayer.setCollisionByProperty({ collides: true });

		this.physics.add.collider(this.enemies, this.paredLayer);

		this.physics.add.collider(this.player, this.paredLayer);

		//collisiones con la puerta
		this.physics.add.collider(this.player, this.doorGroup);

		this.physics.add.collider(this.enemies, this.doorGroup);

		this.physics.add.collider(this.player, this.Flush, () => {
			//desbloquear el logro de hablar con flush
			this.game.events.emit(`unlock_Caballero generoso`);
		});

		//colision player-enemigos
		this.physics.add.collider(this.player, this.enemies, (player, enemy) => {
			player.knockback(500, enemy);
			player.onGotHit(enemy.getDamage());
			this.healthBar.updateHealth(this.player.life, this.player.maxLife);

		});
		//colision bala player-enemigos
		this.physics.add.collider(this.playerBullets.getPhaserGroup(), this.enemies, (playerBullet, enemy) => {
			enemy.onGotHit(this.player.getDamage(), this.coins);
			// mandaria a la pool de las balas de player otra vez
			playerBullet.destroyBullet(this.playerBullets);
		});
		//colision bala enemigos-player
		this.physics.add.collider(this.enemyBullets.getPhaserGroup(), this.player, (enemyBullet, player) => {
			player.knockback(200, enemyBullet);
			player.onGotHit(enemyBullet.getDamage());
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
		//colision balas-fichas
		this.physics.add.collider(this.coins, this.playerBullets.getPhaserGroup(), (coin, bullet) => {
			coin.body.setBounce(0);
			bullet.body.setBounce(0);
		});



		// #endregion

		this.cameras.main.startFollow(this.player);

		// #region sonido
		this.MainSample = this.sound.add('MainSample');
		this.MainSample.play();
		this.MainSample.setLoop(true);
		// #endregion
	}

	changeScene() {
		this.MainSample.stop();
		this.scene.start("gameover") 
		
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
		if (this.isGamePaused) {
			this.physics.world.pause();
			return;
		} else {
			this.physics.world.resume();
		}

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
