import Character from "./character.js";
import { fire } from "../Shooting/shooter.js";

/**
 * @extends Character
 * Constructor de Player, nuestro caballero medieval con espada y escudo
	 * @param {Scene} scene - escena en la que aparece
	 * @param {number} x - coordenada x
	 * @param {number} y - coordenada y
 */
export default class Player extends Character {
    constructor(scene, x, y) {
        //heredo de la clase character
        super(scene, x, y, 'Player');

        //Medidor de tiempo para los disparos
        this.cooldownCont = 0;
        this.canShoot = true;

        //lo a�ado a la escena
        this.scene.add.existing(this);
        //configurar los atributos correspondientes despues de llamar al constructor del character
        this.init(400, 1250, 20, 1, 0);

        // Agregamos fisicas
        scene.physics.add.existing(this);
        this.body.setSize(16,8);
        this.body.setOffset(8, 24);

        // #region Sistema de experiencia
        this.level = 1; 
        this.xpAcumulator = 0;
        this.xpToLevelUp = 2;
        // #endregion

        //input
        // Seteamos las teclas para mover al personaje
        this.wKey = this.scene.input.keyboard.addKey('W'); //saltar
        this.aKey = this.scene.input.keyboard.addKey('A'); //izquierda
        this.sKey = this.scene.input.keyboard.addKey('S'); //parar animaci�n
        this.dKey = this.scene.input.keyboard.addKey('D'); //derecha
        
        // Seteamos mouse
        this.mouse = this.scene.input.activePointer;


    }
    init(speedFactor, shootSpeed, life, damage, prob) {
        this.speedFactor = speedFactor;
        this.shootSpeed = shootSpeed;
        this.life = life;
        this.damage = damage;
        this.prob = prob;
        this.maxLife = life;
    }
    getDamage() {
        return this.damage;
    }
    getXpAcu() {
        return this.xpAcumulator;
    }
    getXpToLevelUp() {
        return this.xpToLevelUp;
    }
    onPlayerGotHit(damage, isEnemy) {
        this.onGotHit(damage); // Aplica daño al jugador
        //solo hago el knockback cuando me choco con un enemigo (o no)
        //if (isEnemy && !this) this.knockback(isEnemy, 200);
    }
    onPlayerCollectedXP(value) {
        this.xpAcumulator += value; 
    }
    knockback(enemy,value) {
        // Calcular la dirección de empuje en la dirección opuesta al enemigo
        const directionX = this.x - enemy.x;
        const directionY = this.y - enemy.y;
        let dir = new Phaser.Math.Vector2(directionX, directionY);
        dir.normalize();
        // Aplicar el knockback en esa dirección usando `setVelocity`
        this.body.setVelocity(
            dir.x * value,
            dir.y * value
        );

        //Detener el movimiento después de un corto periodo para que el knockback no sea indefinido
        //this.scene.time.delayedCall(200, () => {
        //    this.body.setVelocity(0); // Detener al jugador después del knockback
        //});
    }
    levelUp() {
        this.level++;
        this.xpAcumulator = this.xpAcumulator-this.xpToLevelUp;
        this.xpToLevelUp += 1;
        this.maxLife++;
        console.log("me he subido de nivel");
    }
    /**
     * Bucle principal del personaje, actualizamos su posici�n y ejecutamos acciones seg�n el Input
     * @param {number} t - Tiempo total
     * @param {number} dt - Tiempo entre frames
     */
    preUpdate(t, dt) {
        // Input de teclas
        super.preUpdate(t, dt);
        if (this.aKey.isDown) {
            this.speed.x = -1;
        }
        else if (this.dKey.isDown) {
            this.speed.x = 1;
        }
        else this.speed.x = 0;

        if (this.wKey.isDown) {
            this.speed.y = -1;
        }
        else if (this.sKey.isDown) {
            this.speed.y = 1;
        }
        else this.speed.y = 0;

       //Input de mouse
       if(this.mouse.leftButtonDown()){
            // Todo esto se debería mover al Shooter
           if (this.cooldownCont < 0) {
               let target = new Phaser.Math.Vector2(this.mouse.x + this.scene.cameras.main.scrollX, this.mouse.y + this.scene.cameras.main.scrollY);
               // Calcula la dirección desde el personaje hacia el cursor
               //let direction = new Phaser.Math.Vector2(target.x - this.x, target.y - this.y).normalize();
               fire(this, target, this.damage, this.shootSpeed, 'Bala2', 4, this.pool);
               this.cooldownCont = this.shootSpeed;
            }
       }

       this.cooldownCont = this.cooldownCont - dt;

       this.speed.normalize();

       this.body.setVelocity(this.speed.x*this.speedFactor, this.speed.y*this.speedFactor);
    }
}