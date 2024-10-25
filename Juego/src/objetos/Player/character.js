//constantes por defecto
const DEFAULT_LIFE = 10;
const DEFAULT_COOLDOWN = 1000;
const DEFAULT_SPEED = new Phaser.Math.Vector2(0,0);
const DEFAULT_SPEEDFACTOR = 400;
const DEFAULT_DAMAGE = 1;
const DEFAULT_SHOOTSPEED = 1;
const DEFAULT_CRIT = 0;

/**
     * @extends Phaser.GameObjects.Sprite
     
     * @param {Phaser.Scene} scene La escena del juego
     * @param {number} x Posici�n X
     * @param {number} y Posici�n Y
     * @param {number} life Vida del personaje
     * @param {number} damage Da�o que inflige el personaje
     * @param {Phaser.Math.Vector2} speed direccion del movimiento
     * @param {number} speedFactor Velocidad de movimiento
     * @param {number} shootspeed Velocidad de disparo
     * @param {number} prob Probabilidad de ataque cr�tico
     */
export default class Character extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, type) {
        super(scene, x, y, [type]);
        this.scene.add.existing(this);
        // Inicializar las propiedades por defecto
        this.speed = DEFAULT_SPEED;
        this.speedFactor = DEFAULT_SPEEDFACTOR;
        this.shootSpeed = DEFAULT_SHOOTSPEED;
        this.life = DEFAULT_LIFE;
        this.damage = DEFAULT_DAMAGE;
        this.prob = DEFAULT_CRIT;
    }
    onGotHit(damageTaken) {
        if (this.life > 0) {
            this.life -= damageTaken;
        }
        if (this.life <= 0) {
            //llamar metodo muerto
        }
    }
    /**
     * Funci�n para restar vida
     * Para que no sea negativo cojo el maximo entre la resta y el 0
     */
    reduceLife(amount) {
        this.life = Math.max(0, this.life - amount);
    }

    characterShoot() {
        console.log("pum pum");
    }
}
