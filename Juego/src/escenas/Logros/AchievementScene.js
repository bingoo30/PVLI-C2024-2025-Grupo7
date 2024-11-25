import Achievement from "../../UI/Achievement.js";


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
        const numIz = 3; // Usamos el �ndice para la posici�n.
        var j = 0;
        // Crear logros y agregarlos al array.
        for (let i = 0; i < achievementData.length && i < numIz*numIz; i++) {
            const data = achievementData[i]; // Obtener los datos del logro actual.
            const x = 100 + (i % numIz) * 150; // Posici�n X (3 columnas).
            const y = 200 + Math.floor(i / numIz) * 125; // Posici�n Y (3 filas).

            const achievement = new Achievement(
                this,                  // Escena.
                x,                    // Posici�n X.
                y,                    // Posici�n Y.
                data.unlockedSprite,   // Sprite desbloqueado.
                data.title,            // T�tulo/ID.
                data.info              // Informaci�n/Descripci�n.
            );

            this.add.existing(achievement); // A�adir a la escena.
            this.achievements.push(achievement);
            j++; //para guarda el ultimo indice para el lado derecho
        }
        // Crear logros y agregarlos al array.
        for (let n = 0; j < achievementData.length && n < numIz * numIz; n++) {
            const data = achievementData[j]; // Obtener los datos del logro actual.
            const x = 625 + (n % numIz) * 150; // Posici�n X (3 columnas).
            const y = 200 + Math.floor(n / numIz) * 125; // Posici�n Y (3 filas).

            const achievement = new Achievement(
                this,                  // Escena.
                x,                    // Posici�n X.
                y,                    // Posici�n Y.
                data.unlockedSprite,   // Sprite desbloqueado.
                data.title,            // T�tulo/ID.
                data.info              // Informaci�n/Descripci�n.
            );

            this.add.existing(achievement); // A�adir a la escena.
            this.achievements.push(achievement);
            j++; //para guarda el ultimo indice para el lado derecho
        }

        // Paginaci�n.
        this.currentPage = 0;
        this.totalPages = Math.ceil(this.achievements.length / 16);
        this.updatePage();

        // Controles de cambio de p�gina.
        this.input.keyboard.on('keydown-RIGHT', () => this.nextPage());
        this.input.keyboard.on('keydown-LEFT', () => this.previousPage());
    }

    

    /**
     * Actualiza los logros visibles seg�n la p�gina actual.
     */
    updatePage() {
        const startIndex = this.currentPage * 16;
        const endIndex = startIndex + 16;

        this.achievements.forEach((achievement, index) => {
            achievement.setVisible(index >= startIndex && index < endIndex);
        });
    }

    /**
     * Cambia a la p�gina siguiente.
     */
    nextPage() {
        if (this.currentPage < this.totalPages - 1) {
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