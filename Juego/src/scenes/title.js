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
		this.load.image('start', 'assets/GUI/start_button.png');
		this.load.image('logros', 'assets/GUI/achievements.png');
		this.load.image('background', 'assets/GUI/beckground_start_1.png');
		this.load.audio('TitleSample', 'assets/audio/MenuPrincipal.mp3');

		this.load.image('achievement', 'assets/achievs/achievement.png');
		this.load.image('LockedAchievement', 'assets/achievs/locked.png');
		this.load.image('PrevButton', 'assets/achievs/previous.png');
		this.load.image('NextButton', 'assets/achievs/next.png');
		// Cargar el archivo JSON de logros.
		this.load.json('achievementData', 'src/scenes/achievements/achievements_datas.json');

		// Primero, registramos las imágenes de los logros
		this.load.on('filecomplete', (file) => {
				const achievementDatas = this.cache.json.get('achievementData');

				// Precargar dinámicamente los sprites de logros
				achievementDatas.forEach(data => {
					this.load.image(data.unlockedSprite, `assets/achievs/${data.unlockedSprite}.png`);
				});
		});

		// Escuchar el evento de finalización de carga
		this.load.on('complete', () => {
			// Obtener los datos del JSON una vez cargados
			const achievementDatas = this.cache.json.get('achievementData');

			// Después de la carga, puedes acceder a las texturas
			achievementDatas.forEach(data => {
				const textureKey = data.unlockedSprite; // Clave de la imagen cargada.

				// Verifica si la textura está disponible
				const texture = this.textures.get(textureKey);
				if (texture) {
					const image = texture.getSourceImage();
					console.log(
						"%c ",
						`font-size: 100px; background: url(${image.src}) no-repeat center; background-size: contain;`
					);
				} else {
					console.error(`No se encontró la textura: ${textureKey}`);
				}
			});
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
			this.scene.start('nivel1'); //Cambiamos a la escena de juego

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
			this.scene.start('AchievementScene');

		});

	}
}