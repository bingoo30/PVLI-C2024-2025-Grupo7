import Obstacle from "./obstacle.js";

const RETRACTABLE_SPIKE_DAMAGE = 5;
const DEFAULT_SWAPPING_COOLDOWN = 4000;
/**
* @extends Obstacle
*/
//pinchos dinamicos
export default class RetractableSpike extends Obstacle {
    constructor(scene, x, y) {
        super(scene, x, y, "Retractable_Spikes");
        this.init(RETRACTABLE_SPIKE_DAMAGE);

        // Estado inicial y configuración
        this.isExtended = false; // Estado del pincho
        this.extensionTime = DEFAULT_SWAPPING_COOLDOWN; // Tiempo entre subidas y bajadas (ms)

        // Iniciar el movimiento alternante
        this.scene.time.addEvent({
            delay: this.extensionTime, // Tiempo entre cada ciclo
            callback: this.toggleSpike,
            callbackScope: this,
            loop: true
        });
    }
    init(damage) {
        super.init(damage);
    }
    /**
     * Alternar entre extenderse y retraerse
     */
    toggleSpike() {
        if (this.isExtended) {
            // quitar la colision
            this.body.checkCollision.none = false;
        } else {
            // volver a poner
            this.body.checkCollision.none = true;
        }

        // Cambiar el estado
        this.isExtended = !this.isExtended;
        console.log(this.isExtended);
    }
}