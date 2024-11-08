import Character from '../../objetos/Player/character.js';


const TILE_SIZE = 32;
let contadorIntentos = 0;
const LIMITE_INTENTOS = 10
export default class Enemy extends Character {
    /**
     * Constructor de los enemigos
     * @param {Scene} scene - escena en la que aparece
     * @param {number} x - coordenada x
     * @param {number} y - coordenada y
     * @param {phaser.Character} type Tipo de character
     * @param {phaser.player} player Jugador (target) a perseguir
     * 
    */
    constructor(scene, x, y, player, typeEnemy) {
        //heredo de la clase character
        super(scene, x, y, [typeEnemy]);
        this.scene = scene;
        this.player = player;
        this.navMesh = scene.navMesh;
        scene.physics.add.existing(this);
        this.currentPath = [];
        this.targetPoint = null;  // Pr�ximo punto objetivo
        //configurar los atributos correspondientes despues de llamar al constructor del character
        this.currentNode = { x: x, y: y };
        this.body.setSize(16,8);
        this.body.setOffset(8, 24);
        this.path = [];
        this.dead = false;


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


    init(speedFactor, shootSpeed, life, damage, prob) {
        this.speedFactor = speedFactor;
        this.shootSpeed = shootSpeed;
        this.life = life;
        this.damage = damage;
        this.prob = prob;
    }
    
    getDamage() {
        return this.damage;
    }

    onEnemyGotHit(damage) {
        this.onGotHit(damage); // Aplica da�o al jugador
    }

    onEnemyDeath() {
        this.dead = true;
        this.onDeath();
    }
   

    /**
     * Bucle principal del personaje, actualizamos su posici�n y ejecutamos acciones seg�n el Input
     * @param {number} t - Tiempo total
     * @param {number} dt - Tiempo entre frames
     */
    update(t, dt) {
        /*
        if (!this.dead) {
            this.enemyTile = {
                x: Math.floor(this.body.position.x / this.tileSize),
                y: Math.floor(this.body.position.y / this.tileSize)
            };

            this.playerTile = {
                x: Math.floor(this.player.x / this.tileSize),
                y: Math.floor(this.player.y / this.tileSize)
            };

            // Si no hay un camino, encuentra uno
            if (this.path.length === 0) {
                this.path = this.navMesh.findPath(this.enemyTile.x, this.enemyTile.y, this.playerTile.x, this.playerTile.y);
            }

            this.moverEnemigo();
        }
        */
    


        if (this.dead) return;
        if (!this.targetPoint) return;

        // Comprobar si ha alcanzado el pr�ximo punto
        const distanceToTarget = Phaser.Math.Distance.Between(this.x, this.y, this.targetPoint.x, this.targetPoint.y);
        if (distanceToTarget < 4) {  // Precisi�n al llegar al punto
            this.moveToNextPoint();  // Mover al siguiente punto
        }

    }
    setPath(path) {
        // Establece el camino calculado con EasyStar
        this.currentPath = path;
        this.moveToNextPoint();  // Inicia el movimiento hacia el primer punto
    }

    moveToNextPoint() {
        if (this.currentPath.length === 0) {
            // Si no hay m�s puntos, det�n el movimiento
            this.body.setVelocity(0, 0);
            return;
        }

        // Siguiente paso en la ruta
        const nextStep = this.currentPath.shift();
        if (!nextStep) return;

        // Convertir coordenadas de tiles a coordenadas del mundo
        const targetX = this.scene.map.tileToWorldX(nextStep.x) + this.scene.map.tileWidth * 0.5;
        const targetY = this.scene.map.tileToWorldY(nextStep.y) + this.scene.map.tileHeight * 0.5;

        // Calcular la direcci�n hacia el pr�ximo punto
        const directionX = targetX - this.x;
        const directionY = targetY - this.y;
        const distance = Math.sqrt(directionX * directionX + directionY * directionY);

        // Normalizar la direcci�n y establecer la velocidad
        this.body.setVelocity((directionX / distance) * this.speed, (directionY / distance) * this.speed);

        // Guardar el punto de destino actual
        this.targetPoint = { x: targetX, y: targetY };
    }
}