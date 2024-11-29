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
export default class AbilityIcon extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, title, unlockedSprite,locked) {
        let key = "LockedAbility";
        if (!locked) key = unlockedSprite;
        super(scene, x, y, key);
        // #region atributos
        this.scene = scene;
        this.scale = 0.35;
        this.unlockedSprite = unlockedSprite;
        this.locked = locked;
        this.title = title;


        // Añadir a la escena y hacerle interactivo
        this.scene.add.existing(this);
        this.setInteractive();

        // #endregion

        // Texto del título.
        this.titleText = this.scene.add.text(x, y - 50, title, {
            fontFamily: "PixelArt",
            fontSize: 20,
            color: "#ffffff",
            align: "center",
            wordWrap: {
                width: 125, // Ancho máximo antes de dividir en una nueva línea.
                useAdvancedWrap: true, // Habilita el ajuste avanzado para cortar palabras.
            },
        }).setOrigin(0.5);
        this.titleText.visible = false;

        // Eventos de interacción
        this.on('pointerover', () => this.showTooltip());
        this.on('pointerout', () => this.hideTooltip());
    }
    /**
     * Setters de posicion.
     */
    X(x) {
        this.x = x;
        this.titleText.x = x;
    }
    Y(y) {
        this.y = y;
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
