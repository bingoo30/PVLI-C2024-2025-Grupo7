import Coin from "./coin.js";

export default class Drop{

}

export function drop(scene, x, y, exp) {
	new Coin(scene, x, y);
}