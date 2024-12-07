import Character from '../../objects/player/character.js';
import { fire } from "../abilities/shooting/fire.js";

export default class Joker extends Character {
    constructor(scene, x, y, player){
        super(scene, x, y, 'boss');
        this.scene.add.existing(this);
        this.target = player;
        this.minX = 10;
        this.minY = 10;
        this.maxX = this.scene.scale.width;
        this.maxY = this.scene.scale.width;

        this.shootSpeedStatus = 0;
        this.damageStatus = 0;
        this.bulletCardNumbers = 2;

        //speedFactor,shootCardSpeed, shootSpeed, life, damage, prob
        this.init(100, 80, 500, 300, 3, 0);
    
        this.isTeleporting = false;
        this.lastAttackTime = 0;
        this.attackInterval = 3000; 
        this.phase = 3;

        this.createAnimations();
    }

    init(speedFactor, shootCardSpeed, shootSpeed, life, damage, prob) {
        this.speedFactor = speedFactor;
        this.shootSpeed = shootSpeed;
        this.shootCardSpeed = shootCardSpeed;
        this.life = life;
        this.damage = damage;
        this.prob = prob;
        this.maxLife = life;
    }


    createAnimations() {

        //this.scene.anims.create({
        //    key: 'joker_idle',
        //    frames: this.scene.anims.generateFrameNumbers('boss', { start: 0, end: 3 }),
        //    frameRate: 8,
        //    repeat: -1,
        //});

        //this.scene.anims.create({
        //    key: 'joker_attack',
        //    frames: this.scene.anims.generateFrameNumbers('boss', { start: 4, end: 7 }),
        //    frameRate: 8,
        //    repeat: 0,
        //});
        //this.scene.anims.create({
        //    key: 'joker_teleport',
        //    frames: this.scene.anims.generateFrameNumbers('boss', { start: 4, end: 7 }),
        //    frameRate: 8,
        //    repeat: 0,
        //});
        //this.play('joker_idle');
    }

  

    teleport() {
        if (!this.isTeleporting) {
            this.isTeleporting = true;

            // Animación de teleportación
            //this.play('joker_teleport');

            // Después de la animación, teletransporta al Joker
            //this.once('animationcomplete', () => {


            let newDistX = Phaser.Math.Between(this.minX, this.maxX);
            let newDistY = Phaser.Math.Between( this.minY, this.maxY);
                
            this.x = newDistX;
            this.y = newDistY;
                this.isTeleporting = false;
              //  this.play('joker_idle');
            //});
        }
        this.phase = 3;

    }

    shootCards() {
        // Dispara 2 cartas hacia el jugador
        //console.log('disparo joker');
        for (let i = 0; i < 2; i++) {
            fire(this,
                this.target,
                this.damage + this.damageStatus * this.damage * 0.2,
                this.shootCardSpeed + this.shootSpeedStatus * this.shootSpeed * 0.2,
                'Bala2',
                4,
                this.pool,
                this.bulletCardNumbers,
                this.prob + this.prob * this.probStatus);
        }

        this.phase = 2;
    }

    spawnOrbs() {
        // shooter, target, damage, speed, sprite, scale, pool, num, critChance = 0, critMultiplier = 2
        fire(this,
            this.target,
            this.damage + this.damageStatus * this.damage * 0.2,
            this.shootSpeed + this.shootSpeedStatus * this.shootSpeed * 0.2,
            'Orbs',
            4,
            this.pool2,
            1,
            this.prob + this.prob * this.probStatus);
    }

    preUpdate(t,dt){
        super.preUpdate(t, dt);

        if (t > this.lastAttackTime + this.attackInterval) { // A cada dos segundos
            //this.phase = 2;
            if (this.phase === 1) {
                //console.log('disparando cartas');

                this.shootCards();
            } else if (this.phase === 2) {
                console.log('x: ', this.x, ' y: ', this.y);

                this.teleport();
            } else if (this.phase === 3) {
                //console.log('preparando orb');

                this.spawnOrbs(); // Incio del las orbs
            }
            this.lastAttackTime = t;
        }
    }
}