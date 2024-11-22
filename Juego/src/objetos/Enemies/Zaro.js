import Enemy from "./enemy.js";
import { fire } from '../Shooting/shooter.js';

const SHOOTING_RANGE = 400;
const TEELEPORT_RANGE = 700;
const TELEPORT_COOLDOWN = 3000;
const SHOOTING_COOLDOWN = 2000;

export default class Letus extends Enemy {
    constructor(scene, x, y, player, exp) {
        super(scene, x, y, player, 'Letus', exp);
        this.scene = scene;
        this.player = player;
        this.scene.add.existing(this);
        this.init(450, 0, 5, 2, 0);


    }
    init(speedFactor, shootSpeed, life, damage, prob) {
        super.init(speedFactor, shootSpeed, life, damage, prob);
    }
    preUpdate(t, dt) {
        super.preUpdate(t, dt);
    }
}