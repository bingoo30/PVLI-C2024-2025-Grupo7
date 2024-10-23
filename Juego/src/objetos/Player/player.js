import character from "./character.js";

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

        this.speed = new Phaser.Math.Vector2(0,0);
        this.speedFactor = 100;
        //lo añado a la escena
        this.scene.add.existing(this);

        // Agregamos fisicas
        scene.physics.add.existing(this);
        //this.body.setCollideWorldBounds();


        //input
        // Seteamos las teclas para mover al personaje
        this.wKey = this.scene.input.keyboard.addKey('W'); //saltar
        this.aKey = this.scene.input.keyboard.addKey('A'); //izquierda
        this.sKey = this.scene.input.keyboard.addKey('S'); //parar animación
        this.dKey = this.scene.input.keyboard.addKey('D'); //derecha

    }

    /**
     * Bucle principal del personaje, actualizamos su posición y ejecutamos acciones según el Input
     * @param {number} t - Tiempo total
     * @param {number} dt - Tiempo entre frames
     */
    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        if (this.aKey.isDown) {
            this.speed.x = -1;
        }
        else if (this.dKey.isDown) {
            this.speed.x = 1;
        }
        else this.speed.x = 0;

        if (this.wKey.isDown) {
            this.speed.y = -1;
        }
        else if (this.sKey.isDown) {
            this.speed.y = 1;
        }
        else this.speed.y = 0;

        this.speed.normalize();
        //this.speed *= this.speedFactor;


        this.body.setVelocity(this.speed.x*this.speedFactor, this.speed.y*this.speedFactor);
    }
}