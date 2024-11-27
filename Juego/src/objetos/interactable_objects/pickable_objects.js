/**
     * @extends InteractableObjects
     Lo que recibe
     * @param {String} texture - key del sprite del objeto
     * @param {String} name - nombre o tipo de obj (si es llave tiene que poner key)
     Atributos
     * @param {boolean} isPick  - booleano para saber si esta cogido o no
     */
import InteractableObjects from './interactable_objects.js';
export default class PickableObjects extends InteractableObjects {
    constructor(scene, x, y, texture, name) {
        super(scene, x, y, [texture]);
        this.scene = scene;
        this.isPick = false;
        this.name= name;

        this.scene.add.existing(this);
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
    }

    onInteract() {
        if (this.canInteract && !this.isPick) {
            this.isPick = true;
            if (this.name == 'key') this.scene.player.Inventory.collectKey();
            else this.scene.player.Inventory.addObject(this);
            this.textActive = false;
            this.setVisible(false).setActive(false);
            this.text.setVisible(false);
        }
    }
}

