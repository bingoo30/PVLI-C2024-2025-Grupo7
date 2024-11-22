/**
     * @extends Phaser.GameObjects.Sprite
     Lo que recibe
     * @param {Phaser.Scene} scene La escena del juego
     * @param {number} x - Posici¨®n X
     * @param {number} y - Posici¨®n Y
     * @param {String} texture - sprite que va tener
     Atributos
     * @param {boolean} canInteract  - booleano para saber si se puede interactar
     * @param {boolean} isPlayerInside  - booleano para saber si el jugador esta dentro de la area de interaccion o no
     * @param {Text} text - texto que se va hacer visible cuando esta dentro de una area
     * 
     */
export default class InteractableObjects extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, [texture]);

        this.scene = scene;
        this.canInteract = false;
        this.isPlayerInside = false;

        // Texto de interacci¨®n inicialmente invisible
        this.text = this.scene.add.text(this.x - 10, this.y - 100, 'Presiona E para interactuar', {
            font: '14px Arial',
            fill: '#ffffff',
            backgroundColor: '#000000',
            padding: 4,
        });
        this.text.setVisible(false);

        this.scene.physics.add.existing(this);

        this.interactionArea = new Phaser.Geom.Circle(this.x, this.y, 100);
        this.scene.events.on('Interact', () => { this.onInteract() });
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);

        const playerInRange = Phaser.Geom.Circle.Contains(this.interactionArea, this.scene.player.x, this.scene.player.y);

        if (playerInRange && !this.isPlayerInside) {
            this.onOverlap();
        }
        else if (!playerInRange && this.isPlayerInside) {
            this.onExitOverlap();
        }
    }
    onOverlap() { //entra 
        this.canInteract = true;
        if (this.text) {
            this.text.setVisible(true);
        }
        this.isPlayerInside = true;
    }
    onExitOverlap() { //sale
        this.canInteract = false;
        if (this.text) {
            this.text.setVisible(false);
        }
        this.isPlayerInside = false;
    }
}

