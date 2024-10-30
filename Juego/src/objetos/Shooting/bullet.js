export default class Bullet extends Phaser.GameObjects.Sprite {
    /**
     * Constructor de Bullet,las balas
     * @param {Scene} scene - escena en la que aparece
     * @param {number} damage - daño que hace la bala
     * @param {number} range - alcance max
     * @param {number} startX - ejeX inicial
     * @param {number} startY - ejeY inical
     */
    constructor(scene, damage, speed, range, xStart, yStart, xObj, yObj) {
        super(scene, xStart, yStart, 'bullet');
        this.scene.add.existing(this);
        this.damage = damage;  
        this.speed = 500;
        this.range = 1500;
        this.startX = xStart; //posicion de la bala al ser disparada
        this.startY = yStart;
        this.scene.physics.add.existing(this);

        // direccion de disparo 
        var pointSpeed = new Phaser.Math.Vector2(xObj - 500, yObj - 300);   // Usa como referencia el centro de la pantalla
        pointSpeed.normalize();
        this.body.setVelocity(this.speed * pointSpeed.x, this.speed * pointSpeed.y);
    }
    Update(time, delta) {
        const distance = Phaser.Math.Distance.Between(this.startX, this.startY, this.x, this.y); //calcula la distancia
        if (distance >= this.range) {
            this.destroyBullet();
        }
    }

    destroyBullet() {
        this.destroy(); 
    }
}