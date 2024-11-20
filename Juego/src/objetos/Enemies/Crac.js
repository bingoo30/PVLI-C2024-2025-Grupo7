import Enemy from './enemy.js';
import { fire } from '../Shooting/shooter.js';

export default class Crac extends Enemy {
	constructor(scene, x, y, player, exp) {
		super(scene, x, y, player, 'Crac', exp);
		this.scene = scene;
        this.player = player;
		this.cooldownCont = 0;
		this.init(85, 500, 3, 1, 0);
	}
	init(speedFactor, shootSpeed, life, damage, prob) {
		super.init(speedFactor, shootSpeed, life, damage, prob);
	}
	preUpdate(t, dt) {
		super.preUpdate(t, dt);

        if(this.cooldownCont <= 0){
            this.cooldownCont = 2000;
            fire(this, this.player, this.damage, this.shootSpeed, 'Bala', 4, this.pool);
        }
        this.cooldownCont = this.cooldownCont - dt;
	}
}