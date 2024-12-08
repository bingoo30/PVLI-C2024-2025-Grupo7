import Enemy from "./enemy.js";
import { fire } from '../abilities/shooting/fire.js';

// Constantes shooter
const SHOOTING_RANGE = 700;
const SHOOTING_COOLDOWN = 2000;
// Constantes teleportacion
const TELEPORT_RANGE = 500;
const TELEPORT_COOLDOWN = 3000;
const TELEPORT_MAX_DISTANCE = 200;

export default class Zaro extends Enemy {
    constructor(scene, x, y, player, exp) {
        super(scene, x, y, player, "Zaro",exp);
        this.scene = scene;
        this.player = player;
        this.randomX = 0;
        this.randomY = 0;
        this.shootCont = 0;

        this.scene.add.existing(this);

        this.init(150, 300, 2, 2, 0);
        let timer = this.scene.time.addEvent({
            delay: 2000,
            callback: this.changeVisible,
            callbackScope: this,
            loop: true
        });

    }
    init(speedFactor, shootSpeed, life, damage, prob) {
        super.init(speedFactor, shootSpeed, life, damage, prob);
        this.play('ZaroIdle');
    }
    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        
        if (this.visible) {
            if (this.shootCont <= 0 && this.getDistance() < SHOOTING_RANGE) {
                this.shootCont = SHOOTING_COOLDOWN;
                fire(this, this.player, this.damage, this.shootSpeed, 'Bala', 4, this.pool, 1);
            }
            this.shootCont = this.shootCont - dt;
            this.randomX = Phaser.Math.Between(-1, 1);
            this.randomY = Phaser.Math.Between(-1, 1);
        }
        else {
            this.body.setVelocity(this.randomX * this.speedFactor, this.randomY * this.speedFactor);
        }

    }
    changeVisible() {
        if (this.visible) this.setVisible(false);
        else this.setVisible(true);
    }
    
    getDistance(){
		var p1 = this.x - this.player.x;
		var p2 = this.y - this.player.y;

		return Math.sqrt(p1*p1 + p2*p2);
    }
    /*
    teleportNearPlayer(dt)
    {
        this.x = (Math.random() * ((this.player.x - TELEPORT_MAX_DISTANCE) - this.player.x + TELEPORT_MAX_DISTANCE)) + (this.player.x - TELEPORT_MAX_DISTANCE);
        this.y = (Math.random() * ((this.player.y - TELEPORT_MAX_DISTANCE) - this.player.y + TELEPORT_MAX_DISTANCE)) + (this.player.y - TELEPORT_MAX_DISTANCE);
        // console.log("Teletransportandome a:" +  this.x + "/" + this.y);
        // console.log("El player está en:" + this.player.x + "/" + this.player.y);
    }
    */
}