export function fire(shooter, target, damage, speed, sprite, scale, pool, num, critChance = 0, critMultiplier = 2)
{  
    // Calcular el �ngulo base hacia el objetivo
    const angleToTarget = Phaser.Math.Angle.Between(shooter.x, shooter.y, target.x, target.y);

    // Configurar el rango de dispersi�n (en radianes)
    const spread = Phaser.Math.DegToRad(8); // Rango total del spread
    const angleStep = num > 1 ? spread / (num - 1) : 0; // Evitar divisi�n por cero
    const startAngle = angleToTarget - spread / 2;

    for (let i = 0; i < num; i++) {
        // Calcular el �ngulo para esta bala
        const angle = startAngle + i * angleStep;

        // Determinar si esta bala es un cr�tico y calcular el da�o final
        const isCritical = Math.random() < critChance; // Probabilidad de cr�tico
        const finalDamage = isCritical ? damage * critMultiplier : damage;

        // Calcular la direcci�n de la bala a partir del �ngulo ajustado
        const dx = Math.cos(angle);
        const dy = Math.sin(angle);

        // Extrae la bala de la pool
        let bullet = pool.spawn(shooter.x, shooter.y, sprite);

        // Configurar la bala
        bullet.setScale(scale);
        bullet.setSpeed(speed);
        bullet.setDamage(finalDamage);

        // Mover la bala hacia la posici�n calculada
        //uso dx y dy por el disparo en abanico si lo hay
        bullet.move(shooter.x, shooter.y, shooter.x + dx * 1000, shooter.y + dy * 1000);

        // Mensaje de ataque cr�tico (opcional)
        if (isCritical) {
            console.log(`�Ataque cr�tico! Da�o: ${finalDamage}`);
        }
    }
}