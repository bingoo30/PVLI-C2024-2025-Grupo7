import { Vector } from "matter";

//constantes por defecto
const DEFAULT_LIFE = 10;
const DEFAULT_SPEED = 1;
const DEFAULT_SPEEDFACTOR = 400;
const DEFAULT_DAMAGE = 1;
const DEFAULT_SHOOTSPEED = 1;
const DEFAULT_CRIT = 0;
export default class character extends Phaser.GameObjects.Sprite {
    /**
     * 
     * @param {Phaser.Scene} scene La escena del juego
     * @param {number} x Posici�n X
     * @param {number} y Posici�n Y
     * @param {number} life Vida del personaje
     * @param {number} damage Da�o que inflige el personaje
     * @param {Vector} speed direccion del movimiento
     * @param {number} speedFactor Velocidad de movimiento
     * @param {number} shootspeed Velocidad de disparo
     * @param {number} prob Probabilidad de ataque cr�tico
     */
    constructor(scene, x, y, life, damage, speed, speedFactor, shootSpeed, prob) {
        super(scene, x, y, 'character');
        // Lo agrego a la escena
        scene.add.existing(this);
        // Agregamos fisicas
        scene.physics.add.existing(this);

        // Inicializar las propiedades
        this.speed = speed || DEFAULT_SPEED;
        this.speedFactor = speedFactor || DEFAULT_SPEEDFACTOR;
        this.shootSpeed = shootSpeed ||DEFAULT_SHOOTSPEED;
        this.life = life || DEFAULT_LIFE;
        this.damage = damage || DEFAULT_DAMAGE;
        this.prob = prob || DEFAULT_CRIT;
    }
}
