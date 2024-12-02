import Enemy from "./enemy.js";
import DamageArea from '../abilities/area_damage/damage_area.js'

/**
 * Constructor de Area de daño
 * @param {Scene} scene - escena en la que aparece
 * @param {number} damage - daño que hace la bala
 * @param {number} x - ejeX inicial
 * @param {number} y- ejeY inical
 * @param {number} damageRange - radio del area
 * @param {number} duration - duracion del area
 */
export default class Estaka extends Enemy {
    constructor(scene, x, y, player, exp, pool) {
        super(scene, x, y, player, 'Mutum', exp);
        this.player = player;
        this.damageRange = 100;
        this.damage = 0.1;
        this.duration = 1;
        this.scene.add.existing(this);
        this.damageArea = null;
        this.pool = pool;

        this.init(30, 0, 2, 2, 0);
        this.timer = this.scene.time.addEvent({
            delay: 3000,
            callback: this.createDamageArea,
            callbackScope: this,
            loop: true
        });
    }
    init(speedFactor, shootSpeed, life, damage, prob) {
        super.init(speedFactor, shootSpeed, life, damage, prob);
    }
    onDeath() {
        this.timer.remove(); 
        this.timer = null;
        super.onDeath();
    }
    createDamageArea() {
        this.damageArea = this.pool.spawn(this.x, this.y);
        this.damageArea.reset(this.damageRange, this.damage, this.duration);
    }

}
