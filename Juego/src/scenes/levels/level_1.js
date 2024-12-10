import Player from '../../objects/player/player.js';
import Crac from '../../objects/enemies/crac.js'
import HealthBar from '../../UI/health_bar.js';
import ExpBar from '../../UI/exp_bar.js';
import Coin from '../../objects/enemies/coin.js';
import Bullet from '../../objects/abilities/shooting/bullet.js';

import Pool from '../../objects/our_pool.js'
import Bob from '../../objects/enemies/bob.js';
import Letus from '../../objects/enemies/letus.js';
import Mutum from '../../objects/enemies/mutum.js'
import Estaka from '../../objects/enemies/estaka.js';
import Turret from '../../objects/abilities/turret.js';

import NPC from '../../objects/interactable_objects/npc.js';
import Door from '../../objects/interactable_objects/door.js';
import DamageArea from '../../objects/abilities/area_damage/damage_area.js';
import PickableObjects from '../../objects/interactable_objects/pickable_objects.js';
import ChangeLevelDoor from '../../objects/interactable_objects/change_level_door.js';
import Rectangle from '../../objects/interactable_objects/rectangle.js';
import Zaro from '../../objects/enemies/zaro.js';
import Spike from '../../objects/scenery/spike.js';
import Retractable_Spike from '../../objects/scenery/retractable_spike.js';
import ExplosiveBullet from '../../objects/abilities/shooting/explosive_bullet.js';

//import Coin from '../../objetos/Enemies/coin.js'
//constante
const SCALE = 4;
/**
 * Escena principal de juego.
 * @extends Phaser.Scene
 */
export default class Animation extends Phaser.Scene {

	constructor() {
		super({ key: 'level1' });
	}
	preload() {

		this.load.tilemapTiledJSON('mapa1', 'assets/map/map_1/mapa_1.json');
		this.load.image('tileset', 'assets/map/map_1/map_tiles.png');
		this.load.json('dialogues', 'assets/dialogues/dialogues_intro.json');
		this.load.json('dialogues_Flush', 'assets/dialogues/dialogues_Flush.json');
		this.load.image('Flush', 'assets/character/flush.png');
		this.load.image('verticalDoor', 'assets/map/vertical_door_1.png');
		this.load.image('horizontalDoor', 'assets/map/horizontal_door_1.png');
	}

