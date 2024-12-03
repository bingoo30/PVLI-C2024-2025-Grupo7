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
		const achievementDatas = this.cache.json.get('achievementData');

		// Precargar dinámicamente los sprites de logros
		achievementDatas.forEach(data => {
			this.load.image(data.unlockedSprite, `assets/achievs/${data.unlockedSprite}.png`);
		});


	}
	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
		//console.log("me he creado", this.scene.key);

		var TitleSample = this.sound.add('TitleSample');
		TitleSample.setLoop(true);
		TitleSample.play();
		
		//Pintamos un fondo
		var back = this.add.image(0, 0, 'background').setOrigin(0, 0);
		back.setOrigin(0, 0);  // Asegura que el fondo empieza desde la esquina superior izquierda
		back.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);  // Redimensiona al tamaño del canvas


		//Pintamos un botón de Empezar
		var startButton = this.add.image(this.sys.game.canvas.width/2, this.sys.game.canvas.height/2 + 100, 'start')
		startButton.setInteractive(); // Hacemos el sprite interactivo para que lance eventos


		// Escuchamos los eventos del ratón cuando interactual con nuestro sprite de "Start"
		startButton.on('pointerdown', pointer => {
	    	 //console.log("pulsando");
	    });

		startButton.on('pointerup', pointer => {
			TitleSample.stop();
			this.scene.start('BossScene'); //Cambiamos a la escena de juego

		});

		//Pintamos un botón de Empezar
		var acvButton = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2 + 220, 'logros');
		acvButton.setScale(0.8);
		acvButton.setInteractive(); // Hacemos el sprite interactivo para que lance eventos


		// Escuchamos los eventos del ratón cuando interactual con nuestro sprite de "Start"
		acvButton.on('pointerdown', pointer => {
			//console.log("pulsando");
		});

		acvButton.on('pointerup', pointer => {
			this.scene.start('AchievementScene', { previousScene: this.scene.key });

		});

	}
}