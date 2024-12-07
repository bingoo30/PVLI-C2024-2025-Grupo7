export function showPopup(scene, message, x,y) {
    if (!scene.time || typeof scene.time.addEvent !== 'function') {
        console.error("La escena no tiene un sistema de tiempo válido.");
        return;
    }

    // Crear un fondo semi-transparente para el popup
    const popupBackground = scene.add.graphics();
    popupBackground.fillStyle(0x000000, 0.7); // Negro con transparencia
    popupBackground.fillRoundedRect(x, y, 300, 150, 15); // Posición, tamaño y esquinas redondeadas

    // Crear un texto para el mensaje
    const popupText = scene.add.text(x+150, y+50, message, {
        fontFamily: 'PixelArt',
        fontSize: '18px',
        color: '#ffffff',
        align: 'center',
        wordWrap: { width: 280 }
    }).setOrigin(0.5);

    // Crear un contenedor para agrupar los elementos
    const popupContainer = scene.add.container(0, 0, [popupBackground, popupText]);

    // Añadir una animación de aparición
    popupContainer.setAlpha(0); // Inicialmente invisible
    scene.tweens.add({
        targets: popupContainer,
        alpha: 1, // Aparecer gradualmente
        duration: 500, // Duración de la animación en milisegundos
        ease: 'Power2'
    });

    scene.time.addEvent({
        delay: 1000,
        callback: () => { popupContainer.destroy(); }
    });

    return popupContainer;
}