import Character from "./character.js";
import Bullet from "../Shooting/bullet.js";

/**
 * @extends character
 * Constructor de Player, nuestro caballero medieval con espada y escudo
	 * @param {Scene} scene - escena en la que aparece
	 * @param {number} x - coordenada x
	 * @param {number} y - coordenada y
 */
export default class Player extends Character {
    constructor(scene, x, y) {
        //heredo de la clase character
        super(scene, x, y, 'Player');

        //(DE MOMENTO LO HAGO TODO EN EL PLAYER)
        //heredo de la clase character
        this.character = 'Player';
        this.speed = new Phaser.Math.Vector2(0,0);
        this.speedFactor = 400;

        //Medidor de tiempo para los disparos


        //lo a�ado a la escena
        this.scene.add.existing(this);
        //añadir a la escena despues de llamar al constructor del character
        this.init(400, 1, 5, 1, 0);

        // Agregamos fisicas
        scene.physics.add.existing(this);
        //this.body.setCollideWorldBounds();

        this.body.setSize(16,8);
        this.body.setOffset(8,24);


        //input
        // Seteamos las teclas para mover al personaje
        this.wKey = this.scene.input.keyboard.addKey('W'); //saltar
        this.aKey = this.scene.input.keyboard.addKey('A'); //izquierda
        this.sKey = this.scene.input.keyboard.addKey('S'); //parar animaci�n
        this.dKey = this.scene.input.keyboard.addKey('D'); //derecha
        
        // Seteamos mouse
        this.mouse = this.scene.input.activePointer;

        // Seteamos

    }
    init(speedFactor, shootSpeed, life, damage, prob) {
        this.speedFactor = speedFactor;
        this.shootSpeed = shootSpeed;
        this.life = life;
        this.damage = damage;
        this.prob = prob;
    }
    /**
     * Bucle principal del personaje, actualizamos su posici�n y ejecutamos acciones seg�n el Input
     * @param {number} t - Tiempo total
     * @param {number} dt - Tiempo entre frames
     */
    preUpdate(t, dt) {
        // Input de teclas
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

       //Input de mouse
       if(this.mouse.leftButtonDown()){
            // Todo esto se debería mover al Shooter
            this.characterShoot();
            //if (this.sCooldown < );


            new Bullet(this.scene, 1, 10, 20, this.x, this.y);  
       }

        this.speed.normalize();
        //this.speed *= this.speedFactor;

        this.body.setVelocity(this.speed.x*this.speedFactor, this.speed.y*this.speedFactor);
    }
}