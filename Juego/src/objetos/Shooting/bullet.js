export default class Bullet extends Phaser.GameObject.Sprite {
    /**
     * Constructor de Bullet,las balas
     * @param {Scene} scene - escena en la que aparece
     * @param {number} damage - daño que hace la bala
     * @param {number} range - alcance max
     * @param {number} startX - ejeX inicial
     * @param {number} startY - ejeY inical
     */
    constructor(scene, damage, xSpeed, ySpeed, range) {
        super(scene, x, y, 'bullet');
        this.scene.add.existing(this);
        this.damage = damage;  
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.range = range;
        this.startX = x; //posicion de la bala al ser disparado
        this.startY = y;
        this.scene.physics.add.existing(this);

    }
    update(time, delta) {
        this.body.setVelocity(this.xSpeed, this.ySpeed);
        const distance = Phaser.Math.Distance.Between(this.startX, this.startY, this.x, this.y); //calcula la ditancia
        if (distance >= this.range) {
            this.destroyBullet();
        }
    }

    destroyBullet() {
        this.destroy(); 
    }
}