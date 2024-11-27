import Enemy from "./enemy.js";
import { fire } from '../Shooting/shooter.js';

const SHOOTING_RANGE = 700;
const SHOOTING_COOLDOWN = 2000;
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
        this.shootCont = 0;
    }
    init(speedFactor, shootSpeed, life, damage, prob) {
        super.init(speedFactor, shootSpeed, life, damage, prob);
    }
    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        
        if(this.shootCont <= 0 && this.getDistance() < SHOOTING_RANGE){
            this.shootCont = SHOOTING_COOLDOWN;
            fire(this, this.player, this.damage, this.shootSpeed, 'Bala', 4, this.pool);
        }
        this.shootCont = this.shootCont - dt;

        if(this.getDistance() < TELEPORT_RANGE && this.teleportCont < 0){
            console.log("jsdfnajfn");

            this.teleportCont = TELEPORT_COOLDOWN;
        }

        this.teleportCont = this.teleportCont - dt;
         
    }

    getDistance(){
		var p1 = this.x - this.player.x;
		var p2 = this.y - this.player.y;

		return Math.sqrt(p1*p1 + p2*p2);
	}
}