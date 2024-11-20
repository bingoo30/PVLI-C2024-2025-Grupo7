import Enemy from "./enemy.js";
import Bullet from "../Shooting/bullet.js";
import { fire } from "../Shooting/shooter.js";

const TILE_SIZE = 32;
let contadorIntentos = 0;
const LIMITE_INTENTOS = 10;
export default class EnemyShooter extends Enemy
{
    /**
     * Constructor de Player, nuestro caballero medieval con espada y escudo
     * @param {Scene} scene - escena en la que aparece
     * @param {number} x - coordenada x
     * @param {number} y - coordenada y
     * @param {string} type Tipo de character
    */
    constructor(scene, x, y, player) {
        //heredo de la clase character
        super(scene, x, y, 'EnemyShooter');
        this.scene = scene;
        this.player = player;
        this.navMesh = scene.navMesh;
        scene.physics.add.existing(this);
        //configurar los atributos correspondientes despues de llamar al constructor del character
        this.init(200, 200, 5, 1, 0);
        this.currentNode = { x: x, y: y };
        this.body.setSize(16,8);
        this.body.setOffset(8, 24);
        this.path = [];
        this.dead = false;
        //atributos del shooter
        this.shootSpeed = 1250;
        this.cooldownCont = 0;

        this.tileSize = TILE_SIZE * this.scene.scale;

        this.playerTile = {
            x: Math.floor(this.player.x / this.tileSize), y: Math.floor(this.player.y / this.tileSize)
        };
        //console.log(this.playerTile);

        this.enemyTile = {
            x: Math.floor(this.x / this.tileSize), y: Math.floor(this.y / this.tileSize)
        };
        //console.log(this.enemyTile);
    }

    preUpdate(t, dt){
        if (this.scene.isGamePaused) { return; }
        if(this.cooldownCont < 0){
            this.cooldownCont = this.shootSpeed;
            fire(this, this.player, this.scene, this.damage, this.shootSpeed);
        }
        this.cooldownCont = this.cooldownCont - dt;
    }
}   
