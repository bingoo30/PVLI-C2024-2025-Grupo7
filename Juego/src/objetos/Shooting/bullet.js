export default class Bullet extends Phaser.GameObjects.Sprite {
    /**
     * Constructor de Bullet,las balas
     * @param {Scene} scene - escena en la que aparece
     * @param {number} damage - daño que hace la bala
     * @param {number} range - alcance max
     * @param {number} startX - ejeX inicial
     * @param {number} startY - ejeY inical
     */
    constructor(scene, damage, speed, range, x, y) {
        super(scene, x, y, 'bullet');
        this.scene.add.existing(this);
        this.damage = damage;  
        this.speed = 10;
        this.range = 1000;
        this.xSpeed = 0.5;
        this.ySpeed = 0.5;
        this.startX = x; //posicion de la bala al ser disparado
        this.startY = y;
        this.scene.physics.add.existing(this);
    }
    update(time, delta) {
        this.body.setVelocity(speed);
        this.body.setVelocity(1, 400);
        this.body.setPosition
        const distance = Phaser.Math.Distance.Between(this.startX, this.startY, this.x, this.y); //calcula la distancia
        if (distance >= this.range) {
            this.destroyBullet();
        }
    }

    fire(shooter, target) {
        // let startX = shooter.x; //posicion de la bala al ser disparado
        // let  startY = shotter.y;
        // let direction = Math.atan((target.x - this.x) / (target.y - this.y));

        //this.setRotation(shooter.rotation);

        if (target.y >= this.y) {
            this.xSpeed = this.speed * Math.sin(this.direction);
            this.ySpeed = this.speed * Math.cos(this.direction);
        }
        else {
            this.xSpeed = -this.speed * Math.sin(this.direction);
            this.ySpeed = -this.speed * Math.cos(this.direction);
        }
        this.setActive(true);
        this.setVisible(true);

        this.setPosition(shooter.x, shooter.y); // Initial position
        this.startX = shooter.x; //posicion de la bala al ser disparado
        this.startY = shotter.y;
        this.direction = Math.atan((target.x - this.x) / (target.y - this.y));

        this.setRotation(shooter.rotation);

        if (target.y >= this.y) {
            this.xSpeed = this.speed * Math.sin(this.direction);
            this.ySpeed = this.speed * Math.cos(this.direction);
        }
        else {
            this.xSpeed = -this.speed * Math.sin(this.direction);
            this.ySpeed = -this.speed * Math.cos(this.direction);
        }
        this.setActive(true);
        this.setVisible(true);
    }

    destroyBullet() {
        this.destroy(); 
    }
}