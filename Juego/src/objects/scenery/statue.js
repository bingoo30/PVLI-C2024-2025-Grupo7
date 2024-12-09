import Obstacle from "./obstacle.js";
import { fire } from "../abilities/shooting/fire.js";

const STATUE_SHOOT_DAMAGE = 3;
const STATUE_SHOOT_COOLDOWN = 1000;
const STATUE_BULLET_SPEED = 100;
/**
* @extends Obstacle
*/
//estatua tiradora
export default class Statue extends Obstacle {
    constructor(scene, x, y, dir) {
        super(scene, x, y, "Statue");
        this.scene.physics.add.existing(this);
        switch(dir) {
            case 0: // Sur
                //this.target = new Vector(x, y + 100);
                this.target = new Phaser.Math.Vector2(this.x, this.y + 100);
                break;
            case 1: // Este
                this.target = new Phaser.Math.Vector2(this.x + 100, this.y);
                break;
            case 2: // Norte
                //this.target = new Vector(x, y - 100);
                this.target = new Phaser.Math.Vector2(this.x, this.y - 100);
                break;
            case 3: // Oeste
                //this.target = new Vector(x - 100, y);
                this.target = new Phaser.Math.Vector2(this.x - 100, this.y);
                break;
        }
        this.damage = STATUE_SHOOT_DAMAGE;
        this.timer = STATUE_SHOOT_COOLDOWN;
        this.shootSpeed = STATUE_BULLET_SPEED;
        this.init(1);
    }

    init(damage) {
        super.init(damage);
    }

    preUpdate(t, dt) {
        if(this.timer < 0) {
            fire(this, this.target, this.damage, this.shootSpeed, 'Bala', 4, this.pool, 1)
            this.timer = STATUE_SHOOT_COOLDOWN;
        }
        this.timer = this.timer - dt;

        this.body.setVelocity(0,0);
    }

    setPool(pool) {
        this.pool = pool;

    }
}