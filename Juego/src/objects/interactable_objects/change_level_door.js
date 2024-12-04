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
        super(scene, x * scale, y * scale,'verticalDoor', 200, 50);

        this.scene = scene;
        this.isWaitingInput = true;
        this.setDisplaySize(sizeW * scale, sizeH * scale);
        this.scene.add.existing(this);

        this.scene.physics.add.existing(this);
        this.body.setImmovable(true);
        this.body.setOffset(0, 0);
        this.setOrigin(0, 0);

        this.keyMissingText = this.scene.add.text(x*scale+20, y*scale, "Falta la llave", {
            font: '15px PixelArt',
            fill: '#ffffff',
            backgroundColor: '#000000',
            padding: 4,
        }).setOrigin(0.5).setVisible(false);

    }

    onInteract() {
        if (this.canInteract) {
            if (this.scene.player.Inventory.key) this.scene.changeToNextLevel();
            else {
                this.keyMissingText.setVisible(true);
                this.scene.time.delayedCall(2000, () => { this.keyMissingText.setVisible(false); });
            }
        }
    }
}

