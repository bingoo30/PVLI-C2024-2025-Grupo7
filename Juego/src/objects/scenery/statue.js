import Obstacle from "./obstacle.js";

const STATUE_SHOOT_DAMAGE = 3;
const STATUE_SHOOT_COOLDOWN = 1000;
const STATUE_BULLET_SPEED = 100;
/**
* @extends Obstacle
*/
//estatua tiradora
export default class Statue extends Obstacle {
    constructor(scene, x, y, dir) {
        super(scene, x, y, "Statue");
        this.scene.physics.add.existing(this);
        this.setDirection(dir);
        this.damage = STATUE_SHOOT_DAMAGE;
        this.timer = STATUE_SHOOT_COOLDOWN;
        this.shootSpeed = STATUE_BULLET_SPEED;
        this.pool = null;
        this.init(1);
    }

    init(damage) {
        super.init(damage);
    }
    setDirection(dir) {
        var x = 0; var y=0;
        switch (dir) {
            case 'a': {
                x = -1;
                y = 0;
            }
                break;
            case 'w': {
                x = 0;
                y = -1;
            }
                break;
            case 'd': {
                x = 1; 
                y = 0;
            }
                break;
            case 's': {
                x = 0;
                y = 1;
            }
                break;
        }
        this.direction = new Phaser.Math.Vector2(-1, 0);
    }
    fire(shooter, damage, speed, sprite, scale, pool, num, critChance = 0, critMultiplier = 2) {
        for (let i = 0; i < num; i++) {
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
            let bullet = pool.spawn(shooter.x, shooter.y, sprite);
            bullet.rotation = angle+90;

            // Configurar la bala
            bullet.setScale(scale);
            bullet.setSpeed(speed);
            bullet.setDamage(damage);
    
            // Mover la bala hacia la posici髇 calculada
            //uso dx y dy por el disparo en abanico si lo hay
            bullet.move(shooter.x, shooter.y, shooter.x + dx * 1000, shooter.y + dy * 1000);
        }
    }

    preUpdate(t, dt) {
        if(this.timer < 0) {
            this.fire(this, this.damage, this.shootSpeed, 'Bala', 4, this.pool, 1)
            this.timer = STATUE_SHOOT_COOLDOWN;
        }
        this.timer = this.timer - dt;

        this.body.setVelocity(0,0);
    }

    setPool(pool) {
        this.pool = pool;

    }
}