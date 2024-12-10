import Bullet from "./bullet.js";

export default class ExplosiveBullet extends Bullet {
    /**
     * Constructor de Bullet,las balas
     * @param {Scene} scene - escena en la que aparece
     * @param {number} damage - daño que hace la bala
     * @param {number} startX - ejeX inicial
     * @param {number} startY - ejeY inical
     * @param {number} scale - escala
     */
    constructor(scene, damage, speed, bala, areaRadius, pool) {
        super(scene, damage, speed, bala);
        this.areaRadius = areaRadius;
        this.pool = pool;
        this.areaDamage = 0;
        this.duration = 1;  
    }
    setDamage(d) {
        super.setDamage(d);
        this.areaDamage = d/2;
    }
    destroyBullet(pool) {
        //crear el area de daño
        let damageArea = this.pool.spawn(this.x, this.y);
        damageArea.reset(this.areaRadius, this.areaDamage, this.duration);
        const sfx = this.scene.sound.add('enemyAreaAudio');
        sfx.play();
        
        super.destroyBullet(pool);
    }
}