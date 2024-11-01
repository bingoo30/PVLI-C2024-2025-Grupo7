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

		/*
		// Load navmesh data
		const jsonData = this.cache.json.get('navmesh');
		console.log("JSON Data:", jsonData);
		// Validate JSON data
		if (!jsonData || !jsonData.layers) {
			console.error("Unable to find layers in the JSON data.");
			return;
		}

		const navMeshLayer = jsonData.layers.find(layer => layer.name === 'navmesh');
		if (!navMeshLayer || !navMeshLayer.objects) {
			console.error("Unable to find navmesh layer or objects in the JSON data.");
			return;
		}

		navMeshObjects = navMeshLayer.objects;
		if (!navMeshObjects) {
			console.error("Unable to find objects in the navmesh layer.");
			return;
		}

		navMeshObjects.forEach((rectangle) => {
			const rect = this.add.rectangle(rectangle.x, rectangle.y, rectangle.width, rectangle.height, 0x000000);
			rect.setOrigin(0, 0);
		});

		// Convert objects to polygons
		const polygons = navMeshObjects.map(obj => {
			const { x, y, width, height } = obj;
			return [
				{ x: x, y: y },
				{ x: x + width, y: y },
				{ x: x + width, y: y + height },
				{ x: x, y: y + height }
			];
		});

		/*
		// Flatten polygons into an array of vertices
		const vertices = polygons.reduce((acc, polygon) => {
			polygon.forEach(vertex => acc.push(vertex.x, vertex.y));
			return acc;
		}, []);
		*/

		/*
		// Build the navigation mesh
		this.objectLayer = this.createObjectLayer();
		this.navMesh = this.navMeshPlugin.buildMeshFromTiled('navmesh', polygons, 32);  // name, objectLayer, TileSize
		
		// Test finding a path
		const path = this.navMesh.findPath({ x: 50, y: 50 }, { x: 400, y: 300 });
		console.log(path);
		*/




		

		// Create the NavMesh based on the tilemap
		this.navMesh = new NavMesh(sueloLayer, 1);



		//sueloLayer.setPosition(-1024*3.5,-1024*3.5);
		//paredLayer.setPosition(-1024*3.5,-1024*3.5);

		paredLayer.setCollisionByProperty({ collides: true });
		sueloLayer.setScale(SCALE);
		paredLayer.setScale(SCALE);

		//const navMesh = this.navMeshPlugin.buildMeshFromTilemap("mesh", map, [sueloLayer]);

		/*
		const path = navMesh.findPath({ x: 400, y: 40 }, { x: 1000, y: -100 });

		//console.log(path);

		let graphics = this.add.graphics();

		graphics.lineStyle(2, 0xff0000, 1);
		graphics.beginPath();
		graphics.moveTo(path[0].x, path[0].y);

		for (let idx = 1; idx < path.length; idx++) {
			graphics.lineTo(path[idx].x, path[idx].y);
		}

		graphics.strokePath();
		*/

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
