/**
     * @extends InteractableObjects
     Lo que recibe
     * @param {Scene} scene - la escena que esta
     * @param {number} x - posicion x
     * @param {number} y - posicion y
     * @param {String} texture - key del sprite del objeto
     * @param {number} sizeW - ancho del collider de la puerta
     * @param {number} sizeH - altura del collider de la puerta
     * @param {number} scale - escala de la mapa
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

        scene.physics.add.existing(this);
        scene.add.existing(this);

        this.body.setImmovable(true);
        this.body.setOffset(0, 0);
        this.setOrigin(0, 0);

    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        if (!this.playerInRange) {
            this.isOpen = false;
            this.setVisible(true);
            this.body.checkCollision.none = false;
        }   
    }

    onInteract() {
        if (!this.body) {
           // console.log("Error: 'this.body' no est¨¢ definido en 'onInteract'.");
            return;
        }
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

