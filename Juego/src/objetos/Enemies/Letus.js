import Enemy from "./enemy.js";

export default class Letus extends Enemy {
    constructor(scene, x, y, player, exp) {
        super(scene, x, y, player, 'Letus', exp);
        this.scene = scene;
        this.player = player;
        this.scene.add.existing(this);
        this.init(450, 0, 5, 2, 0);

    }
    init(speedFactor, shootSpeed, life, damage, prob) {
        super.init(speedFactor, shootSpeed, life, damage, prob);
    }
    preUpdate(t, dt) {
        super.preUpdate(t, dt);
    }
}