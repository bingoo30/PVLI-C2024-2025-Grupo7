export function drop(x, y, exp, lifeRec, pool, pool2) {
	let coin = pool.spawn(x, y);
	coin.setExp(exp);

	var value = Phaser.Math.Between(1, 2);
	if (value==2) {
		let plant = pool2.spawn(x + 20, y + 20);
		plant.setLifeRec(lifeRec);
	}
}
