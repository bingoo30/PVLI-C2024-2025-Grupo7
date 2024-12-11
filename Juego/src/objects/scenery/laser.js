export default class Laser extends Phaser.GameObjects.Sprite {
    /**
     * Constructor de Bullet,las balas
     * @param {Scene} scene - escena en la que aparece
     * @param {number} x - position
     * @param {number} y - position
     * @param {number} sprite - ejeY inical
     */
    constructor(scene, x, y, sprite, damage =0) {
        super(scene, x, y, sprite);
        this.scene = scene;
        this.scene.add.existing(this);
        this.damage = damage;

        this.scene.physics.add.existing(this);
        this.setDepth(1);
    }
    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }
    setDamage(d) {
        this.damage = d;
    }
    getDamage() {
        return this.damage;
    }
    destroyLaser(pool) {
        pool.release(this);
    }
}