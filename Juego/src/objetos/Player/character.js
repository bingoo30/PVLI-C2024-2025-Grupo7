//constantes por defecto
const DEFAULT_LIFE = 10;
const DEFAULT_SPEED = 1;
const DEFAULT_COOLDOWN = 1000;
const DEFAULT_DAMAGE = 1;
const DEFAULT_SHOOTSPEED = 1;
const DEFAULT_CRIT = 0;
export default class character extends Phaser.GameObjects.Sprite {
    /**
     * 
     * @param {Phaser.Scene} scene La escena del juego
     * @param {number} x Posici�n X
     * @param {number} y Posici�n Y
     * @param {number} [life=DEFAULT_LIFE] Vida del personaje
     * @param {number} [damage=DEFAULT_DAMAGE] Da�o que inflige el personaje
     * @param {number} [velocidad=DEFAULT_SPEED] Velocidad de movimiento
     * @param {number} [fDisparo=DEFAULT_SHOOTSPEED] Velocidad de disparo
     * @param {number} [prob=DEFAULT_CRIT] Probabilidad de ataque cr�tico
     * @param {number} [sCooldown=DEFAULT_COOLDOWN] Tiempo mínimo entre disparos
     */
    constructor(scene, x, y,
        life = DEFAULT_LIFE,
        damage = DEFAULT_DAMAGE,
        velocidad = DEFAULT_SPEED,
        fDisparo = DEFAULT_SHOOTSPEED,
        sCooldown = DEFAULT_COOLDOWN,
        prob = DEFAULT_CRIT) {
        super(scene, x, y, 'character');
        scene.add.existing(this);
        this.characterShoot();

        
        // Inicializar las propiedades
        this.life = life;
        this.damage = damage; 
        this.velocidad = velocidad;
        this.fDisparo = fDisparo;
        this.prob = prob;
        this.sCooldown = this.sCooldown;
    }
    /**
     * M�todo gen�rico para incrementar el valor de un atributo espec�fico
     * 
     * @param {string} attribute El nombre del atributo a modificar.
     * @param {number} amount La cantidad a incrementar.
     */
    incrementAttribute(attribute, amount) {
        if (this.hasOwnProperty(attribute) && typeof this[attribute] === 'number') {
            this[attribute] += amount;
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
