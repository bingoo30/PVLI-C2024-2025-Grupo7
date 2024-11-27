import Achievement from "../../UI/achievements.js";


export default class AchievementScene extends Phaser.Scene {

    constructor() {
        super({ key: 'AchievementScene' });
    }

    /**
     * Inicializaci�n de la escena.
     * @param {Object} inventory - Inventario del jugador.
     */
    init(inventory) {
        this.inventory = inventory; // Informaci�n del inventario (si es necesario).
    }

    /**
     * Precarga de recursos.
     */
    preload() {
        this.load.image('achievement', 'assets/achievement.png');
        this.load.image('LockedAchievement', 'assets/locked.png');
        this.load.image('PrevButton', 'assets/previous.png');
        this.load.image('NextButton', 'assets/next.png');
        // Cargar el archivo JSON de logros.
        this.load.json('achievementData', 'src/escenas/Logros/achievements_datas.json');

        // Escucha el evento de finalizaci�n de carga.
        this.load.on('complete', () => {
            // Obtener los datos del JSON una vez cargados.
            const achievementDatas = this.cache.json.get('achievementData');

            // Precargar din�micamente los sprites de logros.
            achievementDatas.forEach(data => {
                this.load.image(data.unlockedSprite, `assets/${data.unlockedSprite}.png`);
            });
        });
    }
    /**
     * Creaci�n de los elementos de la escena.
     */
    create() {

        // Fondo de la escena.
        const wallpaper = this.add.image(0, 0, 'achievement').setOrigin(0, 0);
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
                data.info              // Informaci�n/Descripci�n.
            );
            this.achievements.push(achievement);
        }

        // Paginaci�n.
        this.currentPage = 0;
        this.num = 3; //cuantos elementos hay en una fila y columna
        this.acvPerPage = 2 * this.num*this.num;
        this.totalPages = Math.ceil(this.achievements.length / this.acvPerPage);
        this.updatePage();

        //botones para pasar pagina
        var prevButton = this.add.image(100, 100, 'PrevButton').setScale(0.35);
        prevButton.setInteractive(); // Hacemos el sprite interactivo para que lance eventos


        // Escuchamos los eventos del rat�n cuando interactual con nuestro sprite de "Start"
        prevButton.on('pointerdown', pointer => {
            this.previousPage();
        });

        var nextButton = this.add.image(925, 100, 'NextButton').setScale(0.35);
        nextButton.setInteractive(); // Hacemos el sprite interactivo para que lance eventos


        // Escuchamos los eventos del rat�n cuando interactual con nuestro sprite de "Start"
        nextButton.on('pointerdown', pointer => {
            this.nextPage();
        });
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
        if (this.currentPage < this.totalPages-1) {
            this.currentPage++;
            this.updatePage();
        }
    }

    /**
     * Cambia a la p�gina anterior.
     */
    previousPage() {
        if (this.currentPage > 0) {
            this.currentPage--;
            this.updatePage();
        }
    }
}