	/**  
	* Creación de los elementos de la escena principal de juego
	*/
	create(data) {
		// #region Entities
		// #region Map

		this.sound.stopAll(); // Detiene todos los sonidos en reproducción

		this._tries = data.tries;
		console.log("tries: "+ this._tries);

		this.map = this.make.tilemap({ key: 'mapa1', tileWidth: 32, tileHeight: 32 });
		this.tileset = this.map.addTilesetImage('mapTiles', 'tileset1');
		this.sueloLayer = this.map.createLayer('suelo', this.tileset);
		if (!this.sueloLayer) {
			console.error("La capa 'suelo' no se ha creado correctamente.");
		}
		this.paredLayer = this.map.createLayer('pared', this.tileset);
		if (!this.paredLayer) {
			console.error("La capa 'pared' no se ha creado correctamente.");
		}
		this.sueloLayer.setScale(SCALE);
		this.paredLayer.setScale(SCALE);

		//#region puerta

		// la escala de la puerta lo hace en la constructora de la clase door
		this.doorGroup = this.add.group();
		this.doorLayer = this.map.getObjectLayer('Door');
		this.doorLayer.objects.forEach((objD) => {
			const door = new Door(this, objD.x, objD.y,
				objD.name,  // El tipo de puerta ('verticalDoor' o 'horizontalDoor')
				objD.width,  // El tamaño de la puerta en Tiled
				objD.height, // El tamaño de la puerta en Tiled
			);
			// Añadir la puerta al grupo de puertas
			this.doorGroup.add(door);
		});


		//#endregion

		//#region Objetos

		// la escala de la puerta lo hace en la constructora de la clase door
		this.PickableObjects = this.add.group();
		this.objectsLayer = this.map.getObjectLayer('Objects');
		this.objectsLayer.objects.forEach((obj) => {
			const pickable = new PickableObjects(this, obj.x * SCALE, obj.y * SCALE, obj.name, obj.name);
			pickable.setScale(SCALE);
			this.PickableObjects.add(pickable);
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

		const change = objectLayer.objects.find(obj => obj.name == 'changeLevel');
		this.DoorLevel2 = new ChangeLevelDoor(this, change.x, change.y, change.width, change.height);


		// #endregion


		// #region Player

		this.player = new Player(this, playerX, playerY);
		this.player.setScale(SCALE);
		// Guarda la referencia en el registry
		this.registry.set('player', this.player);

		this.rectGroup = this.add.group();
		this.rectangleLayer = this.map.getObjectLayer('rectangle');
		this.rectangleLayer.objects.forEach((obj) => {
			const rect = new Rectangle(this, obj.x, obj.y, obj.width, obj.height, this.player);
			this.rectGroup.add(rect);
		});

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

		// #endregion

		//#region Enemy Area
		///scene, x, y, radius, damage, duration, scale=4
		toAdds = [];
		this.area = new Pool(this, MAX, 'Area');
		for (let i = 0; i < MAX; i++) {
			let toAdd = new DamageArea(this, 0, 0, 100, 0, '08_expl_anim');
			toAdds.push(toAdd);
		}
		this.area.addMultipleEntity(toAdds);

		toAdds = [];
		this.areaEs = new Pool(this, MAX,'Area');
		for (let i = 0; i < MAX; i++) {
			let toAdd = new DamageArea(this, 0, 0, 100, 0, '03_expl_anim');
			toAdds.push(toAdd);
		}
		this.areaEs.addMultipleEntity(toAdds);

		toAdds = [];

		//pool balas explosivas (francotirador explosivo)
		this.areaFE = new Pool(this, MAX, 'Area');
		for (let i = 0; i < MAX; i++) {
			let toAdd = new DamageArea(this, 0, 0, 100, 0, '30_expl_anim');
			toAdds.push(toAdd);
		}
		this.areaFE.addMultipleEntity(toAdds);

		toAdds = [];
		this.playerExplosiveBullets = new Pool(this, MAX, 'Bullet');
		for (let i = 0; i < MAX; i++) {
			let toAdd = new ExplosiveBullet(this, 0, 0, 'Bala2', 75, this.areaFE);
			toAdds.push(toAdd);
		}
		this.playerExplosiveBullets.addMultipleEntity(toAdds);

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


		this.arrayLetus = [];
		const letusLayer = this.map.getObjectLayer('Letus');
		letusLayer.objects.forEach(obj => {
			if (obj.name === 'Letus') { // Filtra por nombre
				const letus = new Letus(this, obj.x * SCALE, obj.y * SCALE, this.player, this.exp);
				letus.setScale(SCALE);
				this.arrayLetus.push(letus);
			}
		});

		this.enemies.addMultiple(this.arrayLetus);
		//#endregion

		//#region Traps

		this.traps = this.add.group();
		this.spikeTrap = new Retractable_Spike(this, this.player.x + 300, this.player.y);
		this.spikeTrap.setScale(SCALE);
		this.traps.add(this.spikeTrap);

		// this.traps = this.add.group();
		// this.statue = new Statue(this, this.player.x + 300, this.player.y, 0);
		// this.statue.setScale(SCALE);
		// this.statue.setPool(this.enemyBullets);
		// this.traps.add(this.statue);

		//#endregion

		//#region UI

		this.expBar = new ExpBar(this, 20, 30);

		this.healthBar = new HealthBar(this, 20, 10, this.player);

		//#endregion

		// #region NPC
		const NPCpos = objectLayer.objects.find(obj => obj.name == 'FlushPosition');
		const NPCX = NPCpos.x * SCALE;
		const NPCY = NPCpos.y * SCALE;

		this.Flush = new NPC(this, NPCX, NPCY, 'Flush', 'dialogues_Flush', "Caballero generoso");
		this.Flush.setScale(SCALE);


		const x = NPCpos.x * SCALE - 100;
		const y = NPCpos.y * SCALE;

		this.mutum = new Mutum(this, x, y, this.player, 1, this.area);
		this.mutum.setScale(SCALE);
		this.enemies.add(this.mutum);

		this.estaka = new Estaka(this, x - 100, y, this.player, 1, this.areaEs);
		this.estaka.setScale(SCALE);
		this.enemies.add(this.estaka);

		this.zaro = new Zaro(this, x - 200, y, this.player, 1);
		this.zaro.setScale(SCALE);
		this.zaro.setPool(this.enemyBullets);
		this.enemies.add(this.zaro);

		this.crac = new Crac(this, x - 300, y, this.player, 1);
		this.crac.setScale(SCALE);
		this.crac.setPool(this.enemyBullets);
		this.enemies.add(this.crac);

		// this.turret = new Turret(this, this.player.x + 500, this.player.y, this.enemies.getChildren());
		// this.turret.setScale(SCALE);
		// this.turret.setPool(this.playerBullets);

		// #region torretas
		toAdds = [];
		this.playerTurrent = new Pool(this, 10, 'Turret');
		for (let i = 0; i < MAX; i++) {
		 	let toAdd = new Turret(this, 0, 0, this.enemies);
			toAdd.setPool(this.playerBullets);
		 	toAdds.push(toAdd);
		 }
		 this.playerTurrent.addMultipleEntity(toAdds);
		 this.player.registerTurrents(this.playerTurrent);
		// #endregion

		this.physics.add.overlap(this.player, this.area.getPhaserGroup(), (player, area) => {
			player.onGotHit(area.getDamage());
		});


		this.physics.add.overlap(this.enemies, this.areaFE.getPhaserGroup(), (enemy, area) => {
			enemy.onGotHit(area.getDamage());
		});


		// #endregion

		// #region Collision

		this.paredLayer.setCollisionByProperty({ collides: true });

		this.physics.add.collider(this.enemies, this.paredLayer);

		this.physics.add.collider(this.player, this.paredLayer);

		//collisiones con la puerta
		this.physics.add.collider(this.player, this.doorGroup);

		this.physics.add.collider(this.enemies, this.doorGroup);

		this.physics.add.collider(this.player, this.Flush);

		//colision player-enemigos
		this.physics.add.overlap(this.player, this.enemies, (player, enemy) => {
			if (enemy.visible) {
				player.knockback(500, enemy);
				player.onGotHit(enemy.getDamage());
				if (enemy.isMutum) enemy.createDamageArea();
			}

		});

		//colision bala player-enemigos
		this.physics.add.collider(this.playerBullets.getPhaserGroup(), this.enemies, (playerBullet, enemy) => {
			enemy.onGotHit(playerBullet.getDamage(), this.coins);
			// mandaria a la pool de las balas de player otra vez
			playerBullet.destroyBullet(this.playerBullets);
		});
		this.physics.add.collider(this.playerExplosiveBullets.getPhaserGroup(), this.enemies, (playerBullet, enemy) => {
			enemy.onGotHit(playerBullet.getDamage(), this.coins);
			// mandaria a la pool de las balas de player otra vez
			playerBullet.destroyBullet(this.playerBullets);
		});

		//colision bala enemigos-player
		this.physics.add.collider(this.enemyBullets.getPhaserGroup(), this.player, (enemyBullet, player) => {
			player.knockback(200, enemyBullet);
			player.onGotHit(enemyBullet.getDamage());
			// mandaria a la pool de las balas de los enemigos otra vez
			enemyBullet.destroyBullet(this.enemyBullets);
		});

		//colision fichas-player
		this.physics.add.collider(this.player, this.coins.getPhaserGroup(), (player, coin) => {
			player.onPlayerCollectedXP(coin.getExp());
			if (player.getXpAcu() >= player.getXpToLevelUp()) {
				player.levelUp();
			}
			coin.destroyCoin(this.coins);
			//console.log(this.expBar);
		});

		//colision balas-paredes
		this.physics.add.collider(this.playerBullets.getPhaserGroup(), this.paredLayer, (bullet, wall) => {
			bullet.destroyBullet(this.playerBullets);
		});
		this.physics.add.collider(this.playerExplosiveBullets.getPhaserGroup(), this.paredLayer, (bullet, wall) => {
			bullet.destroyBullet(this.playerExplosiveBullets);
		});
		this.physics.add.collider(this.enemyBullets.getPhaserGroup(), this.paredLayer, (bullet, wall) => {
			bullet.destroyBullet(this.enemyBullets);
		});

		//colision balas-puertas
		this.physics.add.collider(this.playerBullets.getPhaserGroup(), this.doorGroup, (bullet, door) => {
			bullet.destroyBullet(this.playerBullets);
		});
		this.physics.add.collider(this.enemyBullets.getPhaserGroup(), this.doorGroup, (bullet, door) => {
			bullet.destroyBullet(this.enemyBullets);
		});
		this.physics.add.collider(this.playerExplosiveBullets.getPhaserGroup(), this.doorGroup, (bullet, door) => {
			bullet.destroyBullet(this.playerExplosiveBullets);
		});

		//colision balas-fichas
		this.physics.add.collider(this.coins, this.playerBullets.getPhaserGroup(), (coin, bullet) => {
			coin.body.setBounce(0);
			bullet.body.setBounce(0);
		});

		//colision trampas-player
		this.physics.add.collider(this.traps, this.player, (trap, player,) => {
			player.knockback(200, trap);
			player.onGotHit(trap.getDamage());
		});



		// #endregion

		this.cameras.main.startFollow(this.player);


		if (this._tries == 1) {
			const dialogos = this.cache.json.get('dialogues');
			this.changeToDialogScene({ sceneKey: this.scene.key, backgroundType: 'dark', dialogos: dialogos });
		}

		// #region sonido
		this.MainSample = this.sound.add('level1Audio');
		this.MainSample.setLoop(true);
		this.MainSample.play();
		// #endregion
		

	}
	changeToDialogScene(data) {
		this.scene.launch('Dialog', data);
		this.scene.bringToTop('Dialog');
		this.scene.pause();
	}

	changeToGameover() {
		this.scene.start("gameover", { tries: this._tries });
	}

	changeToNextLevel() {
		this.scene.start('level2', { player: this.player, tries: this._tries });
	}
	pauseGame() {
		this.scene.launch("Pause", { previousScene: this.scene.key }); // Lanzar la escena de pausa
		this.scene.pause(); // Pausar la escena actual
	}
	resumeGame() {
		this.scene.resume(); // Reanudar la escena actual
		this.scene.stop("Pause"); // Detener la escena de pausa
	}
	update(t, dt) {
	}
}
