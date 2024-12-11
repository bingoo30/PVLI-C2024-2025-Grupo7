import Obstacle from "./obstacle.js";

const SPIKE_DAMAGE = 5;
/**
* @extends Obstacle
*/
//pinchos estaticos
export default class Spike extends Obstacle {
    constructor(scene, x, y) {
        super(scene, x, y, "Spike");
        this.init(SPIKE_DAMAGE);
    }

    init(damage) {
        super.init(damage);
    }
}