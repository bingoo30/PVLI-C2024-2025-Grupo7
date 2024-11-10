import Enemy from './enemy.js';
import { fire } from '../Shooting/shooter.js';

export default class Crac extends Enemy {
	constructor(scene, x, y, player) {
		super(scene, x, y, player, 'Crac');
		this.scene = scene;
        this.player = player;
		this.cooldownCont = 0;
		this.init(85, 1250, 7, 7, 0);
	}
	init(speedFactor, shootSpeed, life, damage, prob) {
		super.init(speedFactor, shootSpeed, life, damage, prob);
	}
	preUpdate(t, dt) {
		super.preUpdate(t, dt);

        if(this.cooldownCont <= 0){
            this.cooldownCont = this.shootSpeed;
            fire(this, this.player, this.scene, this.damage, this.shootSpeed, 'Bala', 4);
        }
        this.cooldownCont = this.cooldownCont - dt;
	}
}