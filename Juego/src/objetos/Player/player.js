import Character from "./character.js";
import { fire } from "../Shooting/shooter.js";
import Inventory from "./Inventory.js";

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
        this.init(400, 1250, 25, 2, 0);

        // Agregamos fisicas
        scene.physics.add.existing(this);
        this.body.setSize(16,8);
        this.body.setOffset(8, 24);
        // Establecer el estado de knockback
        this.isKnockedBack = false;

        // #region Sistema de experiencia
        this.level = 1; 
        this.xpAcumulator = 0;
        this.xpToLevelUp = 2;
        // #endregion

        // inventorios
        this.Inventory = new Inventory(this);
        // #region puntos de control status
        this.statusPoint = 0; //status points restantes
        this.speedFactorStatus = 0;
        this.shootSpeedStatus = 0;
        this.maxLifeStatus = 0;
        this.probStatus = 0;
        this.damageStatus = 0;
        // #endregion

        //input
        // Seteamos las teclas para mover al personaje
        this.wKey = this.scene.input.keyboard.addKey('W'); //saltar
        this.aKey = this.scene.input.keyboard.addKey('A'); //izquierda
        this.sKey = this.scene.input.keyboard.addKey('S'); //parar animaci�n
        this.dKey = this.scene.input.keyboard.addKey('D'); //derecha
        
        // Seteamos mouse
        this.mouse = this.scene.input.activePointer;

        //eventos
        this.scene.events.on("IKilledAnEnemy", () => {
            console.log("i killed it");
            this.Inventory.addKilledEnemies();
        });
    }
    init(speedFactor, shootSpeed, life, damage, prob) {
        this.speedFactor = speedFactor;
        this.shootSpeed = shootSpeed;
        this.life = life;
        this.damage = damage;
        this.prob = prob;
        this.maxLife = life;
    }
    // #region getters para el inventario
    getLvel() {
        return this.level;
    }
    getStatusPoint() {
        return this.statusPoint;
    }
    setKilledEnemy() {
        this.Inventory.addKilledEnemies();
    }
    // #endregion

    getDamage() {
        return this.damage;
    }
    getXpAcu() {
        return this.xpAcumulator;
    }
    getXpToLevelUp() {
        return this.xpToLevelUp;
    }
    onPlayerGotHit(damage) {
        this.onGotHit(damage); // Aplica daño al jugador
        // solo hago el knockback cuando me choco con un enemigo (o no)

    }
    onPlayerCollectedXP(value) {
        this.xpAcumulator += value; 
        //console.log(this.xpAcumulator);
        //console.log(this.xpToLevelUp);
    }

    knockback(strength, attacker) {
        this.isKnockedBack = true;
        // Calcula el vector de dirección
        const directionX = this.x - attacker.x;
        const directionY = this.y - attacker.y;

        // Normaliza la dirección
        let normalized = new Phaser.Math.Vector2(directionX, directionY).normalize();
        //console.log("Knockback speed: " + normalized.x + ", " + normalized.y);
        // Aplica velocidad inicial al cuerpo
        this.body.setVelocity(normalized.x * strength, normalized.y * strength);

        // Detén el movimiento después de un corto tiempo
        this.scene.time.delayedCall(300, () => {
            this.body.setVelocity(0, 0); // Detener después del knockback
            this.isKnockedBack = false;
        });
    }
    levelUp() {
        this.level++;
        this.xpAcumulator = this.xpAcumulator-this.xpToLevelUp;
        this.xpToLevelUp += 1;
        this.maxLife++;
        //console.log(this.xpAcumulator);
        //console.log(this.xpToLevelUp);
        //console.log("me he subido de nivel");
    }
    //funcion para subir un status
    upgrateStatus(status) {
        switch(status){
            case 'speedFactor': {
                this.speedFactorStatus++;
            }
                break;
            case 'shootSpeed': {
                this.shootSpeedStatus++;
            }
                break;
            case 'damage': {
                this.damageStatus++;
            }
                break;
            case 'maxLife': {
                this.maxLifeStatus++;
            }
                break;
            case 'prob': {
                this.probStatus++;
            }
                break;
        }

    }
    /**
     * Bucle principal del personaje, actualizamos su posici�n y ejecutamos acciones seg�n el Input
     * @param {number} t - Tiempo total
     * @param {number} dt - Tiempo entre frames
     */
    preUpdate(t, dt) {
        if (this.scene.isGamePaused) { return; }
        if (this.isKnockedBack) {
            return;
        }
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