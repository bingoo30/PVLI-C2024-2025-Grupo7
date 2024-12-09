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
export default class Mutum extends Enemy {
    constructor(scene, x, y, player, exp, pool) {
        super(scene, x, y, player, 'Mutum', exp);
        this.AreaDamageRange = 100;
        this.AreaDamage = 0.3;  
        this.duration = 3;      
        this.scene.add.existing(this);
        this.damageArea = null;
        this.pool = pool;
        console.log(this.pool);

        this.isMutum = true;
        this.init(50, 0, 2, 2, 0);
    }
    init(speedFactor, shootSpeed, life, damage, prob) {
        super.init(speedFactor, shootSpeed, life, damage, prob);
        this.play('MutumIdle');
    }
    onDeath() {
        this.createDamageArea();
    }
    createDamageArea() {
        if (!this.damageArea) {
            this.damageArea = this.pool.spawn(this.x, this.y);
            this.damageArea.reset(this.AreaDamageRange, this.AreaDamage, this.duration);
            const sfx = this.scene.sound.add('enemyAreaAudio');
            sfx.play();
        }

        super.onDeath();
    }

}