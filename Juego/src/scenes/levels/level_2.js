import Player from '../../objects/player/player.js';
import Crac from '../../objects/enemies/crac.js'
import HealthBar from '../../UI/health_bar.js';
import ExpBar from '../../UI/exp_bar.js';
import Coin from '../../objects/enemies/coin.js';
import Bullet from '../../objects/abilities/shooting/bullet.js';

import Pool from '../../objects/our_pool.js'
import Bob from '../../objects/enemies/bob.js';
import Letus from '../../objects/enemies/letus.js';
import Turret from '../../objects/abilities/turret.js';

import NPC from '../../objects/interactable_objects/npc.js';
import Door from '../../objects/interactable_objects/door.js';
import DamageArea from '../../objects/abilities/area_damage/damage_area.js';
import PickableObjects from '../../objects/interactable_objects/pickable_objects.js';
import ChangeLevelDoor from '../../objects/interactable_objects/change_level_door.js';
import Rectangle from '../../objects/interactable_objects/rectangle.js';
import Zaro from '../../objects/enemies/zaro.js';
import Spike from '../../objects/scenery/spike.js';
import RetractableSpike from '../../objects/scenery/retractable_spike.js';
import ExplosiveBullet from '../../objects/abilities/shooting/explosive_bullet.js';
import Drone from '../../objects/abilities/drone.js';
import Plant from '../../objects/enemies/plant.js';


//constante
const SCALE = 4;
/**
 * Escena principal de juego.
 * @extends Phaser.Scene
 */
export default class Animation extends Phaser.Scene {

	constructor() {
		super({ key: 'level2' });
	}
	preload() {
		// dialogos level2
		this.load.tilemapTiledJSON('mapa2', 'assets/map/map_2/mapa_2.json');

		this.load.image('tileset2', 'assets/map/map_2/map_tiles2.png');

		this.load.json('dialogues_Weiyoung', 'assets/dialogues/dialogues_weiyoung.json');
		this.load.image('Weiyoung', 'assets/character/weiyoung.png');

		this.load.json('level2Memory1', 'assets/dialogues/level2_memory1.json');
		this.load.json('level2Memory2', 'assets/dialogues/level2_memory2.json');
		this.load.json('level2Memory3', 'assets/dialogues/level2_memory3.json');
	}

