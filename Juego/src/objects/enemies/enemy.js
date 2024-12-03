import Character from '../../objects/player/character.js';
import { drop } from './drop.js';

const DEFAULT_FOLLOW_RANGE = 500;
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
    constructor(scene, x, y, player, typeEnemy, exp =1) {
        //heredo de la clase character
        super(scene, x, y, [typeEnemy]);
        this.scene = scene;
        this.player = player;
        this.exp =exp;
        this.navMesh = scene.navMesh;
        scene.physics.add.existing(this);
        this.currentPath = [];
        this.targetPoint = null;  // Próximo punto objetivo
        //configurar los atributos correspondientes despues de llamar al constructor del character
        this.currentNode = { x: x, y: y };
        //this.body.setSize(16,8);
        //this.body.setOffset(8, 24);
        this.path = [];
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

    onGotHit(damage, pool) {
        super.onGotHit(damage);
        if (this.life == 0) {
            this.scene.events.emit("IKilledAnEnemy");
            drop(this.x, this.y, this.exp, pool);
            this.onDeath();
        }
            
    }
    /**
     * Bucle principal del personaje, actualizamos su posición y ejecutamos acciones según el Input
     * @param {number} t - Tiempo total
     * @param {number} dt - Tiempo entre frames
     */
    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        if (this.scene.isGamePaused) return; 
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
            this.follow = true;
        } else {
            this.stopMovement();
            this.follow = false;
        }
    }


    // Método para moverse hacia una posición específica
    moveTowards(targetX, targetY) {
        const angle = Phaser.Math.Angle.Between(this.x, this.y, targetX, targetY);
        const velocity = this.speedFactor * this.scene.physics.world.timeScale;

        this.body.setVelocity(Math.cos(angle) * velocity, Math.sin(angle) * velocity);
    }

    // Método para detener el movimiento del enemigo
    stopMovement() {
        this.body.setVelocity(0, 0); // Detiene al enemigo
    }

    setPath(path) {
        // Establece el camino calculado con EasyStar
        this.currentPath = path;
        this.moveToNextPoint();  // Inicia el movimiento hacia el primer punto
    }

    moveToNextPoint() {
        if (this.currentPath.length === 0) {
            // Si no hay más puntos, detén el movimiento
            this.body.setVelocity(0, 0);
            return;
        }


        // Siguiente paso en la ruta
        const nextStep = this.currentPath.shift();
        if (!nextStep) return;
        if (this.dead) return;
        if (!this.targetPoint) return;

        // Comprobar si ha alcanzado el próximo punto
        const distanceToTarget = Phaser.Math.Distance.Between(this.x, this.y, this.targetPoint.x, this.targetPoint.y);
        if (distanceToTarget < 4) {  // Precisión al llegar al punto
            this.moveToNextPoint();  // Mover al siguiente punto
        }

    }

    moveToNextPoint() {
        if (this.currentPath.length === 0) {
            // Si no hay más puntos, detén el movimiento
            this.body.setVelocity(0, 0);
            return;
        }

        // Siguiente paso en la ruta
        const nextStep = this.currentPath.shift();
        if (!nextStep) return;

        // Convertir coordenadas de tiles a coordenadas del mundo
        const targetX = this.scene.map.tileToWorldX(nextStep.x) + this.scene.map.tileWidth * 0.5;
        const targetY = this.scene.map.tileToWorldY(nextStep.y) + this.scene.map.tileHeight * 0.5;

        // Calcular la dirección hacia el próximo punto
        const directionX = targetX - this.x;
        const directionY = targetY - this.y;
        const distance = Math.sqrt(directionX * directionX + directionY * directionY);

        // Normalizar la dirección y establecer la velocidad
        this.body.setVelocity((directionX / distance) * this.speed, (directionY / distance) * this.speed);

        // Guardar el punto de destino actual
        this.targetPoint = { x: targetX, y: targetY };
    }
}