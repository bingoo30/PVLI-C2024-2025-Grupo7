export default class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, damage, speed, range) {
        super(scene,'bullet');

        this.scene = scene;
        this.damage = damage;  
        this.speed = speed;    //la velocidad de la bala
        this.range = range;    // alcance max de la bala

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setActive(false);
        this.setVisible(false);
    }

    shoot(x, y, direction) { //posicion de disparo y la direccion
        this.setActive(true);
        this.setVisible(true);

        this.setPosition(x, y); //posicion inicial de la bala
        this.setRotation(direction.angle()); //algulo de la bala

        this.startX = x; //posicion de la bala al ser disparado
        this.startY = y;

        direction.normalize();

        this.body.velocity.x = direction.x * this.speed;
        this.body.velocity.y = direction.y * this.speed;
    }

    update() {
        const distance = Phaser.Math.Distance.Between(this.startX, this.startY, this.x, this.y); //calcula la ditancia
        if (distance >= this.range) {
            this.destroyBullet();
        }
    }

    colision(target) {
        if (target.life) {
            target.life -= this.damage;
        }
        this.destroyBullet();
    }

    destroyBullet() {
        this.destroy(); 
    }
}
