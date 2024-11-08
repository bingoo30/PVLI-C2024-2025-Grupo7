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
    /*
    obtenerSiguienteNodo() {
        if (this.path.length > 0) {
            return this.path.shift(); // Retorna el siguiente nodo de la ruta
        }
        console.warn("No hay nodos en la ruta.");
        return null; // Devuelve null si no hay nodos
    }

    moverA(destino) {
        if (!destino) {
            console.error("Destino inv�lido:", destino);
            return; // Si destino es inv�lido, salir
        }

        // Aseg�rate de que la posici�n del destino sea v�lida
        const targetX = destino.x * this.navMesh.tileSize;
        const targetY = destino.y * this.navMesh.tileSize;
        console.log(`targetX: `, targetX, `targetY: `, targetY);

        const velocidad = 1; // Velocidad en p�xeles por segundo

        // Calcula la distancia hasta el destino
        const dx = targetX - this.body.position.x;
        const dy = targetY - this.body.position.y;
        console.log(`dx: `, dx, `dy: `, dy);

        const distancia = Math.sqrt(dx * dx + dy * dy);

        // Verifica si el enemigo ha llegado al destino
        if (distancia < velocidad * this.scene.physics.world.step) {
            // Si est� cerca, posiciona al enemigo en el nodo destino y det�n el movimiento
            this.body.position.x = targetX; // Actualiza usando el tama�o de los tiles
            this.body.position.y = targetY;
            this.body.setVelocity(0, 0); // Detiene cualquier velocidad residual
            console.log(`Enemigo ha llegado al nodo: (${destino.x}, ${destino.y})`);
            return true; // Indica que el nodo ha sido alcanzado
        } else {
            const proporcion = velocidad * this.scene.physics.world.step / distancia; // Mantiene la proporci�n
            const velocidadX = dx * proporcion;
            const velocidadY = dy * proporcion;
            console.log(`Enemigo velocidad a: `,velocidadX,velocidadY);

            this.body.setVelocity(velocidadX, velocidadY);
            console.log(`Enemigo movi�ndose a: (${this.body.position.x.toFixed(2)}, ${this.body.position.y.toFixed(2)})`);
            return false; // Indica que el nodo a�n no ha sido alcanzado
        }
    }



    moverEnemigo() {
        const nextNode = this.obtenerSiguienteNodo();

        if (!nextNode) {
            console.warn("No hay siguiente nodo para mover al enemigo.");
            return; // No hay siguiente nodo, salir
        }

        // Aseg�rate de que nextNode tenga propiedades v�lidas
        if (nextNode.x === undefined || nextNode.y === undefined) {
            console.error("Nodo inv�lido:", nextNode);
            return; // Salir si el nodo es inv�lido
        }

        // Comprobar si el nodo es caminable
        if (!this.navMesh.isWalkable(nextNode.x, nextNode.y)) {
            this.contadorIntentos++;
            if (this.contadorIntentos >= LIMITE_INTENTOS) {
                console.log("Enemigo atascado, buscando nueva ruta...");
                this.path = this.navMesh.findPath(this.enemyTile.x, this.enemyTile.y, this.playerTile.x, this.playerTile.y);
                this.contadorIntentos = 0; // Reinicia el contador
                return;
            }
        } else {
            this.contadorIntentos = 0; // Reinicia si se mueve correctamente
            this.moverA(nextNode); // Mueve al enemigo hacia el siguiente nodo
        }
    }

    */

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
    }

}