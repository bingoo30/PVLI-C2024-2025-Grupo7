export function showPopup(scene, message) {
    // Crear un fondo semi-transparente para el popup
    const popupBackground = scene.add.graphics();
    popupBackground.fillStyle(0x000000, 0.7); // Negro con transparencia
    popupBackground.fillRoundedRect(350, 200, 300, 150, 15); // Posición, tamaño y esquinas redondeadas

    // Crear un texto para el mensaje
    const popupText = scene.add.text(500, 250, message, {
        fontFamily: 'PixelArt',
        fontSize: '18px',
        color: '#ffffff',
        align: 'center',
        wordWrap: { width: 280 }
    }).setOrigin(0.5);

    // Crear un botón para cerrar el popup
    const closeButton = scene.add.text(500, 300, 'X', {
        fontFamily: 'PixelArt',
        fontSize: '16px',
        color: '#ff0000',
        backgroundColor: '#ffffff',
        padding: { x: 10, y: 5 }
    }).setOrigin(0.5).setInteractive();

    // Crear un contenedor para agrupar los elementos
    const popupContainer = scene.add.container(0, 0, [popupBackground, popupText, closeButton]);

    // Cerrar el popup al hacer clic en el botón
    closeButton.on('pointerdown', () => {
        popupContainer.destroy(); // Eliminar el popup
    });

    return popupContainer;
}