import Enemy from "./enemy.js";
/** 
 * Enemigo basico
 * @extends Enemy
 */
export default class Bob extends Enemy{
    constructor(scene, x, y, player, exp){
        super(scene, x, y, player, 'Bob', exp);
        this.scene.add.existing(this);
        this.init(100, 0, 5, 1, 0);

    }
    init(speedFactor, shootSpeed, life, damage, prob) {
        super.init(speedFactor, shootSpeed, life, damage, prob);
        this.play('BobIdle');
    }
}