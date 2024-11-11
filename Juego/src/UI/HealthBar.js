
export default class HealthBar {
    constructor(scene) {
        this.scene = scene;
        this.maxWidth = 300;
        this.height = 30; 

        this.x = 20;
        this.y = 10;

        this.container = scene.add.container(this.x, this.y);

        this.background = scene.add.sprite(this.x, this.y, 'healthBarBackground').setOrigin(0, 0);
        this.background.setDisplaySize(this.maxWidth, this.height);

        this.bar = scene.add.sprite(this.x, this.y, 'healthBar').setOrigin(0, 0);
        this.bar.setDisplaySize(this.maxWidth, this.height); 

        this.container.add([this.bar, this.background]);
        this.container.setScrollFactor(0);
    }
    updateHealth(currentHealth, maxHealth) {

        const healthPer = Phaser.Math.Clamp(currentHealth / maxHealth, 0, 1);

        this.bar.setDisplaySize(this.maxWidth * healthPer, this.height); 

        if (healthPer< 0.2){
            this.bar.setTint(0xff0000);  // Rojo
        }
    }

}
