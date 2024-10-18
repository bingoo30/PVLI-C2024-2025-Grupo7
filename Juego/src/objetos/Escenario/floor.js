/**
 * Clase que representa el suelo, es de tipo Sprite pero no tiene una imagen asociada
 * Tendra un collider para que los personajes no caigan por debajo
 */
export default class Floor extends Phaser.GameObjects.Sprite {

  constructor(scene, y) {
    super(scene, 0, scene.sys.game.canvas.height-y);

    this.scene.physics.add.existing(this, true); //Añadimos la caja a las físicas con 'true' para marcar que es un objeto estático, servirá de suelo. physics.add.existing también lo añade a la escena

    this.scene.physics.add.collider(this);

    // Cambiamos el tamaño del body para ocupar todo el ancho de la escena
    this.body.width = scene.sys.game.canvas.width+100;
    this.body.height = 10;
  }
}