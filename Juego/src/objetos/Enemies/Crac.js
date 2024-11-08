import Enemy from './enemy.js';

export default class Crac extends Enemy {
	constructor(scene, x, y, player) {
		super(scene, x, y, player, 'Crac');
		this.init(85, 100, 7, 7, 0);
	}
	init(speedFactor, shootSpeed, life, damage, prob) {
		super.init(speedFactor, shootSpeed, life, damage, prob);
	}
	preUpdate(t, dt) {
		super.preUpdate(t, dt);
	}
}