/**
     * Desbloquea el logro y cambia el icono. 
     * cambiar el archivo json
     */
export function unlock(scene, achievement) {
    const achievementData = scene.cache.json.get('achievementData');
    const achievementObj = achievementData.find(item => item.title === achievement);
    achievementObj.locked = false;
    // Guardar los datos actualizados en localStorage.
    localStorage.setItem('achievementData', JSON.stringify(achievementData));
    console.log(`Desbloqueando logro: ${achievement}, cambiando sprite a ${achievementObj.unlockedSprite}`);
    console.log(achievementObj); // Verifica el cambio.
}