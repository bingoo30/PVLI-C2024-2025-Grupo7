/**
     * @extends InteractableObjects
     Lo que recibe
     * @param {String} texture - key del sprite del objeto
     Atributos
     * @param {boolean} isOpen  - booleano para saber si esta cogido o no
     */
import InteractableObjects from './InteractableObjects.js';
export default class PickableObjects extends InteractableObjects {
    constructor(scene, x, y, texture) {
        super(scene, x, y, [texture]);

        this.scene = scene;
        this.isOpen = false;

        this.scene.add.existing(this);
        this.body.setImmovable(true);
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
    }

    onInteract() {
        if (this.canInteract && !this.isPick) {
            this.isOpen = true;
            this.setVisible(false);
           
        }
    }
}

