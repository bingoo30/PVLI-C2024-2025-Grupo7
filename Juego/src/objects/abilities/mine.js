
const DEFAULT_MINE_COOLDOWN = 5000;
const DEFAULT_STUNT_TIME = 5000;

export default class Mine extends Phaser.GameObjects.Sprite {
    /**
     * Constructor de la mina
     * @param {Scene} scene - escena en la que aparece
     * @param {number} x - coordenada x
     * @param {number} y - coordenada y
     * @param {object} player -referencia del player
     * @param {object} Enemies - grupo de enemigos
     * 
    */
    constructor(scene, x, y, damage, time) {
        super(scene, x-50, y-10, 'Mine');
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.stuntTime = time;
    }

    getStuntTime() {    // retorna el tiempo stuneado
        return this.stuntTime;
    }
    onDeath() {
        this.destroy(); // Elimina el objeto de la escena
    }
}