	/**  
	* Creaci�n de los elementos de la escena principal de juego
	*/
	create(data) {
		this.sound.stopAll();
		this.tries = data.tries;

		// #region Entities
		// #region Map

		this.map = this.make.tilemap({ key: 'mapa2', tileWidth: 32, tileHeight: 32 });

		this.tileset = this.map.addTilesetImage('map_tiles2', 'tileset2');

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
		const objectLayer = this.map.getObjectLayer('position');

		const change = objectLayer.objects.find(obj => obj.name == 'changeLevel');
		this.DoorLevel3 = new ChangeLevelDoor(this, change.x, change.y, change.width, change.height);

		this.doorGroup = this.add.group();
		this.doorLayer = this.map.getObjectLayer('Door');
		console.log(this.doorLayer);
		this.doorLayer.objects.forEach((objD) => {
			const door = new Door(this, objD.x, objD.y,
				objD.name,  // El tipo de puerta ('verticalDoor' o 'horizontalDoor')
				objD.width,  // El tama�o de la puerta en Tiled
				objD.height, // El tama�o de la puerta en Tiled
			);
			// A�adir la puerta al grupo de puertas
			this.doorGroup.add(door);
		});
		//#endregion

		// #region pickables
		this.PickableObjects = this.add.group();
		this.objectsLayer = this.map.getObjectLayer('Objects');

		this.objectsLayer.objects.forEach((obj) => {
			var pickable;
			if (obj.name == 'key') {
				pickable = new PickableObjects(this, obj.x * SCALE, obj.y * SCALE, obj.name, obj.name);
			}
			else if (obj.properties) {
				var dialogProp = obj.properties.find(prop => prop.name === 'dialog')
				pickable = new PickableObjects(this, obj.x * SCALE, obj.y * SCALE, obj.name, dialogProp.value, dialogProp.value);
			}
			this.PickableObjects.add(pickable);
		});
		// #endregion
		// #endregion

		// #region Player
		// #region Player Position
		const playerPos = objectLayer.objects.find(obj => obj.name == 'playerPosition');

		// Verificar si el objeto fue encontrado
		if (!playerPos) console.log('Position player no encontrado.');
		const playerX = playerPos.x * SCALE;
		const playerY = playerPos.y * SCALE;

		// #endregion
		this.player = new Player(this, playerX, playerY);
		this.player.setScale(SCALE);
		//copia profunda

		//this.player.newLevelClone(data.player);
		// Sobreescribir la referencia en el registro
		this.registry.set('player', this.player);
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

		// #region Plants

		toAdds = [];
		this.plants = new Pool(this, MAX, 'Plant');
		for (let i = 0; i < MAX; i++) {
			let toAdd = new Plant(this, 0, 0, 1);
			toAdds.push(toAdd);
		}
		this.plants.addMultipleEntity(toAdds);

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
		this.areaEs = new Pool(this, MAX, 'Area');
		for (let i = 0; i < MAX; i++) {
			let toAdd = new DamageArea(this, 0, 0, 100, 0, '03_expl_anim');
			toAdds.push(toAdd);
		}
		this.areaEs.addMultipleEntity(toAdds);
		// #endregion

		// #region pool balas explosivas (francotirador explosivo)
		toAdds = [];
		this.areaFE = new Pool(this, MAX, 'Area');
		for (let i = 0; i < MAX; i++) {
			let toAdd = new DamageArea(this, 0, 0, 100, 0, '30_expl_anim');
			toAdds.push(toAdd);
		}
		this.areaFE.addMultipleEntity(toAdds);

		toAdds = [];
		this.playerExplosiveBullets = new Pool(this, MAX, 'Bullet');
		for (let i = 0; i < MAX; i++) {
			let toAdd = new ExplosiveBullet(this, 0, 0, 'Bala2', 125, this.areaFE);
			toAdds.push(toAdd);
		}
		this.playerExplosiveBullets.addMultipleEntity(toAdds);

		//comparo si hay otros datos de player, si es asi, actualizo, lo hago aqui porque player necesitara registrar del tipo de bala que es
		if (data.player !== undefined) {
			this.player.newLevelClone(data.player);
		}
		// Guarda la referencia en el registry
		this.registry.set('player', this.player);
		// #endregion

		// #region Enemy
		this.enemies = this.add.group();

		// #region Cracs
		this.exp = 1;
		this.arrayCracs = [];
		const cracLayer = this.map.getObjectLayer('Crac');
		cracLayer.objects.forEach(obj => {
			if (obj.name === 'Crac') { // Filtra por nombre
				const crac = new Crac(this, obj.x * SCALE, obj.y * SCALE, this.player, this.exp, 2, 1, "Crac");
				crac.setScale(SCALE);
				crac.setPool(this.enemyBullets);
				// Agregar el Crac a la escena y al array
				//this.add.existing(crac);
				this.arrayCracs.push(crac);
			}
		});
		console.log(this.arrayCracs);
		this.enemies.addMultiple(this.arrayCracs);
		// #endregion

		// #region Bobs
		this.arrayBobs = [];
		const bobLayer = this.map.getObjectLayer('Bob');
		bobLayer.objects.forEach(obj => {
			if (obj.name === 'Bob') { // Filtra por nombre
				const bob = new Bob(this, obj.x * SCALE, obj.y * SCALE, this.player, this.exp, 2, 1, 'Bob');
				bob.setScale(SCALE);
				this.arrayBobs.push(bob);
			}
		});
		console.log(this.arrayBobs);

		this.enemies.addMultiple(this.arrayBobs);
		// #endregion

		// #region Letus
		this.arrayLetus = [];
		const letusLayer = this.map.getObjectLayer('Letus');
		letusLayer.objects.forEach(obj => {
			if (obj.name === 'Letus') { // Filtra por nombre
				const letus = new Letus(this, obj.x * SCALE, obj.y * SCALE, this.player, this.exp, 2, 1, 'Letus');
				letus.setScale(SCALE);
				this.arrayLetus.push(letus);
			}
		});
		console.log(this.arrayLetus);

		this.enemies.addMultiple(this.arrayLetus);
		// #endregion

		// #region Zaros
		this.arrayZaros = [];
		const zaroLayer = this.map.getObjectLayer('Zaro');
		zaroLayer.objects.forEach(obj => {
			if (obj.name === 'Zaro') { // Filtra por nombre
				const zaro = new Zaro(this, obj.x * SCALE, obj.y * SCALE, this.player, this.exp, 2, 1, "Zaro");
				zaro.setPool(this.enemyBullets);
				zaro.setScale(SCALE);
				this.arrayZaros.push(zaro);
			}
		});
		console.log(this.arrayZaros);

		this.enemies.addMultiple(this.arrayZaros);
		// #endregion

		// #endregion

		// #region utilidades
		toAdds = [];
		this.playerTurret = new Pool(this, 10, 'Turret');
		for (let i = 0; i < 10; i++) {
			let toAdd = new Turret(this, 0, 0, this.enemies);
			toAdd.setPool(this.playerBullets);
			toAdds.push(toAdd);
		}
		this.playerTurret.addMultipleEntity(toAdds);
		this.player.registerTurrets(this.playerTurret);

		let drone = new Drone(this, this.player.x, this.player.y, this.player, this.enemies, this.playerBullets);
		this.player.registerDrone(drone);
		// #endregion

		// #region UI

		this.expBar = new ExpBar(this, 20, 30);

		this.healthBar = new HealthBar(this, 20, 10, this.player);
		// #endregion

		// #region NPC
		const NPCpos = objectLayer.objects.find(obj => obj.name == 'weiyoungPosition');
		const NPCX = NPCpos.x * SCALE;
		const NPCY = NPCpos.y * SCALE;

		this.Weiyoung = new NPC(this, NPCX, NPCY, 'Weiyoung', 'dialogues_Weiyoung', "Choque cultural");
		this.Weiyoung.setScale(SCALE);
		// #endregion

		//#region Traps
		this.traps = this.add.group();
		// #region Spikes
		this.arraySpikes = [];
		const spikeLayer = this.map.getObjectLayer('Spikes');
		spikeLayer.objects.forEach(obj => {
			if (obj.name === 'Spike') { // Filtra por nombre
				const spike = new Spike(this, obj.x * SCALE, obj.y * SCALE);
				spike.setScale(SCALE);
				this.arraySpikes.push(spike);
			}
		});
		this.traps.addMultiple(this.arraySpikes);
		// #endregion

		// #region Retractables spikes
		this.arrayRetractableSpikes = [];
		const retractableSpikeLayer = this.map.getObjectLayer('RetractablesSpikes');
		retractableSpikeLayer.objects.forEach(obj => {
			if (obj.name === 'retractableSpike') { // Filtra por nombre
				const retractableSpike = new RetractableSpike(this, obj.x * SCALE, obj.y * SCALE);
				retractableSpike.setScale(SCALE);
				this.arrayRetractableSpikes.push(retractableSpike);
			}
		});
		this.traps.addMultiple(this.arrayRetractableSpikes);
		// #endregion

		// #region rectangulos negros
		this.rectGroup = this.add.group();
		this.rectangleLayer = this.map.getObjectLayer('rectangle');
		this.rectangleLayer.objects.forEach((obj) => {
			const rect = new Rectangle(this, obj.x, obj.y, obj.width, obj.height, this.player).setDepth(4);
			this.rectGroup.add(rect);
		});
		// #endregion

		// #endregion

		// #region Collision

		this.paredLayer.setCollisionByProperty({ collides: true });

		this.physics.add.collider(this.enemies, this.paredLayer);
		this.physics.add.collider(this.player, this.paredLayer);

		//collisiones con la puerta
		this.physics.add.collider(this.player, this.doorGroup);

		this.physics.add.collider(this.enemies, this.doorGroup);

		this.physics.add.collider(this.player, this.Weiyoung);

		//colision player-enemigos
		this.physics.add.collider(this.player.collisionZone, this.enemies, (collisionZone, enemy) => {
			if (enemy.visible) {
				this.player.knockback(500, enemy);
				this.player.onGotHit(enemy.getDamage());
				if (enemy.isMutum) enemy.createDamageArea();
			}

		});

		//colision bala player-enemigos
		this.physics.add.collider(this.playerBullets.getPhaserGroup(), this.enemies, (playerBullet, enemy) => {
			enemy.onGotHit(playerBullet.getDamage(), this.coins, this.plants);
			// mandaria a la pool de las balas de player otra vez
			playerBullet.destroyBullet(this.playerBullets);
		});
		this.physics.add.collider(this.playerExplosiveBullets.getPhaserGroup(), this.enemies, (playerBullet, enemy) => {
			enemy.onGotHit(playerBullet.getDamage(), this.coins);
			// mandaria a la pool de las balas de player otra vez
			playerBullet.destroyBullet(this.playerBullets);
		});

		//colision bala enemigos-player
		this.physics.add.collider(this.enemyBullets.getPhaserGroup(), this.player.collisionZone, (enemyBullet, collisionZone) => {
			this.player.knockback(200, enemyBullet);
			this.player.onGotHit(enemyBullet.getDamage());
			// mandaria a la pool de las balas de los enemigos otra vez
			enemyBullet.destroyBullet(this.enemyBullets);
		});
		// colision areas
		this.physics.add.overlap(this.player, this.area.getPhaserGroup(), (player, area) => {
			player.onGotHit(area.getDamage());
		});


		this.physics.add.overlap(this.enemies, this.areaFE.getPhaserGroup(), (enemy, area) => {
			enemy.onGotHit(area.getDamage());
		});
		//colision fichas-player
		this.physics.add.collider(this.player.collisionZone, this.coins.getPhaserGroup(), (collisionZone, coin) => {
			this.player.onPlayerCollectedXP(coin.getExp());
			if (this.player.getXpAcu() >= this.player.getXpToLevelUp()) {
				this.player.levelUp();
			}
			coin.destroyCoin(this.coins);
			//console.log(this.expBar);
		});

		//colision planta-player
		this.physics.add.collider(this.player.collisionZone, this.plants.getPhaserGroup(), (zone, plant) => {
			this.player.onPlayerCollectedPlant(plant.getLifeRec());
			plant.destroyPlant(this.plants);
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

		// #region sonido
		this.MainSample = this.sound.add('level2Audio');
		this.MainSample.play();
		this.MainSample.setLoop(true);
		// #endregion
	}
	changeToDialogScene(data) {
		this.scene.launch('Dialog', data);
		this.scene.bringToTop('Dialog');
		this.scene.pause();
	}

	changeToGameover() {
		this.MainSample.stop();
		this.scene.start("gameover", { player: this.player, tries: this.tries, previousScene: this});
	}

	changeToNextLevel() {
		this.MainSample.stop();
		this.scene.start('level3', { player: this.player, tries: this.tries});
	}
	pauseGame() {
		this.scene.launch("Pause", {previousScene: this.scene.key }); // Lanzar la escena de pausa
		this.scene.pause(); // Pausar la escena actual
	}
	resumeGame() {
		this.scene.resume(); // Reanudar la escena actual
		this.scene.stop("Pause"); // Detener la escena de pausa
	}

	update(t, dt) {
	}
}