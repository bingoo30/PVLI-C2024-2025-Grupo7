import Achievement from "../../UI/achievements.js";
export default class AchievementScene extends Phaser.Scene {
    /**
 * Escena de logros.
 * @extends Phaser.Scene
 */

    constructor() {
        super({ key: 'AchievementScene' });
    }
    /**
     * Creaci�n de los elementos de la escena.
     */
    create(data) {

        // Recuperar la clave de la escena previa
        const previousSceneKey = data.previousScene;


        // Fondo de la escena.
        const wallpaper = this.add.image(0, 0, 'pauseBackground').setOrigin(0, 0);
        wallpaper.setDisplaySize(this.scale.width, this.scale.height);

        // Array para almacenar logros.
        this.achievements = [];
        const achievementData = this.cache.json.get('achievementData');
        // Crear logros y agregarlos al array
        for (let i = 0; i < achievementData.length; i++) {
            const data = achievementData[i]; // Obtener los datos del logro actual.
            const x = 0; // Posici�n X (3 columnas).
            const y = 0; // Posici�n Y (3 filas).
            const achievement = new Achievement(
                this,                  // Escena.
                x,                    // Posici�n X.
                y,                    // Posici�n Y.
                data.unlockedSprite,   // Sprite desbloqueado.
                data.title,            // T�tulo/ID.
                data.info,              // Informaci�n/Descripci�n.
                data.locked
            );
            this.achievements.push(achievement);
        }

        // Paginaci�n.
        this.currentPage = 0;
        this.num = 3; //cuantos elementos hay en una fila y columna
        this.acvPerPage = 2 * this.num*this.num;
        this.totalPages = Math.ceil(this.achievements.length / this.acvPerPage);
        this.updatePage();

        this.exitSound = this.sound.add('exitButtonAudio');
        this.exitSound.setVolume(0.5);

        // efecto de sonido del botón
        this.buttonSFX = this.sound.add('buttonPressedAudio');
        this.buttonSFX.setVolume(0.5);

        // efecto de sonido del botón
        this.pointerOver = this.sound.add('pointerOverAudio');
        this.pointerOver.setVolume(0.5);

        //botones para pasar pagina
        let prevButton = this.add.image(100, 100, 'PrevButton').setScale(0.35);
        prevButton.setInteractive(); // Hacemos el sprite interactivo para que lance eventos


        // Escuchamos los eventos del rat�n cuando interactual con nuestro sprite de "Start"
        prevButton.on('pointerdown', () => {
            this.previousPage();
        });
        // Sonidos de cuando el cursor esta sobre el boton
        prevButton.on('pointerover', () => {
            this.pointerOver.play();
            prevButton.setTint(0x999999); // Oscurecer el sprite
        });
        prevButton.on('pointerout', () => {
            prevButton.clearTint(); // Restaurar el color original
        });

        let nextButton = this.add.image(925, 100, 'NextButton').setScale(0.35);
        nextButton.setInteractive(); // Hacemos el sprite interactivo para que lance eventos


        nextButton.on('pointerdown', () => {
            this.nextPage();
        });
        // Sonidos de cuando el cursor esta sobre el boton
        nextButton.on('pointerover', () => {
            this.pointerOver.play();
            nextButton.setTint(0x999999); // Oscurecer el sprite
        });
        nextButton.on('pointerout', () => {
            nextButton.clearTint(); // Restaurar el color original
        });

        var exitButton = this.add.image(50, 50, 'ExitButton').setScale(0.25);
        exitButton.setRotation(0.75);
        exitButton.setInteractive(); // Hacemos el sprite interactivo para que lance eventos

        // Sonidos de cuando el cursor esta sobre el boton
        exitButton.on('pointerover', () => {
            this.pointerOver.play();
            exitButton.setTint(0x999999); // Oscurecer el sprite
        });
        exitButton.on('pointerout', () => {
            exitButton.clearTint(); // Restaurar el color original
        });
        //para salir
        exitButton.on('pointerdown', () => {
            this.exitSound.play();
            this.time.addEvent({
                delay: 500,
                callback: () => {
                    this.scene.stop(); // Detiene la escena actual.
                    this.sound.resumeAll(); // Reanuda todos los sonidos pausados
                    this.scene.start(previousSceneKey);
                }
            });
        });
    }

    update(time, dt) {
        super.update(time, dt);
    }

    /**
     * Actualiza los logros visibles seg�n la p�gina actual.
     */
    updatePage() {
        this.achievements.forEach((acv) => {
            this.hide(acv);
        });
        const startIndex = this.currentPage * this.acvPerPage;

        let n = 0;
        // pintar todos los logros 
        for (let i = startIndex; i < this.achievements.length && n < this.num*this.num; i++) {
            const data = this.achievements[i]; // Obtener los datos del logro actual.
            const x = 100 + (n % this.num) * 150; // Posici�n X (3 columnas).
            const y = 200 + Math.floor(n / this.num) * 125; // Posici�n Y (3 filas).

            this.appear(x, y, this.achievements[i]); 
            n++;

        }
        n = 0;
        // recolocar los logros del lado derecho
        for (let i = startIndex + this.num * this.num; i < this.achievements.length && n < this.num * this.num; i++) {
            const data = this.achievements[i]; // Obtener los datos del logro actual.
            const x = 625 + (n % this.num) * 150; // Posici�n X (3 columnas).
            const y = 200 + Math.floor(n / this.num) * 125; // Posici�n Y (3 filas).

            this.appear(x, y, this.achievements[i]);
            n++
        } 
    }
    /**
     * Mostrar en pantalla un logro
     */
    appear(x, y, icon) {
        icon.X(x);
        icon.Y(y);
        icon.setInteractive(true);
        icon.setVisible(true);
        icon.TitleText(true);
    }
    /**
     * Esconder un logro
     */
    hide(icon) {
        icon.setInteractive(false);
        icon.setVisible(false);
        icon.TitleText(false);
    }
    /**
     * Cambia a la p�gina siguiente.
     */
    nextPage() {
        if (this.currentPage < this.totalPages - 1) {
            this.buttonSFX.play();
            this.currentPage++;
            this.updatePage();
        }
    }

    /**
     * Cambia a la p�gina anterior.
     */
    previousPage() {
        if (this.currentPage > 0) {
            this.buttonSFX.play();
            this.currentPage--;
            this.updatePage();
        }
    }
}