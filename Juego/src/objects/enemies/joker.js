import Enemy from "./enemy.js";

export default class Joker extends Enemy{
    constructor(scene, x, y, player, exp){
        super(scene, x, y, player, 'Joker', exp);
        this.scene.add.existing(this);

        //speedFactor, shootSpeed, life, damage, prob
        this.init(100, 80, 300, 3, 0);
    
        this.isTeleporting = false;
        this.lastAttackTime = 0;
        this.attackInterval = 2000; 
        this.phase = 1;

        //this.createAnimations();
    }

    createAnimations() {
        this.scene.anims.create({
            key: 'joker_idle',
            frames: this.scene.anims.generateFrameNumbers('boss', { start: 0, end: 3 }),
            frameRate: 8,
            repeat: -1,
        });

        this.scene.anims.create({
            key: 'joker_attack',
            frames: this.scene.anims.generateFrameNumbers('boss', { start: 4, end: 7 }),
            frameRate: 8,
            repeat: 0,
        });
        this.scene.anims.create({
            key: 'joker_teleport',
            frames: this.scene.anims.generateFrameNumbers('boss', { start: 4, end: 7 }),
            frameRate: 8,
            repeat: 0,
        });
        this.play('joker_idle');
    }

    teleport() {
        if (!this.isTeleporting) {
            this.isTeleporting = true;

            // Animación de teleportación
            this.play('joker_teleport');

            // Después de la animación, teletransporta al Joker
            this.once('animationcomplete', () => {
                // Cambia de posición a un lugar aleatorio
                

                this.isTeleporting = false;
                this.play('joker_idle');
            });
        }
    }

    shootCards() {
        // Dispara 2 cartas hacia el jugador
        for (let i = 0; i < 2; i++) {
            
        }
    }

    init(speedFactor, shootSpeed, life, damage, prob) {
        super.init(speedFactor, shootSpeed, life, damage, prob);
    }
    preUpdate(t,dt){
        super.preUpdate(t, dt);


        if (t > this.lastAttackTime + this.attackInterval) {
            if (this.phase === 1) {
                this.shootCards();
                //this.spawnOrbs();
            } else {
                this.teleport();
            }
            this.lastAttackTime = t;
        }
    }
}