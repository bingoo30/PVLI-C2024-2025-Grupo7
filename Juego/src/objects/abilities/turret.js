import Character from "../player/character.js";
import { fire } from "../abilities/shooting/fire.js";

const DEFAULT_TURRET_SHOOTING_SPEED = 2000;
const DEFAULT_TURRET_SHOOTING_RANGE = 700;
const DEFAULT_TURRET_DAMAGE = 1;
const DEFAULT_TURRET_BULLET_SPEED = 300;

export default class Turret extends Character {
    /**
     * Constructor de la torreta
     * @param {Scene} scene - escena en la que aparece
     * @param {number} x - coordenada x
     * @param {number} y - coordenada y
     * 
    */

    constructor(scene, x, y, Enemies) {
        //heredo de la clase character
        super(scene, x, y, 'Turret');
        this.scene = scene;
        this.target = null;
        //this.navMesh = scene.navMesh;
        scene.physics.add.existing(this);
        //this.currentPath = [];
        this.targetPoint = null;  // Próximo punto objetivo
        //configurar los atributos correspondientes despues de llamar al constructor del character
        this.currentNode = { x: x, y: y };
        this.dead = false;
        this.shootCooldown = DEFAULT_TURRET_SHOOTING_SPEED;
        this.shootingRange = DEFAULT_TURRET_SHOOTING_RANGE;
        this.damage = DEFAULT_TURRET_DAMAGE;
        this.enemies = Enemies
        this.cooldownCont = 0;
        this.bulletSpeed = DEFAULT_TURRET_BULLET_SPEED;
    }

    preUpdate(t, dt) {
		super.preUpdate(t, dt);

        if(this.cooldownCont <= 0 && this.getClosestEnemy()){
            this.cooldownCont = this.shootCooldown;
            fire(this, this.target, this.damage, this.shootCooldown, 'Bala', 4, this.pool, 1, 0, 0);
            console.log('pium');
        }
        this.cooldownCont = this.cooldownCont - dt;
        //if(!this.getClosestEnemy()) console.log("heya heya");
	}

    getDistance(targetToCheck) {
		var p1 = this.x - targetToCheck.x;
		var p2 = this.y - targetToCheck.y;

		return Math.sqrt(p1*p1 + p2*p2);
	}

    getClosestEnemy() {
        this.currentBest = this.shootingRange;
        this.res = false;

        this.enemies.forEach((enemyCandidate) => {
            if(this.getDistance(enemyCandidate) <= this.currentBest) {
                this.res = true;
                this.target = enemyCandidate;
            }
        });

        return this.res;
    }
}