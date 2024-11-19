import { drop } from "../Enemies/drop.js";


//constantes por defecto
const DEFAULT_LIFE = 10;
const DEFAULT_COOLDOWN = 1000;
const DEFAULT_SPEED = new Phaser.Math.Vector2(0,0);
const DEFAULT_SPEEDFACTOR = 400;
const DEFAULT_DAMAGE = 1;
const DEFAULT_SHOOTSPEED = 10;
const DEFAULT_CRIT = 0;

/**
     * @extends Phaser.GameObjects.Sprite
     Lo que recibe
     * @param {Phaser.Scene} scene La escena del juego
     * @param {number} x Posici�n X
     * @param {number} y Posici�n Y
     atributos
     * @param {number} _life Vida del personaje
     * @param {number} _damage Da�o que inflige el personaje
     * @param {Phaser.Math.Vector2} _speed direccion del movimiento
     * @param {number} _speedFactor Velocidad de movimiento
     * @param {number} _shootspeed Velocidad de disparo
     * @param {number} _prob Probabilidad de ataque cr�tico
     */
export default class Character extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, type) {
        super(scene, x, y, [type]);
        this.scene.add.existing(this);
        // Inicializar las propiedades por defecto
        this.type = type;
        this.speed = DEFAULT_SPEED;
        this.speedFactor = DEFAULT_SPEEDFACTOR;
        this.shootSpeed = DEFAULT_SHOOTSPEED;
        this.life = DEFAULT_LIFE;
        this.damage = DEFAULT_DAMAGE;
        this.prob = DEFAULT_CRIT;
        this.pool = null;
    }
    getSpeed() {
        return this.speed;
    }
    getDamage() {
        return this.damage;
    }
    /* #region getters
    get speedFactor() {
        return this._speedFactor;
    }
    get damage() {
        return this._damage;
    }
    get life() {
        return this._life;
    }
    get type() {
        return this._type;
    }
    get prob() {
        return this._prob;
    }
    // #endregion */

    // #region metodos
    /** 
     * Funcion para restar vida
     * Para que no sea negativo cojo el maximo entre la resta y el 0
     * @param {number} damageTaken Daño que va a recibir
     */
    onGotHit(damageTaken, xp, pool) {
        this.life = Math.max(0, this.life - damageTaken);
        if (this.life == 0) {
            if (this.type == 'Player') this.scene.changeScene();
            //solo le paso el valor de xp cuando es un enemigo
            else if (xp !== undefined) {
                drop(this.x, this.y, xp, pool);
            }
            this.onDeath();
        }
    }
    onDeath() {
        //console.log(`${this.texture.key} ha muerto`);
        this.destroy(); // Elimina el objeto de la escena
    }
    setPool(pool) {
        this.pool = pool;
    }
    // #endregion
}
