export default class Bullet extends Phaser.GameObjects.Sprite {
    /**
     * Constructor de Bullet,las balas
     * @param {Scene} scene - escena en la que aparece
     * @param {number} damage - daño que hace la bala
     * @param {number} startX - ejeX inicial
     * @param {number} startY - ejeY inical
     */
    constructor(scene, damage, speed, bala, scale) {
        super(scene, 0, 0, bala);
        this.setScale(scale);
        this.scene = scene;
        this.scene.add.existing(this);
        this.damage = damage;
        this.speed = speed;

        this.startX = 0; //posicion de la bala al ser disparada
        this.startY = 0;
        this.active = false;
        this.scene.physics.add.existing(this);
        this.particles = null;
    }

    move(xStart, yStart, xObj, yObj) {
        // direccion de disparo 
        var pointSpeed = new Phaser.Math.Vector2(xObj - xStart, yObj - yStart);   // Usa como referencia el centro de la pantalla
        pointSpeed.normalize();

        this.body.setVelocity(this.speed * pointSpeed.x, this.speed * pointSpeed.y);

        this.particles=this.scene.add.particles(0, 0, 'Particle', {
            x: () => {
                return this.x;
            },
            y: () => {
                return this.y;
            },
            speed: 100,
            lifespan: 100,
            scale: 2
        }); 
    }
    setSpeed(s) {
        this.speed = s;
    }
    setDamage(d) {
        this.damage = d;
    }
    getDamage() {
        return this.damage;
    }
    destroyBullet(pool) {
        pool.release(this);
        this.particles.destroy();
        //quitar el efecto de particulas
    }
}