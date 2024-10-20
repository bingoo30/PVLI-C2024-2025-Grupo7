import Player from '../../objetos/Player/player.js';
import Floor from '../../objetos/Escenario/floor.js';

/**
 * Escena principal de juego.
 * @extends Phaser.Scene
 */
export default class Animation extends Phaser.Scene {
	
	constructor() {
		super({ key: 'nivel1' });
	}
	
	preload(){
		this.load.image('suelo', 'assets/suelo.gif');
		this.load.image('Player', 'assets/player.png');
	}
	
	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
		console.log("me he creado", this.scene.key);

		//Imagen de fondo
		this.add.image(0, 0, 'suelo').setOrigin(0, 0);
		
		//Instanciamos nuestro personaje, que es un caballero, y la plataforma invisible que hace de suelo
		let player = new Player(this, 100, 100);
		let floor = new Floor(this, 50);

		let scene = this; // Nos guardamos una referencia a la escena para usarla en la función anidada que viene a continuación
		
	
	}

	init(){

	}

	update(time, dt){
		

	}

}
