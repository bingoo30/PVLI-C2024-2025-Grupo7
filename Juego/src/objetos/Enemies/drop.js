

export function drop(x, y, exp, pool) {
	let coin = pool.spawn(x, y);
	coin.setExp(exp);
}