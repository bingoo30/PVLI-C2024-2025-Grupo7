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
		const tileset = map.addTilesetImage('mapTiles', 'tileset');
		const sueloLayer = map.createLayer('suelo', tileset);
		const paredLayer = map.createLayer('pared', tileset);
		this.scale = SCALE;


		// Create the NavMesh based on the tilemap
		this.navMesh = new NavMesh(sueloLayer, 32);



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

		this.enemy = new Enemy(this, playerX+200, playerY, this.player);
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

	
	update(t, dt) {

		this.enemy.update(dt);

	

	}

}
