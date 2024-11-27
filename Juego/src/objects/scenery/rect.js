/**
     * @extends Phaser.GameObjects.Sprite
     Lo que recibe
     * @param {Scene} scene - la escena que esta
     * @param {int} x - posicion x
     * @param {int} y - posicion y
     * @param {int} sizeW - ancho del collider de la puerta
     * @param {int} sizeH - altura del collider de la puerta
     Atributos
     * @param {boolean} isOpen  - booleano para saber si la puerta esta abierto o no
     */
export default class SceneRectangle extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, sizeW = 32, sizeH = 32) {
        super(scene, x, y, sizeW, sizeH);

        this.scene = scene;
        this.isOpen = false;
        this.width = sizeW;
        this.height = sizeH;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setImmovable(true);
        
        this.body.setSize(sizeW, sizeH);
        this.setOrigin(0, 0);
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        if (!this.playerInRange) {
            this.isOpen = false
            this.setVisible(true);
            this.body.checkCollision.none = false;
        }

    }

    onInteract() {
        if (this.canInteract && !this.isOpen) {
            this.isOpen = true;
        }
        else this.isOpen = false;

        this.setVisible(!this.isOpen);
        this.body.checkCollision.none = this.isOpen;

        this.isWaitingInput = false;
        this.scene.time.delayedCall(500, () => {  // Retraso para el input
            this.isWaitingInput = true;
        });
    }
}

