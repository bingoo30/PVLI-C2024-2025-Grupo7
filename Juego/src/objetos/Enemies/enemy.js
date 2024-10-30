import Character from '../../objetos/Player/character.js';
export default class Enemy extends Character {
    /**
     * Constructor de Player, nuestro caballero medieval con espada y escudo
     * @param {Scene} scene - escena en la que aparece
     * @param {number} x - coordenada x
     * @param {number} y - coordenada y
     * @param {string} type Tipo de character
    */
    constructor(scene, x, y, target) {
        //heredo de la clase character
        super(scene, x, y, 'Enemy');
        this.scene = scene;
        this.target = target;
        //console.log("Enemy target:", this.target);
        
        scene.physics.add.existing(this);
        //configurar los atributos correspondientes despues de llamar al constructor del character
        this.init(200, 200, 5, 1, 0);

        this.body.setSize(16,8);
        this.body.setOffset(8,24);

    }
    init(speedFactor, shootSpeed, life, damage, prob) {
        this.speedFactor = speedFactor;
        this.shootSpeed = shootSpeed;
        this.life = life;
        this.damage = damage;
        this.prob = prob;
    }
    setTarget(target) {
        this.target = target;
        //console.log("Target set to:", this.target);
    }
    getDamage() {
        return this.damage;
    }
    onEnemyGotHit(damage) {
        this.onGotHit(damage); // Aplica daño al jugador
    }
    onEnemyDeath() {
        this.onDeath();
    }
    /**
     * Bucle principal del personaje, actualizamos su posición y ejecutamos acciones según el Input
     * @param {number} t - Tiempo total
     * @param {number} dt - Tiempo entre frames
     */
    preUpdate(t, dt) {
        super.preUpdate(t, dt);


        //this.speed *= this.speedFactor;

        if (this.target && this.target.x !== undefined && this.target.y !== undefined) {
            
            const distX = this.target.x - this.x; // distancia en la x
            const distY = this.target.y - this.y; // distancia en la y 
            const distance = Math.sqrt(distX * distX + distY * distY); 

            if (distance > 100) {
                const angle = Math.atan2(distY, distX);
                this.body.setVelocityX(Math.cos(angle) * this.speedFactor);
                this.body.setVelocityY(Math.sin(angle) * this.speedFactor);
            } else {
                this.body.setVelocity(0, 0);
            }
        } else {
            // Log error if target is not valid
            //console.log("Enemy target not defined or invalid.");
        }
    }
}