import Character from '../../objetos/Player/character.js';
export default class Enemy extends Character {
    /**
     * Constructor de Player, nuestro caballero medieval con espada y escudo
     * @param {Scene} scene - escena en la que aparece
     * @param {number} x - coordenada x
     * @param {number} y - coordenada y
     * @param {string} type Tipo de character
    */
    constructor(scene, x, y, player) {
        //heredo de la clase character
        super(scene, x, y, 'Enemy');
        this.scene = scene;
        this.player = player;
        this.navMesh = scene.navMesh;
        
        scene.physics.add.existing(this);
        //configurar los atributos correspondientes despues de llamar al constructor del character
        this.init(200, 200, 5, 1, 0);

        this.body.setSize(16,8);
        this.body.setOffset(8, 24);

        this.pathIndex = 0;

    }

    setPath(path) {
        this.path = path;
        this.currentNodeIndex = 0;
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
        this.onDeath();
    }



    /**
     * Bucle principal del personaje, actualizamos su posición y ejecutamos acciones según el Input
     * @param {number} t - Tiempo total
     * @param {number} dt - Tiempo entre frames
     */
    update(t, dt) {
        const tileSize = 32 * this.scene.scale;
        //console.log("player", tileSize);

        const playerTile = {
            x: Math.floor(this.player.x / tileSize), y: Math.floor(this.player.y / tileSize)
        };
        console.log(playerTile);

        const enemyTile = {
            x: Math.floor(this.x / tileSize), y: Math.floor(this.y / tileSize)
        };

        console.log(enemyTile);

        // Encontrar la ruta usando `findPath`
        const path = this.navMesh.findPath(enemyTile.x, enemyTile.y, playerTile.x, playerTile.y);

        // Si hay una ruta, mover al enemigo hacia el primer nodo de la ruta
        if (path.length > 0) {
            const nextNode = path[0];
            console.log("Next Node:", nextNode);
            const targetX = nextNode.x * 32 * tileSize;
            const targetY = nextNode.y * 32 * tileSize;

            // Calcular el movimiento hacia el próximo nodo
            const deltaX = targetX - this.x;
            const deltaY = targetY - this.y;
            const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

            if (distance < 2) {
                this.body.setVelocity(0);
                path.shift();  // Si está cerca del nodo, pasamos al siguiente
            } else {
                // Mover en dirección al próximo nodo
                //this.x += (deltaX / distance) * this.speedFactor * (dt / 1000);
                //this.y += (deltaY / distance) * this.speedFactor * (dt / 1000);

                const velocityX = (deltaX / distance) * this.speedFactor; // Normalizar y multiplicar por la velocidad
                const velocityY = (deltaY / distance) * this.speedFactor; 
                this.body.setVelocity(velocityX, velocityY);
                console.log("mov enemy")

            }
        } else {
            console.log("no hay path")
        }
    }
}