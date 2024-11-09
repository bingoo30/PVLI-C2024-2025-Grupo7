import Enemy from "./enemy.js";

export default class Bob extends Enemy{
    constructor(scene, x, y, player){
        super(scene, x, y, player, 'Bob');
        this.scene = scene;
        this.player = player;
        this.scene.add.existing(this);
        super.init(100, 0, 10, 1, 0);

    }
    preUpdate(t,dt){
        super.preUpdate(t, dt);



    }
}