

export default class Shooter{
    
    // fire(shooter, target) {
    //     let startX = shooter.x; //posicion de la bala al ser disparado
    //     let  startY = shotter.y;
    //     let direction = Math.atan((target.x - this.x) / (target.y - this.y));

    //     this.setRotation(shooter.rotation);

    //     if (target.y >= this.y) {
    //         this.xSpeed = this.speed * Math.sin(this.direction);
    //         this.ySpeed = this.speed * Math.cos(this.direction);
    //     }
    //     else {
    //         this.xSpeed = -this.speed * Math.sin(this.direction);
    //         this.ySpeed = -this.speed * Math.cos(this.direction);
    //     }
    //     this.setActive(true);
    //     this.setVisible(true);

    //     this.setPosition(shooter.x, shooter.y); // Initial position
    //     this.startX = shooter.x; //posicion de la bala al ser disparado
    //     this.startY = shotter.y;
    //     this.direction = Math.atan((target.x - this.x) / (target.y - this.y));

    //     this.setRotation(shooter.rotation);

    //     if (target.y >= this.y) {
    //         this.xSpeed = this.speed * Math.sin(this.direction);
    //         this.ySpeed = this.speed * Math.cos(this.direction);
    //     }
    //     else {
    //         this.xSpeed = -this.speed * Math.sin(this.direction);
    //         this.ySpeed = -this.speed * Math.cos(this.direction);
    //     }
    //     this.setActive(true);
    //     this.setVisible(true);
    // };

}

export function fire(shooter, target, damage, speed, sprite, scale, pool)
{  
    //extrae la bala de la Pool de balas
    let bullet = pool.spawn(shooter.x, shooter.y, sprite);
    //la pongo a escala correcta
    bullet.setScale(scale);
    //configuro la velocidad y daño(por si saco una bala nueva)
    bullet.setSpeed(speed);
    bullet.setDamage(damage);
    //la muevo
    bullet.move(shooter.x, shooter.y, target.x, target.y);

}
