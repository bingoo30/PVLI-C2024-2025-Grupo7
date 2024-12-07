export default class Orb extends Phaser.GameObjects.Sprite {
    constructor(scene, index, color, damage, scale, target) {
        super(scene, 0, 0, 'Orbs');

        this.scene = scene;
        this.index = index;
        this.target = target;
        this.color = color;
        this.start = false;
        this.follow = false;

        this.damage = damage;
        this.angle = 0; 
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        const animKey = `orb_charge_color_${color}`;
        if (!this.scene.anims.exists(animKey)) {
            this.scene.anims.create({
                key: animKey,
                frames: this.scene.anims.generateFrameNumbers('Orbs', { start: color * 4, end: color * 4 + 3 }),
                frameRate: 4,
                repeat: 0,
            });
        }
    }

    setSpeed(s) {
        this.speed = s;
    }

    setDamage(d) {
        this.damage = d;
    }

    move(xStart, yStart, xObj, yObj, pool) {
        this.setScale(1);

        console.log('orb creada');

        this.start = true; // empieza

        this.xStart = xStart;
        this.yStart = yStart;
        this.xObj = this.target.x;
        this.yObj = this.target.y;

        console.log('Posición inicial xStart:', this.xStart, 'yStart:', this.yStart);

        const animKey = `orb_charge_color_${this.color}`;
        this.play(animKey);

        this.once('animationcomplete', () => {
            this.start = false;
            this.follow = true;
            this.scene.time.delayedCall(1000, this.destroyBullet, [pool], this);
        });
    }

    rotate() {
        const radius = 50; // Distancia del orbe al centro
        const radians = Phaser.Math.DegToRad(this.angle);

        // Calcula las coordenadas de rotación
        this.x = this.xStart + Math.cos(radians) * radius;
        this.y = this.yStart + Math.sin(radians) * radius;

        // Incrementa el ángulo para generar movimiento
        this.angle += 2; 
    }

    startMovingToTarget() {
        console.log('Yendo al player: ', this.x);

        // direccion de disparo 
        var pointSpeed = new Phaser.Math.Vector2(this.target.x - this.xStart, this.target.y - this.yStart);   // Usa como referencia el centro de la pantalla
        pointSpeed.normalize();

        this.body.setVelocity(this.speed * pointSpeed.x, this.speed * pointSpeed.y);
    }


    getDamage() {
        return this.damage;
    }

    destroyBullet(pool) {
        pool.release(this);
        this.body.setVelocity(0, 0);
    }


    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        if (this.start) {
            this.rotate();
        } else if (this.follow) {
            this.startMovingToTarget();
        }
    }
}
