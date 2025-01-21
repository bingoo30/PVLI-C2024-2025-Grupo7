/**
     * @extends InteractableObjects
     Lo que recibe
     * @param {String} texture - key del sprite del objeto
     * @param {String} name - nombre o tipo de obj (si es llave tiene que poner key)
     Atributos
     * @param {Boolean} isPickable  - booleano para saber si esta cogido o no
     */
import InteractableObjects from './interactable_objects.js';
import { showPopup } from '../../UI/showPopUp.js';
import { unlock } from '../../scenes/achievements/unlock.js';
export default class PickableObjects extends InteractableObjects {
    constructor(scene, x, y, texture, name, dialogue = null) {
        super(scene, x, y, texture);
        this.isPickable = false;
        this.name = name;
        this.dialogue = dialogue;
        this.scene.add.existing(this);
        this.setScale(4);
        if (texture == 'memory') this.play('memoryIdle');
        this.achievement = null;

    }
    setAchievement(acv) {
        this.achievement = acv;
    }
    onInteract() { //cuando se intenta interactuar
        if (this.canInteract && !this.isPickable) {
            this.isPickable = true;
            if (this.name == 'key') this.scene.player.Inventory.collectKey();
            else {
                this.scene.player.Inventory.addObject(this);
                if (this.dialogue != null) {
                    const dialogos = this.scene.cache.json.get(this.dialogue);
                    this.scene.changeToDialogScene({ sceneKey: this.scene.scene.key, dialogos: dialogos });
                }
                else if(this.achievement!=null){
                    unlock(this.scene, this.achievement);
                    showPopup(this.scene, `Logro <<${this.achievement}>> desloqueado!`, this.scene.scale.width - 175, this.scene.scale.height - 100);
                }
            }

            this.textActive = false;
            this.setVisible(false).setActive(false);
            this.text.setVisible(false);
        }
    }
}

