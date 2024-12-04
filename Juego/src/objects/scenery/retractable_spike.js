import Obstacle from "./obstacle.js";

const RETRACTABLE_SPIKE_DAMAGE = 5;
const DEFAULT_SWAPPING_COOLDOWN = 1000;
/**
* @extends Obstacle
*/
//pinchos estaticos
export default class Retractable_Spike extends Obstacle {
    constructor(scene, x, y) {
        super(scene, x, y, "Retractable_Spikes");
        this.scene.physics.add.existing(this);
        this.timer = DEFAULT_SWAPPING_COOLDOWN;
        this.spikesRised = false;
        //this.body.setSize(16, 8);
        //this.body.setOffset(8, 24);
        this.init(RETRACTABLE_SPIKE_DAMAGE);
    }
    init(damage) {
        super.init(damage);
    }
    
    preUpdate(t, dt) {
        if(this.timer < 0) {
            this.spikesRised = !this.spikesRised;
            this.timer = DEFAULT_SWAPPING_COOLDOWN;
        }

        this.timer = this.timer - dt;
    }
}