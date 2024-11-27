export default class Coin extends Phaser.GameObjects.Sprite {
    /**
     * Constructor de Bullet,las balas
     * @param {Scene} scene - escena en la que aparece
     * @param {number} damage - daño que hace la bala
     * @param {number} range - alcance max
     * @param {number} startX - ejeX inicial
     * @param {number} startY - ejeY inical
     */
    constructor(scene, x, y, exp) {
        super(scene, x, y, 'Coin');
        this.setScale(2);
        this.scene = scene;
        this.exp = exp
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setImmovable(true);
        this.active = false;
        //console.log("aa");
        //this.scene.tweens.add({
        //    targets: this,
        //    x: this.x + 200,
        //    y: this.y - 100,
        //    angle: 360,
        //    duration: 10000000,
        //    ease: 'Sine.easeInOut',
        //    repeat: -1,
        //    yoyo: true,
        //});

    }
    preUpdate(t, dt) {
        super.preUpdate(t, dt);

    }
   

    getExp() {
        return this.exp;
    }

    setExp(value) {
        this.exp = value;
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    destroyCoin(pool) {
        pool.release(this);
    }
}