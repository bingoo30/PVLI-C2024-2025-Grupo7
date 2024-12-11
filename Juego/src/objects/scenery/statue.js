import Obstacle from "./obstacle.js";

const STATUE_SHOOT_DAMAGE = 3;
const STATUE_SHOOT_COOLDOWN = 3000;
const STATUE_LASER_DURATION = 1000;
/**
* @extends Obstacle
*/
//estatua tiradora
export default class Statue extends Obstacle {
    constructor(scene, x, y, dir) {
        super(scene, x, y, "Statue");
        this.scene.physics.add.existing(this);
        this.setDirection(dir);
        this.init(STATUE_SHOOT_DAMAGE);
        this.cooldown = STATUE_SHOOT_COOLDOWN;
        this.laserDuration = STATUE_LASER_DURATION;
        this.spawnLaser = false;
        this.pool = null;

        this.scene.time.addEvent({
            delay: this.cooldown, // Tiempo entre cada ciclo
            callback: this.toggleLaser,
            callbackScope: this,
            loop: true
        });
    }

    init(damage) {
        super.init(damage);
    }
    setDirection(dir) {
        switch (dir) {
            case 'a': {
                this.direction = 3;
            }
                break;
            case 'w': {
                this.direction = 2;
            }
                break;
            case 'd': {
                this.direction = 1;
            }
                break;
            case 's': {
                this.direction = 0;
            }
                break;
        }
    }
    toogleLaser() {
            // Calcular la direcci髇 de la bala a partir del 醤gulo ajustado
            let dx;
            let dy;
            let angle;

            switch(this.direction) {
                case 0: // Sur
                    dx = 0;
                    dy = 1;
                    angle = 1.5;
                    break;
                case 1: // Este
                    dx = 1;
                    dy = 0;
                    angle = 0;
                    break;
                case 2: // Norte
                    dx = 0;
                    dy = -1;
                    angle = -1.5;
                    break;
                case 3: // Oeste
                    dx = -1;
                    dy = 0;
                    angle = 3;
                    break;
            }

            // Extrae la bala de la pool
            let laser = this.pool.spawn(this.x, this.y);
            laser.rotation = angle+90;

            // Configurar la bala
            laser.setScale(4);
            laser.setDamage(this.damage);
    
    }

    preUpdate(t, dt) {
        super.preUpdate(t,dt);
    }

    setPool(pool) {
        this.pool = pool;

    }
}