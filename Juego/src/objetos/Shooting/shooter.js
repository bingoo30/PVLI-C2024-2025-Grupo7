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
