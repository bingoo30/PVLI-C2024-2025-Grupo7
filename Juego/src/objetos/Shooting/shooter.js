import Bullet, {Bullet} from './bullet.js'

export default class Shooter extends Phaser.GameObject.Sprite {
    fire(shooter, target) {
        let startX = shooter.x; //posicion de la bala al ser disparado
        let  startY = shotter.y;
        let direction = Math.atan((target.x - this.x) / (target.y - this.y));

        this.setRotation(shooter.rotation);

        if (target.y >= this.y) {
            this.xSpeed = this.speed * Math.sin(this.direction);
            this.ySpeed = this.speed * Math.cos(this.direction);
        }
        else {
            this.xSpeed = -this.speed * Math.sin(this.direction);
            this.ySpeed = -this.speed * Math.cos(this.direction);
        }
        this.setActive(true);
        this.setVisible(true);

        // this.setPosition(shooter.x, shooter.y); // Initial position
        // this.startX = shooter.x; //posicion de la bala al ser disparado
        // this.startY = shotter.y;
        // this.direction = Math.atan((target.x - this.x) / (target.y - this.y));

        // this.setRotation(shooter.rotation);

        // if (target.y >= this.y) {
        //     this.xSpeed = this.speed * Math.sin(this.direction);
        //     this.ySpeed = this.speed * Math.cos(this.direction);
        // }
        // else {
        //     this.xSpeed = -this.speed * Math.sin(this.direction);
        //     this.ySpeed = -this.speed * Math.cos(this.direction);
        // }
        // this.setActive(true);
        // this.setVisible(true);
    }

}
