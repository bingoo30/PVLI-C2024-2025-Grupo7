export default class Bullet extends Phaser.GameObjects.Sprite {
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
        this.setScale(4);
        this.scene = scene;
        this.exp = exp
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

    }

    Update(time, delta) {
        
    }

    destoyCoin() {
        this.destroy(); 
    }
}