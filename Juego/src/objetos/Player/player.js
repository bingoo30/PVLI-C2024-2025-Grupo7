import Character from "./character.js";
import Bullet from "../Shooting/bullet.js";
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
        this.init(400, 200, 20, 1, 0);

        // Agregamos fisicas
        scene.physics.add.existing(this);
        this.body.setSize(16,8);
        this.body.setOffset(8,24);

        // #region Sistema de experiencia
        this.level = 1; 
        this.xpAcumulator = 0;
        this.xpToLevelUp = 1;
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
    onPlayerGotHit(damage) {
        this.onGotHit(damage); // Aplica daño al jugador
    }
    onPlayerCollectedXP(value) {
        this.xpAcumulator += value; 
        if (this.xpAcumulator >= this.xpToLevelUp) {
            this.LevelUp();
        }
        console.log("xp: " + this.xpAcumulator);
    }
    LevelUp() {
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
            if(this.cooldownCont < 0){
                new Bullet(this.scene, this.damage, this.shootSpeed, 20, this.x, this.y, this.mouse.worldX, this.mouse.worldY, 'Bala2', 2);  
                this.cooldownCont = this.shootSpeed;
            }
       }

       this.cooldownCont = this.cooldownCont - dt;

       this.speed.normalize();

       this.body.setVelocity(this.speed.x*this.speedFactor, this.speed.y*this.speedFactor);
    }
}