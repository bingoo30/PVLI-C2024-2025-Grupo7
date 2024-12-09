import Obstacle from "./obstacle.js";

const SPIKE_DAMAGE = 5;
/**
* @extends Obstacle
*/
//pinchos estaticos
export default class Statue extends Obstacle {
    constructor(scene, x, y) {
        super(scene, x, y, "Spike");
        this.scene.physics.add.existing(this);
        this.init(SPIKE_DAMAGE);
    }

    init(damage) {
        super.init(damage);
    }

    preUpdate(t, dt) {
        this.body.setVelocity(0,0);
    }
}