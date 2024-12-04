/**
 * @extends Phaser.GameObjects.Sprite
 * Constructor de Player, nuestro caballero medieval con espada y escudo
     * @param {Scene} scene - escena en la que aparece
     * @param {number} x - coordenada x
     * @param {number} y - coordenada y
     * @param {number} depth - la capa que va a estar
     * atributos
     * @param {container} container - un contenedor que tiene el bar y text
     * 
 */
export default class ExpBar extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, depth = 3) {
        super(scene, x, y, 'expBarBackground');
        this.scene = scene;
        this.maxWidth = 150;
        this.height = 15;

        this.container = scene.add.container(this.x, this.y);

        this.setOrigin(0, 0);
        this.setDisplaySize(this.maxWidth, this.height);

        this.bar = scene.add.sprite(this.x, this.y, 'expBar').setOrigin(0, 0);
        this.bar.setDisplaySize(0, this.height);

        this.levelText = this.scene.add.text(this.x + this.maxWidth+10, this.y, '1', {
            fontSize: 20,
            fontFamily: "PixelArt",
            fill: '#FFFFFF',
            align: 'left'
        }).setOrigin(0.5, 0);

        this.container.add([this.bar, this, this.levelText]);
        this.container.setScrollFactor(0);
        this.container.setDepth(depth);
    }
    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        const expPer = Phaser.Math.Clamp(this.scene.player.getXpAcu() / this.scene.player.getXpToLevelUp(), 0, 1);

        this.levelText.setText(`${this.scene.player.getLevel()}`);

        this.bar.setDisplaySize(this.maxWidth * expPer, this.height);
    }

}