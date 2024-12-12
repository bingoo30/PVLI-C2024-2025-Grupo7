import { showPopup } from "../../UI/showPopUp.js";
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
     */
import InteractableObjects from './interactable_objects.js';
export default class ChangeLevelDoor extends InteractableObjects {
    constructor(scene, x, y, sizeW = 32, sizeH = 32, scale = 4) {
        super(scene, x * scale, y * scale,'changeDoor', 200, 50);
        
        this.isWaitingInput = true;
        this.setDisplaySize(sizeW * scale, sizeH * scale);
        this.scene.add.existing(this);

        this.scene.physics.add.existing(this);
        this.body.setImmovable(true);
        this.body.setOffset(0, 0);
        this.setOrigin(0, 0);
    }

    onInteract() {
        if (this.canInteract) {
            if (this.scene.player.Inventory.key) this.scene.changeToNextLevel();
            else {
                showPopup(this.scene, "Necesitas una llave para abrir esta puerta.", this.scene.sys.game.canvas.width / 2, 100);
            }
        }
    }
}

