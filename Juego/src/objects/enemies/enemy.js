import Character from '../../objects/player/character.js';
import { drop } from './drop.js';

const DEFAULT_FOLLOW_RANGE = 400;
export default class Enemy extends Character {
    /**
     * Constructor de los enemigos
     * @param {Scene} scene - escena en la que aparece
     * @param {number} x - coordenada x
     * @param {number} y - coordenada y
     * @param {phaser.Character} type Tipo de character
     * @param {phaser.player} player Jugador (target) a perseguir
     * 
    */
    constructor(scene, x, y, player, typeEnemy, exp = 1) {
        //heredo de la clase character
        super(scene, x, y, [typeEnemy]);
        this.scene = scene;
        this.player = player;
        this.exp = exp;
        scene.physics.add.existing(this);
    
        this.dead = false;
        this.followRange = DEFAULT_FOLLOW_RANGE;

        this.follow = false;
    }


    init(speedFactor, shootSpeed, life, damage, prob) {
        this.speedFactor = speedFactor;
        this.shootSpeed = shootSpeed;
        this.life = life;
        this.damage = damage;
        this.prob = prob;
    }

    moveTowards(targetX, targetY) {
        const angle = Phaser.Math.Angle.Between(this.x, this.y, targetX, targetY);
        const velocity = this.speedFactor * this.scene.physics.world.timeScale;

        this.body.setVelocity(Math.cos(angle) * velocity, Math.sin(angle) * velocity);
    }
    stopMovement() {
        this.body.setVelocity(0, 0); // Detiene al enemigo
    }

    onGotHit(damage, pool) {
        super.onGotHit(damage);
        if (this.life == 0) {
            this.scene.events.emit("IKilledAnEnemy");
            const sfx = this.scene.sound.add('enemyDeadAudio');
            sfx.play();
            drop(this.x, this.y, this.exp, pool);
            this.onDeath();
        }
        else {
            const sfx = this.scene.sound.add('enemyHitAudio');
            sfx.play();
        }
            
    }
    /**
     * Bucle principal del personaje, actualizamos su posición y ejecutamos acciones según el Input
     * @param {number} t - Tiempo total
     * @param {number} dt - Tiempo entre frames
     */
    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        //if (!this.targetPoint) return;
        //console.log("a");
        // Comprobar si ha alcanzado el próximo punto
        //const distanceToTarget = Phaser.Math.Distance.Between(this.x, this.y, this.targetPoint.x, this.targetPoint.y);
        //if (distanceToTarget < 4) {  // Precisión al llegar al punto
        //    this.moveToNextPoint();  // Mover al siguiente punto
        //}
        const distanceToPlayer = Phaser.Math.Distance.Between(this.x, this.y, this.player.x, this.player.y);
        if (distanceToPlayer <= this.followRange) {
            this.moveTowards(this.player.x, this.player.y);

            if (this.x - this.player.x < 0) this.setFlipX(false);
            else this.setFlipX(true);
            this.follow = true;
        } else {
            this.stopMovement();
            this.follow = false;
        }
    }

}