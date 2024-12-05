export default class Gameover extends Phaser.Scene {
	
	constructor() {
		super({ key: 'gameover' });
	}
	
	init(data){
		this.score = data.score;
		this.time = (data.time/1000).toFixed(2); // Cambiamos el tiempo de milisegundos a segundos con dos decimales
	}

	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create(data) {
		//console.log("me he creado", this.scene.key);

		//aumentar el numero de veces que me he muerto
		const _tries = data.tries++;

		var sprite = this.add.image(this.sys.game.canvas.width/2, 20, 'end').setOrigin(0.5,0)
		sprite.setInteractive(); // Hacemos el sprite interactivo para que lance eventos

		// Escuchamos los eventos del ratón cuando interactual con nuestro sprite de "Start"
	    sprite.on('pointerup', pointer => {
			this.scene.start('title', { tries: _tries }); //Cambiamos a la escena de juego
	    });

	}
}