/**
 * Escena de Título.
 * @extends Phaser.Scene
 */
export default class Title extends Phaser.Scene {
	/**
	 * Escena principal.
	 * @extends Phaser.Scene
	 */
	constructor() {
		super({ key: 'title' });
	}

	/**
	 * Cargamos todos los assets que vamos a necesitar
	 */
	preload() {
		this.load.image('start', 'assets/GUI/start.png');
		this.load.image('background', 'assets/GUI/fondoinicio.png');
	}
	
	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
		console.log("me he creado", this.scene.key);

		//Pintamos un fondo
		var back = this.add.image(0, 0, 'background').setOrigin(0, 0);

		//Pintamos un botón de Empezar
		var sprite = this.add.image(this.sys.game.canvas.width/2, this.sys.game.canvas.height/2 + 100, 'start')
		sprite.setInteractive(); // Hacemos el sprite interactivo para que lance eventos

		// Escuchamos los eventos del ratón cuando interactual con nuestro sprite de "Start"
	    sprite.on('pointerdown', pointer => {
	    	 console.log("pulsando");
	    });

	    sprite.on('pointerup', pointer => {
			this.scene.start('nivel1'); //Cambiamos a la escena de juego

	    });

		sprite.on('pointerover', () => {
			// console.log('puntero dentro')
	    });

	    sprite.on('pointerout', () => {
			// console.log('puntero fuera')
	    });

	}
}