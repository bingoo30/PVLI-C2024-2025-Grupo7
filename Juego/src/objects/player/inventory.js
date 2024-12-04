/**
 * Clase inventorio
 */
const MAX_STATUS = 25;
const MAX_ABILITY =;
export default class Inventory { 

    constructor(player) {
        this.scene = player.scene;
        this.level = player.level;
        this.usedStatus = player.usedStatusPoint;
        this.enemiesKilled = 0;
        this.key = false;
        //completar cuantos objetos hay
        this.objects = [];
        this.createEvents();
    }
    addObject(obj) {
        this.objects.push(obj);
    }
    addKilledEnemies() {
        this.enemiesKilled++;
    }
    collectKey() {
       // console.log('llave conseguida');
        this.key = true;
    }
    //metodo auxiliar para crear los eventos
    createEvents() {
        //logros relacionados con enemigos matados
        this.scene.events.on(this.enemiesKilled == 50, () => {
            this.scene.game.events.emit(`unlock_La Batalla Comienza`);
        });
        this.scene.events.on(this.enemiesKilled == 100, () => {
            this.scene.game.events.emit(`unlock_Asaltante Feroz`);
        });
        this.scene.events.on(this.enemiesKilled == 150, () => {
            this.scene.game.events.emit(`unlock_Dominante de la guerra`);
        });
        this.scene.events.on(this.enemiesKilled == 200, () => {
            this.scene.game.events.emit(`unlock_Destructor del mundo`);
        });

        //logros relacionados con status points y abilities
        this.scene.events.on(this.usedStatus == MAX_STATUS, () => {
            this.scene.game.events.emit(`unlock_Julie Pro`);
        });
        this.scene.events.on(this.usedStatus == MAX_ABILITY, () => {
            this.scene.game.events.emit(`unlock_Julie Pro`);
        });
    }

}