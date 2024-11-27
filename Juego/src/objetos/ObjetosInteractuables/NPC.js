/**
     * @extends InteractableObjects
     Lo que recibe
     * @param {String} texture - key del sprite del NPC
     * @param {String} dialogues - key del dialogo del NPC
     Atributos
     * @param {boolean} isDialogActive  - booleano para saber si esta en dialogo
     * 
     */
import InteractableObjects from './interactable_objects.js';
export default class NPC extends InteractableObjects {
    constructor(scene, x, y, texture, dialogues) {
        super(scene, x, y, [texture]);

        this.scene = scene;
        this.dialogues = dialogues;
        this.isDialogActive = false;

        this.scene.physics.add.existing(this);
        this.scene.add.existing(this);
        this.body.setSize(16, 10);
        this.body.setOffset(10, 24);
        this.body.setImmovable(true);
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);

    }

    onInteract() {
        if (this.canInteract && !this.isDialogActive) {
            this.isDialogActive = true;

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

