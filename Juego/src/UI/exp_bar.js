export default class ExpBar {
    constructor(scene, x, y) {
        this.scene = scene;
        this.maxWidth = 150;
        this.height = 15;

        this.x = x;
        this.y = y;

        this.container = scene.add.container(this.x, this.y);

        this.background = scene.add.sprite(this.x, this.y, 'expBarBackground').setOrigin(0, 0);
        this.background.setDisplaySize(this.maxWidth, this.height);

        this.bar = scene.add.sprite(this.x, this.y, 'expBar').setOrigin(0, 0);
        this.bar.setDisplaySize(0, this.height);

        this.container.add([this.bar, this.background]);
        this.container.setScrollFactor(0);
    }
    updateExp(currentExp, max) {

        const expPer = Phaser.Math.Clamp(currentExp / max, 0, 1);

        this.bar.setDisplaySize(this.maxWidth * expPer, this.height);
        //console.log("Porcentaje"+expPer);
    }

}