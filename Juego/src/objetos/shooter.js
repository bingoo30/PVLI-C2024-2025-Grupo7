//Hola Toni, soy JUlián,
//Ciclyzar ////Ciclyzar//Ciclyzar//Ciclyzar//Ciclyzar//Ciclyzar//Ciclyzar//Ciclyzar//Ciclyzar//Ciclyzar//Ciclyzar//Ciclyzar//Ciclyzar//Ciclyzar//Ciclyzar
//Ciclyzar//Ciclyzar//Ciclyzar//Ciclyzar//Ciclyzar//CiclyzarCiclyzar //Ciclyzar //Ciclyzar//Ciclyzar//Ciclyzar//Ciclyzar//Ciclyzar//Ciclyzar//Ciclyzar/
//Ciclyzar//Ciclyzar//Ciclyzar//Ciclyzar//Ciclyzar//Ciclyzar//Ciclyzar//Ciclyzar//Ciclyzar//Ciclyzar//Ciclyzar//Ciclyzar//Ciclyzar//Ciclyzar//Ciclyzar//Ciclyzar
//Ciclyzar//Ciclyzar//Ciclyzar//Ciclyzar//Ciclyzar//Ciclyzar//Ciclyzar//Ciclyzar//Ciclyzar//Ciclyzar//Ciclyzar//Ciclyzar//Ciclyzar//Ciclyzar//Ciclyzar




export default class Shooter extends Phaser.GameObject.Sprite {
    /**
     * Constructor de Bullet,las balas
     * @param {Scene} scene - escena en la que aparece
     */
    constructor(scene, damage, speed, range) {
        super(scene, 0, 0, 'bullet');

        this.damage = damage;  
        this.speed = speed; 
        this.range = range; 
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.direction = 0;

        this.setActive(false);
        this.setVisible(false);
    }

    fire(shooter, target) {
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


    update(time,delta) {
        const distance = Phaser.Math.Distance.Between(this.startX, this.startY, this.x, this.y); //calcula la ditancia
        if (distance >= this.range) {
            this.destroyBullet();
        }

        this.x += this.xSpeed * delta;
        this.y += this.ySpeed * delta;
    }

    destroyBullet() {
        this.destroy(); 
    }
}
