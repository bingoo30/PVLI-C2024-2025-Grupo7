import Achievement from "../../UI/Achievement";


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
        this.load.json('achievementData', 'assets/achievements.json');

        // Precargar din�micamente los sprites de logros.
        const achievementData = this.cache.json.get('achievementData');
        achievementData.forEach(data => {
            this.load.image(data.unlockedSprite, `assets/${data.unlockedSprite}.png`);
        });
    }
    /**
     * Creaci�n de los elementos de la escena.
     */
    create() {
        // Fondo de la escena.
        this.wallpaper = this.add.image(0, 0, 'background').setOrigin(0, 0);

        // Obtener datos de logros.
        const achievementData = this.getAchievementData();

        // Array para almacenar logros.
        this.achievements = [];

        // Crear logros y agregarlos al array.
        achievementData.forEach((data, index) => {
            const x = 100 + (index % 4) * 150; // Posici�n X (4 columnas).
            const y = 100 + Math.floor(index / 4) * 150; // Posici�n Y (4 filas).
            const achievement = new Achievement(
                this,                  // Escena.
                x,                    // Posici�n X.
                y,                    // Posici�n Y.
                'LockedAchievement',   // Sprite bloqueado.
                data.unlockedSprite,   // Sprite desbloqueado.
                data.title,            // T�tulo/ID.
                data.info              // Informaci�n/Descripci�n.
            );
            this.add.existing(achievement); // A�adir a la escena.
            this.achievements.push(achievement);
        });

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