/**
     * @extends InteractableObjects
     Lo que recibe
     * @param {Scene} scene - la escena que esta
     * @param {int} x - posicion x
     * @param {int} y - posicion y
     * @param {String} texture - key del sprite del objeto
     * @param {int} sizeW - ancho del collider de la puerta
     * @param {int} sizeH - altura del collider de la puerta
     * @param {int} scale - escala de la mapa
     Atributos
     * @param {boolean} isOpen  - booleano para saber si la puerta esta abierto o no
     */
import InteractableObjects from './interactable_objects.js';
export default class Door extends InteractableObjects {
    constructor(scene, x, y, doorClass, sizeW = 32, sizeH = 32, scale = 4) {
        super(scene, x * scale, y * scale, [doorClass === 'verticalDoor' ? 'verticalDoor' : 'horizontalDoor'], 200, 50);

        this.scene = scene;
        this.isOpen = false;
        this.setDisplaySize(sizeW * scale, sizeH * scale);
        this.scene.add.existing(this);

        this.scene.physics.add.existing(this);
        this.body.setImmovable(true);
        //this.body.setSize(sizeW, sizeH);
        this.body.setOffset(0, 0);
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

