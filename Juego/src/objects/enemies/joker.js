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
        this.poolArea = null;
        scene.physics.add.existing(this);
        this.damageArea = null;
        this.shootSpeedStatus = 0;
        this.damageStatus = 0;
        this.bulletCardNumbers = 2;

        this.AreaDamageRange = 100;
        this.AreaDamage = 0.1;
        this.duration = 1;

        this.maxLife = 5;
        //speedFactor,shootCardSpeed, shootSpeed, life, damage, prob
        this.init(100, 300, 500, this.maxLife, 3, 0);
        this.chaseSpeed = 100;
        this.isTeleporting = false;
        this.isChasing = false;
        this.spawnCards = true;
        this.lastAttackTime = 0;
        this.attackInterval = 2000; 
        this.phase = 3;
        this.attackRange = 50; 

        this.timer = this.scene.time.addEvent({
            delay: 3000,
            callback: this.chasing,
            callbackScope: this,
            loop: true
        });


        this.createAnimations();
    }
    getLife() {
        return this.life;
    }
    getMaxLife() {
        return this.maxLife;
    }
    chasing() {
        this.isChasing = true;
    }
    onGotHit(damage) {
        super.onGotHit(damage);
        console.log(`Joker golpeado. Vida restante: ${this.life}`);

        const animationContainer = document.getElementById('fullscreen-animation');
        const animationFrame = document.getElementById('animation-frame');

        if (animationContainer && animationFrame) {
            animationContainer.style.display = 'block';
            let currentFrame = 0;
            const frames = ['assets/map/map_boss/map_boss_1.png', 'assets/map/map_boss/map_boss_2.png'];

            const interval = setInterval(() => {
                animationFrame.src = frames[currentFrame];
                currentFrame = (currentFrame + 1) % frames.length; // Alterna entre 0 y 1
            }, 10); 

            setTimeout(() => {
                clearInterval(interval);
                animationContainer.style.display = 'none';
            }, 50); 
        }

        if (this.life <= 0) {
            this.destroy();
        }
    }
    setDamageArea(area) {
        this.poolArea = area;
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
    createDamageArea() {

        const dx = this.target.x - this.x;
        const dy = this.target.y - this.y;

        // Calcular la distancia entre el Joker y el jugador
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Normalizar la dirección
        const directionX = dx / distance;
        const directionY = dy / distance;

        const areaX = this.x + directionX * 300; // 300 px
        const areaY = this.y + directionY * 300;

        this.damageArea = this.poolArea.spawn(areaX, areaY);
        this.damageArea.reset(this.AreaDamageRange, this.AreaDamage, this.duration);
        const sfx = this.scene.sound.add('enemyAreaAudio');
        sfx.play();
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

    chasePlayer() {

        const dx = this.target.x - this.x;
        const dy = this.target.y - this.y;

        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > this.attackRange) {

            const velocityX = (dx / distance) * this.chaseSpeed;
            const velocityY = (dy / distance) * this.chaseSpeed;

            this.body.setVelocity(velocityX, velocityY);

        } else {
            // Si est?lo suficientemente cerca, detén el movimiento
            this.body.setVelocity(0, 0);

            // Realiza el ataque en área
            this.createDamageArea();
        }
    }

    teleport() {
        this.isChasing = false;

        if (!this.isTeleporting) {

            let newDistX = Phaser.Math.Between(this.minX, this.maxX);
            let newDistY = Phaser.Math.Between(this.minY, this.maxY);

            const dx = this.target.x - newDistX;
            const dy = this.target.y - newDistY;

            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance >100) {
                this.isTeleporting = true;
                // Animación de teleportación
                //this.play('joker_teleport');

                // Después de la animación, teletransporta al Joker
                //this.once('animationcomplete', () => {
                this.x = newDistX;
                this.y = newDistY;
                this.isTeleporting = false;

                //  this.play('joker_idle');
                //});

            }
           
        }
        this.phase = 3;

    }

    shootCards() {
        this.isChasing = false;

        // Dispara 2 cartas hacia el jugador
        //console.log('disparo joker');
        for (let i = 0; i < 2; i++) {
            //shooter, target, damage, speed, sprite, scale, pool, num, critChance = 0, critMultiplier = 2
            fire(this,
                this.target,
                this.damage + this.damageStatus * this.damage * 0.2,
                this.shootCardSpeed + this.shootSpeedStatus * this.shootSpeed * 0.2,
                'Card',
                0.5,
                this.pool,
                this.bulletCardNumbers,
                this.prob + this.prob * this.probStatus);
        }

        this.phase = 2;
    }

    spawnOrbs() {// fase 3
        this.isChasing = false;
        
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

        this.phase = 1;

    }

    preUpdate(t,dt){
        super.preUpdate(t, dt);

        if (this.life < this.maxLife / 2 && this.spawnCards) {
            this.spawnCards = false;
            this.scene.startCardChallenge();
        }

        if (t > this.lastAttackTime + this.attackInterval) { // A cada dos segundos
            //this.phase = 2;
            //console.log(this.phase)
            if (this.phase === 1) {
                //console.log('disparando cartas');
                this.createDamageArea();

                this.shootCards();
            } else if (this.phase === 2) {
                //console.log('x: ', this.x, ' y: ', this.y);
                this.teleport();
            } else if (this.phase === 3) {
                //console.log('preparando orb');

                this.spawnOrbs(); // Incio del las orbs
            }
            this.lastAttackTime = t;
        }
        if (this.isChasing) {
            this.chasePlayer();
        }
        
    }
}