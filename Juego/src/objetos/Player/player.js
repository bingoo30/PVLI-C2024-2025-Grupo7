import character from "./character";

/**
 * @extends character
 * Constructor de Player, nuestro caballero medieval con espada y escudo
	 * @param {Scene} scene - escena en la que aparece
	 * @param {number} x - coordenada x
	 * @param {number} y - coordenada y
 */
export default class Player extends Phaser.GameObjects.Sprite {
    /**
     * Constructor de Player, nuestro caballero medieval con espada y escudo
     * @param {Scene} scene - escena en la que aparece
     * @param {number} x - coordenada x
     * @param {number} y - coordenada y
    */
    constructor(scene, x, y, character) {
        super(scene, x, y, 'Player');

        //(DE MOMENTO LO HAGO TODO EN EL PLAYER)
        //heredo de la clase character
        //this.character = character;
        this.xSpeed = 0;
        this.ySpeed = 0;

        //lo a�ado a la escena
        this.scene.add.existing(this);

        // Agregamos fisicas
        scene.physics.add.existing(this);
        this.body.setCollideWorldBounds();


        //input
        // Seteamos las teclas para mover al personaje
        this.wKey = this.scene.input.keyboard.addKey('W'); //saltar
        this.aKey = this.scene.input.keyboard.addKey('A'); //izquierda
        this.sKey = this.scene.input.keyboard.addKey('S'); //parar animaci�n
        this.dKey = this.scene.input.keyboard.addKey('D'); //derecha

    }

    /**
     * Bucle principal del personaje, actualizamos su posici�n y ejecutamos acciones seg�n el Input
     * @param {number} t - Tiempo total
     * @param {number} dt - Tiempo entre frames
     */
    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        if (this.aKey.isDown) {
            this.xSpeed = -1;
        }
        else if (this.dKey.isDown) {
            this.xSpeed = 1;
        }

        if (this.wKey.isDown) {
            this.ySpeed = 1;
        }
        else if (this.sKey.isDown) {
            this.ySpeed = -1;
        }

        this.body.setVelocity(this.xSpeed, this.ySpeed);
    }
}