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
    constructor(scene, x, y, unlockedSprite, title, info) {
        super(x, y, "LockedAchievement");
        // #region atributos
        this.scene = scene;
        this.unlockedSprite = unlockedSprite;
        this.locked = true;
        this.title = title;
        this.info = info;
        // #endregion

        // Añadir a la escena y hacerle interactivo
        this.scene.add.existing(this);
        this.setInteractive();

        // Tooltip
        this.tooltip = this.scene.add.text(x, y - 20, "", {
            font: "16px Arial",
            color: "#ffffff",
            backgroundColor: "#000000",
            padding: { x: 5, y: 5 },
        }).setOrigin(0.5).setVisible(false);

        // Eventos de interacción
        this.on('pointerover', () => this.showTooltip());
        this.on('pointerout', () => this.hideTooltip());

        // Evento para desbloquear logro
        this.scene.events.on(`unlock_${title}`, () => {
            this.unlock();
        });
    }
    /**
     * Desbloquea el logro y cambia el icono.
     */
    unlock() {
        if (this.locked) {
            this.locked = false;
            this.setTexture(this.unlockedSprite);
        }
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
