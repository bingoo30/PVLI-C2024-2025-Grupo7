import Achievement from "../../UI/Achievement";


export default class AchievementScene extends Phaser.Scene {

    constructor() {
        super({ key: 'AchievementScene' });
    }

    /**
     * Inicialización de la escena.
     * @param {Object} inventory - Inventario del jugador.
     */
    init(inventory) {
        this.inventory = inventory; // Información del inventario (si es necesario).
    }

    /**
     * Precarga de recursos.
     */
    preload() {
        this.load.image('achievement', 'assets/achievement.png');
        this.load.image('LockedAchievement', 'assets/locked.png');

        // Cargar el archivo JSON de logros.
        this.load.json('achievementData', 'assets/achievements.json');

        // Precargar dinámicamente los sprites de logros.
        const achievementData = this.cache.json.get('achievementData');
        achievementData.forEach(data => {
            this.load.image(data.unlockedSprite, `assets/${data.unlockedSprite}.png`);
        });
    }
    /**
     * Creación de los elementos de la escena.
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
            const x = 100 + (index % 4) * 150; // Posición X (4 columnas).
            const y = 100 + Math.floor(index / 4) * 150; // Posición Y (4 filas).
            const achievement = new Achievement(
                this,                  // Escena.
                x,                    // Posición X.
                y,                    // Posición Y.
                'LockedAchievement',   // Sprite bloqueado.
                data.unlockedSprite,   // Sprite desbloqueado.
                data.title,            // Título/ID.
                data.info              // Información/Descripción.
            );
            this.add.existing(achievement); // Añadir a la escena.
            this.achievements.push(achievement);
        });

        // Paginación.
        this.currentPage = 0;
        this.totalPages = Math.ceil(this.achievements.length / 16);
        this.updatePage();

        // Controles de cambio de página.
        this.input.keyboard.on('keydown-RIGHT', () => this.nextPage());
        this.input.keyboard.on('keydown-LEFT', () => this.previousPage());
    }

    

    /**
     * Actualiza los logros visibles según la página actual.
     */
    updatePage() {
        const startIndex = this.currentPage * 16;
        const endIndex = startIndex + 16;

        this.achievements.forEach((achievement, index) => {
            achievement.setVisible(index >= startIndex && index < endIndex);
        });
    }

    /**
     * Cambia a la página siguiente.
     */
    nextPage() {
        if (this.currentPage < this.totalPages - 1) {
            this.currentPage++;
            this.updatePage();
        }
    }

    /**
     * Cambia a la página anterior.
     */
    previousPage() {
        if (this.currentPage > 0) {
            this.currentPage--;
            this.updatePage();
        }
    }
}