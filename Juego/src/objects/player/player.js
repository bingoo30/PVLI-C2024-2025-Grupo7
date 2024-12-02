import Character from "./character.js";
import { fire } from "../abilities/shooting/fire.js";
import Inventory from "./inventory.js";

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
        this.bulletNumbers = 1;

        //configurar los atributos correspondientes despues de llamar al constructor del character
        this.init(400, 1250, 30, 2, 0.05);

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
        this.abilityPoint = 1;
        this.speedFactorStatus = 0;
        this.shootSpeedStatus = 0;
        this.maxLifeStatus = 0;
        this.probStatus = 0;
        this.damageStatus = 0;
        // #endregion

        this.setDepth(2);

        //input
        // Seteamos las teclas para mover al personaje
        this.wKey = this.scene.input.keyboard.addKey('W'); //saltar
        this.aKey = this.scene.input.keyboard.addKey('A'); //izquierda
        this.sKey = this.scene.input.keyboard.addKey('S'); //parar animaci�n
        this.dKey = this.scene.input.keyboard.addKey('D'); //derecha
        this.eKey = this.scene.input.keyboard.addKey('E'); //interactuar
        this.pKey = this.scene.input.keyboard.addKey('P'); //activar la escena de logros
        // Seteamos mouse
        this.mouse = this.scene.input.activePointer;

        //eventos
        this.scene.events.on("IKilledAnEnemy", () => {
            //console.log("i killed it");
            this.Inventory.addKilledEnemies();
        });
        this.scene.events.on("playerIsDead", () => {
            this.scene.changeToGameover();
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
    getStatusPoints() {
        return this.statusPoint;
    }
    getAbilityPoints() {
        return this.abilityPoint;
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
    onGotHit(damage) {
        super.onGotHit(damage); // Aplica daño al jugador
        if (this.life == 0) {
            this.scene.events.emit('playerIsDead');
            this.onDeath();
        }

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
        this.statusPoint++;
        this.life = this.maxLife;

        console.log(this.life);

        if (this.level != 0 && (this.level % 3)-1 == 0) this.abilityPoint++;

        console.log("status points:" + this.statusPoint);
        console.log("ability points:" + this.abilityPoint);
    }
    getANewAbility(ability) {
        switch (ability) {
            case 'Juego de proyectiles I':
            case 'Juego de proyectiles II':
            case 'Juego de proyectiles III': {
                console.log("disparar dos veces");
                this.bulletNumbers++;

            }
                break;
            case 'Utilidad I': {
                console.log("invocar dron");
            }
                break;
            default: {
                console.warn(`Habilidad desconocida: ${ability}`);
                return; // Salir si la habilidad no es válida
            }
        }
        this.abilityPoint--
        
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
        this.statusPoint--;
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

        let animationKey = null; // Clave de la animación actual

        // Lógica de movimiento horizontal
        if (this.aKey.isDown) {
            this.speed.x = -1;
            animationKey = 'playerWalkLeft';
        } else if (this.dKey.isDown) {
            this.speed.x = 1;
            animationKey = 'playerWalkRight';
        }
        else this.speed.x = 0;

        // Lógica de movimiento vertical
        if (this.wKey.isDown) {
            this.speed.y = -1;
            animationKey = 'playerWalkUp';
        } else if (this.sKey.isDown) {
            this.speed.y = 1;
            animationKey = 'playerWalkDown';
        }
        else this.speed.y = 0;

        if (this.speed.x === 0 && this.speed.y === 0) {
            switch (this.anims.currentAnim?.key) {
                case 'playerIdleLeft':
                case 'playerWalkLeft':
                    animationKey = 'playerIdleLeft';
                    break;
                case 'playerIdleRight':
                case 'playerWalkRight':
                    animationKey = 'playerIdleRight';
                    break;
                case 'playerIdleUp':
                case 'playerWalkUp':
                    animationKey = 'playerIdleUp';
                    break;
                case 'playerIdleDown':
                case 'playerWalkDown':
                    animationKey = 'playerIdleDown';
                    break;
                default:
                    animationKey = 'playerIdleDown';
                    break;
            }
        }

        if (animationKey && this.anims.currentAnim?.key !== animationKey) {
            this.play(animationKey);
        }

        if (this.eKey.isDown) {
            this.scene.events.emit('Interact');
        }

        if (this.pKey.isDown) {
            this.scene.pauseGame();
        }

       //Input de mouse
       if(this.mouse.leftButtonDown()){
            // Todo esto se debería mover al Shooter
           if (this.cooldownCont < 0) {
               let target = new Phaser.Math.Vector2(this.mouse.x + this.scene.cameras.main.scrollX, this.mouse.y + this.scene.cameras.main.scrollY);
               // Calcula la dirección desde el personaje hacia el cursor
               //let direction = new Phaser.Math.Vector2(target.x - this.x, target.y - this.y).normalize();
               fire(this,
                   target,
                   this.damage + this.damageStatus * this.damage * 0.2,
                   this.shootSpeed + this.shootSpeedStatus * this.shootSpeed * 0.2,
                   'Bala2',
                   4,
                   this.pool,
                   this.bulletNumbers,
                   this.prob + this.prob*this.probStatus);
               this.cooldownCont = this.shootSpeed;
            }
       }

       this.cooldownCont = this.cooldownCont - dt;

       this.speed.normalize();

        this.body.setVelocity(this.speed.x * this.speedFactor, this.speed.y * this.speedFactor);
    }
}