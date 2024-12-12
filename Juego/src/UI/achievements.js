/**
 * @extends Phaser.GameObjects.Sprite;
 *   //Atributos
     * @param {Scene} scene - escena en la que aparece
     * @param {number} x - coordenada x
     * @param {number} y - coordenada y
     * @param {string} sprite - la palabra clave del sprite del logro
     * @param {string} title - titulo del logro
     * @param {string} info - informacion que aparece cuando dejo el curso encima de el
     * @param {boolean} locked -booleano que indica que esta desbloquedo un logro
 */
export default class Achievement extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, unlockedSprite, title, info, locked) {
        let key = "LockedAchievement";
        if (!locked) key = unlockedSprite; 
        super(scene, x, y, key);
        // #region atributos
        this.scene = scene;
        this.scale = 0.45;
        this.unlockedSprite = unlockedSprite;
        this.locked = locked;
        this.title = title;
        this.info = info;

        // Añadir a la escena y hacerle interactivo
        this.scene.add.existing(this);
        this.setInteractive();

        // #endregion

        // Texto del título.
        this.titleText = this.scene.add.text(x, y - 50, title, {
            fontFamily: "PixelArt",
            fontSize: 16,
            color: "#ffffff",
            align: "center",
            wordWrap: {
            width: 125, // Ancho máximo antes de dividir en una nueva línea.
            useAdvancedWrap: true, // Habilita el ajuste avanzado para cortar palabras.
        },
        }).setOrigin(0.5);
        this.titleText.visible = false;

        // Tooltip
        this.tooltip = this.scene.add.text(x, y + 40, "", {
            fontFamily: "PixelArt",
            fontSize: 16,
            color: "#ffffff",
            backgroundColor: "#000000",
            padding: { x: 5, y: 5 },
            wordWrap: {
                width: 160, // Ancho máximo antes de dividir en una nueva línea.
                useAdvancedWrap: true, // Habilita el ajuste avanzado para cortar palabras.
            },
        }).setOrigin(0.5).setVisible(false);


        // Eventos de interacción
        this.on('pointerover', () => this.showTooltip());
        this.on('pointerout', () => this.hideTooltip());
    }
    /**
     * Setters de posicion.
     */
    X(x) {
        this.x = x;
        this.tooltip.x = x;
        this.titleText.x = x;
    }
    Y(y) {
        this.y = y;
        this.tooltip.y = y + 40;
        this.titleText.y = y - 50;
    }
    /**
     * Setter de la visibilidad del titulo
     */
    TitleText(state) {
        this.titleText.setVisible(state);
    }

    /**
     * Muestra el tooltip al pasar el mouse.
     */
    showTooltip() {
        this.tooltip.setText(this.info);
        this.tooltip.setVisible(true);

    }

    /**
     * Oculta el tooltip cuando el mouse sale del logro.
     */
    hideTooltip() {
        this.tooltip.setVisible(false);
    }
}
