/**
 * @extends Phaser.GameObjects.Sprite
 * Clase Orb
 * Ataque de Joker
 */
export default class Orb extends Phaser.GameObjects.Sprite {
    /**
     * Constructor de Orb
     * @param {Scene} scene - escena en la que aparece
     * @param {Joker} joker - referencia al Joker
     * @param {number} color - color de la Orb
     * @param {number} damage - da�o de la Orb
     * @param {Player} target - referencia al Player
    */
    constructor(scene, joker, damage, target) {
        super(scene, 0, 0, '17glitch');

        this.scene = scene;
        this.joker = joker;
        this.target = target; // referencia al player

        // booleanos para el funcionamento de la Orb
        this.start = false;
        this.actTime = false;
        this.follow = false;

        // Pool a la cual pertenece la Orb
        this.pool = null;

        // Tiempo de persecucion al player
        this.timeToStop = 0;

        this.damage = damage;

        // Angulo de rotacion
        this.angle = 0; 

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        
        this.setDepth(3);

        if (!this.scene.anims.exists('orb_start')) {
            this.scene.anims.create({
                key: 'orb_start',
                frames: this.scene.anims.generateFrameNumbers('17glitch', { start: 0, end:11 }),
                frameRate: 3,
                repeat: 0,
            });
        }

        if (!this.scene.anims.exists('orb_move')) {
            this.scene.anims.create({
                key: 'orb_move',
                frames: this.scene.anims.generateFrameNumbers('17glitch', { start: 12, end: 13 }),
                frameRate: 8,
                repeat: -1
            });
        }

        if (!this.scene.anims.exists('orb_die')) {
            this.scene.anims.create({
                key: 'orb_die',
                frames: this.scene.anims.generateFrameNumbers('17glitch', { start: 14, end: 19 }),
                frameRate: 10,
                repeat: 0
            });
        }
    }

    setSpeed(s) {
        this.speed = s;
    }

    setPool(pool) {
        this.pool = pool;
    }

    setDamage(d) {
        this.damage = d;
    }

    // Metodo llamado por la funcion fire para spawnear la Orb
    move(xStart, yStart, xObj, yObj, pool) {
        this.setScale(1);
        //console.log('orb creada');
        this.start = true; // empieza
        this.play('orb_start');

        this.once('animationcomplete', () => {
            this.play('orb_move');
            this.scene.checkActiveOrbs(this);
        });
    }

    // Rotar 
    rotate() {
        const radius = 100; // Distancia del orbe al centro
        const radians = Phaser.Math.DegToRad(this.angle);

        // Calcula las coordenadas de rotaci�n
        this.x = this.joker.x + Math.cos(radians) * radius;
        this.y = this.joker.y + Math.sin(radians) * radius;

        // Incrementa el �ngulo para generar movimiento
        this.angle += 2; 
    }

    // Mover la Orb hacia donde esta el player
    startMovingToTarget() {
        setTimeout(() => this.destroyBullet(), 10000);
        //console.log('Yendo al player: ', this.x);
        // direccion de disparo 
        var pointSpeed = new Phaser.Math.Vector2(this.target.x - this.x, this.target.y - this.y);
        pointSpeed.normalize();

        this.body.setVelocity(this.speed * pointSpeed.x, this.speed * pointSpeed.y);
    }


    getDamage() {
        return this.damage;
    }

    destroyBullet() {
        // Resetar los booleanos
        this.actTime = false;
        this.start = false;
        this.follow = false;

        // Se libera de la pool

        this.play('orb_die'); 

        this.once('animationcomplete', () => {
            this.pool.release(this);
            this.body.setVelocity(0, 0);
        });
    }


    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        if (this.start) {
            this.rotate();
        } else if (this.follow) {
            if (!this.actTime) {
                //console.log('actTime')
                this.timeToStop = time + 15000; // va a seguir el player por 2 segundos
                this.actTime = true;
            }
            if (this.timeToStop > time) { // Mientras el timeToStop sea mayor que time sigue al player
                this.startMovingToTarget();
            }
        }
    }
}
