//import Enemy from "./enemy.js";
import Crac from "./crac.js";

export default class Letus extends Crac {
    constructor(scene, x, y, player, exp) {
        // hereda de enemy
        super(scene, x, y, player, 'Letus', exp);
        this.scene = scene;
        this.player = player;
        this.scene.add.existing(this);
        this.init(0, 500, 5, 2, 0);

        //hereda de Crac
        this.cooldownCont = 0;

    }
    init(speedFactor, shootSpeed, life, damage, prob) {
        super.init(speedFactor, shootSpeed, life, damage, prob);
    }
    preUpdate(t, dt) {
        super.preUpdate(t, dt);
    }
}