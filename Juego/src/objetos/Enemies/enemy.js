//import character from "./character.js";

/**
 * @extends character
 * Constructor de Player, nuestro caballero medieval con espada y escudo
	 * @param {Scene} scene - escena en la que aparece
	 * @param {number} x - coordenada x
	 * @param {number} y - coordenada y
 */
export default class Enemy extends Phaser.GameObjects.Sprite {
    /**
     * Constructor de Player, nuestro caballero medieval con espada y escudo
     * @param {Scene} scene - escena en la que aparece
     * @param {number} x - coordenada x
     * @param {number} y - coordenada y
    */
    constructor(scene, x, y, target) {
        super(scene, x, y, 'Player', 0);
        this.scene = scene;

        //heredo de la clase character
        //this.character = character;
        this.target = target;
        console.log("Enemy target:", this.target);
        //this.speed = new Phaser.Math.Vector2(0,0);
        this.speedFactor = 400;
        //lo añado a la escena
        this.scene.add.existing(this);
        this.speed = 100;
        // Agregamos fisicas
        scene.physics.add.existing(this);
        this.body.setCollideWorldBounds();

        this.body.setSize(16,8);
        this.body.setOffset(8,24);


    }

    setTarget(target) {
        this.target = target;
        //console.log("Target set to:", this.target);
    }


    /**
     * Bucle principal del personaje, actualizamos su posición y ejecutamos acciones según el Input
     * @param {number} t - Tiempo total
     * @param {number} dt - Tiempo entre frames
     */
    preUpdate(t, dt) {
        super.preUpdate(t, dt);


        //this.speed *= this.speedFactor;

        if (this.target && this.target.x !== undefined && this.target.y !== undefined) {
            
            const distX = this.target.x - this.x; // distancia en la x
            const distY = this.target.y - this.y; // distancia en la y 
            const distance = Math.sqrt(distX * distX + distY * distY); 

            if (distance > 100) {
                const angle = Math.atan2(distY, distX);
                this.body.setVelocityX(Math.cos(angle) * this.speed);
                this.body.setVelocityY(Math.sin(angle) * this.speed);
            } else {
                this.body.setVelocity(0, 0);
            }
        } else {
            // Log error if target is not valid
            //console.log("Enemy target not defined or invalid.");
        }
        //this.body.setVelocity(this.speed.x * this.speedFactor, this.speed.y * this.speedFactor);
    }
}