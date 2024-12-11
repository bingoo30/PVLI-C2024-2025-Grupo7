import Enemy from "./enemy.js";
/** 
 * Enemigo basico
 * @extends Enemy
 */
export default class Letus extends Enemy {
    constructor(scene, x, y, player, exp, life, damage) {
        super(scene, x, y, player, 'Letus', exp);
        this.scene.add.existing(this);
        this.init(100, 0, life, damage, 0);
    }
    init(speedFactor, shootSpeed, life, damage, prob) {
        super.init(speedFactor, shootSpeed, life, damage, prob);
        this.play('LetusIdle');
    }
}