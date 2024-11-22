export default class Inventory { 

    constructor(player) {
        this.scene = player.scene;
        this.level = player.level;
        this.statusPoints = 0;
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
        key = true;
    }
    //metodo auxiliar para crear los eventos
    createEvents() {
        //cambiar todos los emits por on
        //basicos
        this.scene.events.emit("levelUp");
        this.scene.events.emit("hasCollectedStatusPoint");

        //npcs
        this.scene.events.emit("interactedWithFlush");
        this.scene.events.emit("interactedWithWeiyoung");
        this.scene.events.emit("interactedWithRomeo");
        this.scene.events.emit("interactedWithPiu");

        //boss
        this.scene.events.emit("hasMetJoker");

        //easter eggs
        this.scene.events.emit("MARIA");
        this.scene.events.emit("BING");
        this.scene.events.emit("HAOSHUANG");

        //matar unos cuantos enemigos
        this.scene.events.emit("hasKilledEnemies");
    }

}