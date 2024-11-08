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
    constructor(scene, x, y, player, typeEnemy, SCALE) {
        //heredo de la clase character
        super(scene, x, y, [typeEnemy]);
        this.scene = scene;
        this.player = player;
        this.scale = SCALE;
        this.navMesh = scene.navMesh;
        scene.physics.add.existing(this);
        //configurar los atributos correspondientes despues de llamar al constructor del character
        this.currentNode = { x: x, y: y };
        this.body.setSize(16,8);
        this.body.setOffset(8, 24);
        this.path = [];
        this.dead = false;
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
        this.onGotHit(damage); // Aplica daño al jugador
    }

    onEnemyDeath() {
        this.dead = true;
        this.onDeath();
    }
    

    /**
     * Bucle principal del personaje, actualizamos su posición y ejecutamos acciones según el Input
     * @param {number} t - Tiempo total
     * @param {number} dt - Tiempo entre frames
     */
    update(t, dt) {
        if (this.dead) return;
        // Calcula la distancia entre Crac y el jugador
        const distance = Phaser.Math.Distance.Between(this.x, this.y, this.player.x, this.player.y);

        // Solo calcula un nuevo camino si está lo suficientemente lejos del jugador
        if (distance > 5 && (this.path.length === 0 || this.atPathEnd())) {
            this.calculatePath();
        }

        // Moverse a lo largo del camino si existe
        if (this.path.length > 0) {
            this.moveAlongPath();
        }

    }
    calculatePath() {
        // Coordenadas del jugador y de Crac en tiles
        const startX = this.scene.map.worldToTileX(this.x);
        const startY = this.scene.map.worldToTileY(this.y);
        const targetX = this.scene.map.worldToTileX(this.player.x);
        const targetY = this.scene.map.worldToTileY(this.player.y);

        // Encuentra el camino y asigna a `this.path`
        this.scene.finder.findPath(startX, startY, targetX, targetY, (path) => {
            if (path === null) {
                console.warn("Path no encontrado.");
            } else {
                this.path = path;
            }
        });
        this.scene.finder.calculate();
    }

    moveAlongPath() {
        // El siguiente paso del camino
        const nextStep = this.path.shift();
        if (!nextStep) return;

        // Convierte coordenadas de tile a coordenadas de mundo
        const targetX = this.scene.map.tileToWorldX(nextStep.x) + this.scene.map.tileWidth * this.scale;
        const targetY = this.scene.map.tileToWorldY(nextStep.y) + this.scene.map.tileHeight * this.scale;

        // Tweens para moverse al siguiente paso
        this.scene.tweens.add({
            targets: this,
            x: targetX,
            y: targetY,
            duration: 500,  // Ajusta la duración según la velocidad deseada
        });
    }

    atPathEnd() {
        // Verifica si ha alcanzado el último punto del camino
        return this.path.length === 0;
    }
}