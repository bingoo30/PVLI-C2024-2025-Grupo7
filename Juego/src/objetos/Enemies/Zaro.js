import Crac from './Crac.js';

const TEELEPORT_RANGE = 700;
const TELEPORT_COOLDOWN = 3000; 

export default class Zaro extends Crac {
    constructor(scene, x, y, player, exp, type) {
        super(scene, x, y, player, exp, type);
        this.scene = scene;
        this.player = player;
        this.scene.add.existing(this);
        this.init(0, 500, 5, 2, 0);
    }
    init(speedFactor, shootSpeed, life, damage, prob) {
        super.init(speedFactor, shootSpeed, life, damage, prob);
    }
    preUpdate(t, dt) {
        super.preUpdate(t, dt);
    }
}