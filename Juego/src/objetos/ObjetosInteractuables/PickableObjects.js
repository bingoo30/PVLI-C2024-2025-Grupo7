/**
     * @extends InteractableObjects
     Lo que recibe
     * @param {String} texture - key del sprite del objeto
     Atributos
     * @param {boolean} isPick  - booleano para saber si esta cogido o no
     */
import InteractableObjects from './InteractableObjects.js';
export default class PickableObjects extends InteractableObjects {
    constructor(scene, x, y, texture) {
        super(scene, x, y, [texture]);

        this.scene = scene;
        this.isPick = false;

        this.scene.add.existing(this);
        this.body.setImmovable(true);
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
    }

    onInteract() {
        if (this.canInteract && !this.isPick) {
            this.isPick = true;
            //llamar al DialogManager de la escena
            const dialogos = this.scene.cache.json.get(this.dialogues);
            const dialogManager = this.scene.dialogManager;
            const dialogPlugin = this.scene.dialog;

            if (dialogManager) {

                dialogManager.initialize(dialogPlugin, dialogos);
                dialogManager.showDialogue();

                if (!dialogManager.isDialogActive) this.isDialogActive = false;
            }
            else {
                console.error("El DialogManager no est¨¢ disponible en la escena.");
            }
        }
    }
}

