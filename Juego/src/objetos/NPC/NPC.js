/**
     * @extends Phaser.GameObjects.Sprite
     Lo que recibe
     * @param {Phaser.Scene} scene La escena del juego
     * @param {number} x - Posici¨®n X
     * @param {number} y - Posici¨®n Y
     * @param {String} texture - key del sprite del NPC
     * @param {String} dialogues - key del dialogo del NPC
     Atributos
     * @param {boolean} isDialogActive  - booleano para saber si esta en dialogo
     * @param {boolean} canInteract  - booleano para saber si se puede interactar el NPC (cuando esta dentro de una area)
     * @param {boolean} isPlayerInside  - booleano para saber si el jugador esta dentro de la area de interaccion o no
     * @param {Text} text - texto que se va hacer visible cuando esta dentro de una area
     * 
     */
export default class NPC extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, dialogues) {
        super(scene, x, y, [texture]);

        this.scene = scene;
        this.dialogues = dialogues;

        this.isDialogActive = false;
        this.canInteract = false;
        this.isPlayerInside = false;

        this.scene.add.existing(this);

        // Texto de interacci¨®n inicialmente invisible
        this.text = this.scene.add.text(this.x - 10, this.y - 70, 'Presiona E para interactuar', {
            font: '16px Arial',
            fill: '#ffffff',
            backgroundColor: '#000000',
            padding: 4,
        });
        this.text.setVisible(false);

        scene.physics.add.existing(this);
        this.body.setSize(16, 8);
        this.body.setOffset(8, 24);

        this.interactionArea = new Phaser.Geom.Circle(this.x, this.y, 100);

        this.eKey = this.scene.input.keyboard.addKey('E'); //interactuar
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);

        if (this.eKey.isDown) {
            this.onInteract();
        }

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

