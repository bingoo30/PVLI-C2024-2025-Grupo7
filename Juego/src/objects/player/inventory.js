import { showPopup } from "../../UI/showPopUp.js";

/**
 * Clase inventorio
 */
const MAX_STATUS = 25;
const MAX_ABILITY = 9;
export default class Inventory { 

    constructor(player) {
        this.scene = player.scene;
        this.level = player.level;
        this.usedStatus = 0;
        this.usedAbility = 0;
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
    addUsedAbility() {
        this.usedAbility++;
    }
    addUsedStatus() {
        this.usedStatus++;
    }
    addLevel() {
        this.level++;
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
            showPopup(this.scene, `Logro <<La Batalla Comienza>> desloqueado!`, this.scale.width - 100, this.scale.height - 50);
        });
        this.scene.events.on(this.enemiesKilled == 100, () => {
            this.scene.game.events.emit(`unlock_Asaltante Feroz`);
            showPopup(this.scene, `Logro <<Asaltante Feroz>> desloqueado!`, this.scale.width - 100, this.scale.height - 50);
        });
        this.scene.events.on(this.enemiesKilled == 150, () => {
            this.scene.game.events.emit(`unlock_Dominante de la guerra`);
            showPopup(this.scene, `Logro <<Dominante de la guerra>> desloqueado!`, this.scale.width - 100, this.scale.height - 50);
        });
        this.scene.events.on(this.enemiesKilled == 200, () => {
            this.scene.game.events.emit(`unlock_Destructor del mundo`);
            showPopup(this.scene, `Logro <<Destructor del mundo>> desloqueado!`, this.scale.width - 100, this.scale.height - 50);
        });

        //logros relacionados con status points y abilities
        this.scene.events.on(this.usedStatus == MAX_STATUS, () => {
            this.scene.game.events.emit(`unlock_Julie Pro`);
            showPopup(this.scene, `Logro <<Julie Pro>> desloqueado!`, this.scale.width - 100, this.scale.height - 50);
        });
        this.scene.events.on(this.usedAbility == MAX_ABILITY, () => {
            this.scene.game.events.emit(`unlock_Julie Pro Max`);
            showPopup(this.scene, `Logro <<Julie Pro Max>> desloqueado!`, this.scale.width - 100, this.scale.height - 50);
        });

        //logros nivel
        this.scene.events.on(this.level == 5, () => {
            this.scene.game.events.emit(`unlock_Cogiendo ritmillo`);
            showPopup(this.scene, `Logro <<Cogiendo ritmillo>> desloqueado!`, this.scale.width - 100, this.scale.height - 50);
        });
        this.scene.events.on(this.level == 10, () => {
            this.scene.game.events.emit(`unlock_Buena racha`);
            showPopup(this.scene, `Logro <<Buena racha>> desloqueado!`, this.scale.width - 100, this.scale.height - 50);
        });
        this.scene.events.on(this.level == 20, () => {
            this.scene.game.events.emit(`unlock_Mucha fuerza`);
            showPopup(this.scene, `Logro <<Mucha fuerza>> desloqueado!`, this.scale.width - 100, this.scale.height - 50);
        });
        this.scene.events.on(this.level == 30, () => {
            this.scene.game.events.emit(`unlock_En la Cima`);
            showPopup(this.scene, `Logro <<En la Cima>> desloqueado!`, this.scale.width - 100, this.scale.height - 50);
        });
    }

}