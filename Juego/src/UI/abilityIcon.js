const VALUE_OF_ABILITY = 3;
export default class AbilityIcon extends Phaser.GameObjects.Sprite {
    /**
 * @extends Phaser.GameObjects.Sprite;
 *   //Atributos
     * @param {Scene} scene - escena en la que aparece
     * @param {number} x - coordenada x
     * @param {number} y - coordenada y
     * @param {string} unlockedSprite - la palabra clave del sprite
     * @param {string} title - titulo
     * @param {string} info - descripcion de la habilidad
     * @param {boolean} locked -booleano que indica que esta desbloquedo una habilidad
 */
    constructor(scene, x, y, title, unlockedSprite, info, locked) {
        let key = "LockedAbility";
        if (!locked) key = unlockedSprite;
        super(scene, x, y, key);
        // #region atributos
        this.scene = scene;
        this.scale = 0.35;
        this.unlockedSprite = unlockedSprite;
        this.locked = locked;
        this.info = info;
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

        // Tooltip
        this.tooltip = this.scene.add.text(x, y + 40, "", {
            fontFamily: "PixelArt",
            fontSize: 20,
            color: "#ffffff",
            align: "center",
            wordWrap: {
                width: 125, // Ancho máximo antes de dividir en una nueva línea.
                useAdvancedWrap: true, // Habilita el ajuste avanzado para cortar palabras.
            },
        }).setOrigin(0.5);
        this.tooltip.setVisible(false);

        // Eventos de interacción
        this.on('pointerover', () => this.showTooltip());
        this.on('pointerout', () => this.hideTooltip());

        this.on('pointerdown', (points) => {
            this.unlockAbility(points);
        });
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
    unlockAbility(p) {
        if (p < VALUE_OF_ABILITY) {
            console.log("No se puede activar esta habilidad porque no tienes puntos suficientes");
        }
        else {
            //lanzo el evento con la habilidad a desloquear y los puntos restantes
            this.scene.game.events.emit('unlockAbility', this.title, p-VALUE_OF_ABILITY);
        }
    }
}
