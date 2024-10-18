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
		this.load.image('player', 'assets/player.png')
	}
	
	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
		console.log("me he creado", this.scene.key);

		//Imagen de fondo
		this.add.image(0, 0, 'suelo').setOrigin(0, 0);

		
		//Instanciamos nuestro personaje, que es un caballero, y la plataforma invisible que hace de suelo
		let player = new Player(this, 50, 0);
		let floor = new Floor(this, 50);

		let scene = this; // Nos guardamos una referencia a la escena para usarla en la función anidada que viene a continuación
		
	


		/*
		 * Escuchamos los eventos de colisión en el mundo para poder actuar ante ellos
		 * En este caso queremos detectar cuando el caballero colisiona con el suelo para activar el salto del personaje
		 * El salto del caballero lo desactivamos en su "clase" (archivo knight.js) para evitar dobles saltos
		 * También comprobamos si está en contacto con alguna caja mientras ataca, en ese caso destruimos la caja
		 */
		scene.physics.world.on('collide', function(gameObject1, gameObject2, body1, body2) {
			// Comprobamos si la colisión es del caballero con una caja (grupo boxes)
			if (gameObject1 === player && boxes.contains(gameObject2)){
				if(gameObject1.isAttackInProcess()) {
					gameObject2.destroyMe()
				} 				
			}
		});	

	}

	init(){

	}

	update(time, dt){
		

	}

}
