import { fire } from "../abilities/shooting/fire.js";

const DEFAULT_DRONE_SHOOTING_SPEED = 1500;
const DEFAULT_DRONE_SHOOTING_RANGE = 400;
const DEFAULT_DRONE_BULLET_SPEED = 1000;
const DEFAULT_DAMAGE = 1;


export default class Drone extends Phaser.GameObjects.Sprite {
    /**
     * Constructor de la torreta
     * @param {Scene} scene - escena en la que aparece
     * @param {number} x - coordenada x
     * @param {number} y - coordenada y
     * @param {object} player -referencia del player
     * @param {object} Enemies - grupo de enemigos
     * 
    */
    constructor(scene, x, y, player, Enemies, pool) {
        super(scene, x-50, y-10, 'Drone');
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.setScale(0.05);
        this.target = null;
        this.player = player;
        this.pool = pool;

        this.shootCooldown = DEFAULT_DRONE_SHOOTING_SPEED;
        this.shootingRange = DEFAULT_DRONE_SHOOTING_RANGE;
        this.damage = DEFAULT_DAMAGE;
        this.enemies = Enemies
        this.cooldownCont = 0;
        this.bulletSpeed = DEFAULT_DRONE_BULLET_SPEED;

        this.setDepth(2);
    }
    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        this.followPlayer();
        //solo empieza a atacar cuando es visible
        if (this.visible) {
            if (this.cooldownCont <= 0 && this.getClosestEnemy()) {
                this.cooldownCont = this.shootCooldown;
                fire(this, this.target, this.damage, this.bulletSpeed, 'Bala', 4, this.pool, 1, this.player.prob, 1.5);
                const sfx = this.scene.sound.add('playerAttackAudio');
                sfx.setVolume(0.35); // Cambiar el volumen dinámicamente
                sfx.play();
            }
            this.cooldownCont = this.cooldownCont - dt;
        }
    }

    getDistance(targetToCheck) {
        var p1 = this.x - targetToCheck.x;
        var p2 = this.y - targetToCheck.y;

        return Math.sqrt(p1 * p1 + p2 * p2);
    }

    getClosestEnemy() {
        this.currentBest = this.shootingRange;
        this.res = false;

        // Acceder al array de enemigos en el grupo
        const enemiesArray = this.enemies.getChildren();

        enemiesArray.forEach((enemyCandidate) => {
            if (this.getDistance(enemyCandidate) <= this.currentBest) {
                this.res = true;
                this.target = enemyCandidate;
            }
        });

        return this.res;
    }
    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }
    setDamage(damage) {
        this.damage = damage;
    }
    setBulletSpeed(speed) {
        this.bulletSpeed = speed;
    }
    /**
 * Método para mover al dron hacia el jugador si está fuera de rango.
 */
    followPlayer() {
        const distanceToPlayer = this.getDistance(this.player);
        const minDistance = 100; // Distancia mínima para detenerse

        if (distanceToPlayer > minDistance) {
            // Calcular dirección hacia el jugador
            const directionX = this.player.x - this.x;
            const directionY = this.player.y - this.y;

            // Normalizar el vector de dirección
            const magnitude = Math.sqrt(directionX * directionX + directionY * directionY);
            const normalizedDirectionX = directionX / magnitude;
            const normalizedDirectionY = directionY / magnitude;

            // Ajustar la velocidad del dron
            const speed = this.player.speedFactor; // Velocidad de movimiento
            this.body.setVelocity(
                normalizedDirectionX * speed,
                normalizedDirectionY * speed
            );
        } else {
            // Detener el movimiento si está dentro de la distancia mínima
            this.body.setVelocity(0);
        }
    }
}