export function showPopup(scene, message, x,y) {
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

   scene.time.addEvent({
        delay: 200,
        callback: () => { popupContainer.destroy(); }
    });

    return popupContainer;
}