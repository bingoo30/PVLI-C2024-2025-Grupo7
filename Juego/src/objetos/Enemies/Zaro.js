import Enemy from "./enemy.js";


const TELEPORT_RANGE = 700;
const TELEPORT_COOLDOWN = 3000; 

export default class Zaro extends Enemy {
    constructor(scene, x, y, player, exp) {
        super(scene, x, y, player, "Zaro",exp);
        this.scene = scene;
        this.player = player;
        this.scene.add.existing(this);
        this.init(0, 500, 5, 2, 0);
        this.teleportCont = 3000;
    }
    init(speedFactor, shootSpeed, life, damage, prob) {
        super.init(speedFactor, shootSpeed, life, damage, prob);
    }
    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        /**
         * if(this.getDistance() < TELEPORT_RANGE && this.teleportCont < 0){
            console.log("jsdfnajfn");

            this.teleportCont = TELEPORT_COOLDOWN;
        }

        this.teleportCont = this.teleportCont - dt;
         */
    }
}