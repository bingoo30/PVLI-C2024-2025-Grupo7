import NPC from '../../objects/interactable_objects/npc.js';
import ChangeLevelDoor from '../../objects/interactable_objects/change_level_door.js';
import Level from './level.js';
/**
 * Escena principal de juego.
 * @extends Level
 */
export default class Animation extends Level {
	constructor() {
		super(3);
	}
	preload() {
		super.preload();
		this.load.json('dialogues_Piu', '/PVLI-C2024-2025-Grupo7/Juego/assets/dialogues/dialogues_piu.json');
	}

	/**  
	* Creaci�n de los elementos de la escena principal de juego
	*/
	create(data) {
		super.create(data);
		const change = this.positionLayer.objects.find(obj => obj.name == 'changeLevel');
		this.DoorBoss = new ChangeLevelDoor(this, change.x, change.y, 'Vamos por el buen camino',change.width, change.height);

		// #region NPC
		const NPCpos = this.positionLayer.objects.find(obj => obj.name == 'PiuPosition');
		const NPCX = NPCpos.x * SCALE;
		const NPCY = NPCpos.y * SCALE;

		this.Piu = new NPC(this, NPCX, NPCY, 'PiuAnim', 'dialogues_Piu', "gatitu!!!!", true);
		this.Piu.setScale(SCALE);
		this.Piu.play('PiuLoad');
		// #endregion

		//objeto
		this.easterEgg.setAchievement("Cascos de un lloron");
		//
		
		// #region sonido
		this.MainSample = this.sound.add('level2Audio');
		this.MainSample.play();
		this.MainSample.setLoop(true);
		// #endregion
	}
	changeToNextLevel() {
		this.removeListener();
		this.MainSample.stop();
		this.scene.start('BossScene', { player: this.player, tries: this.tries});
	}

	update(t, dt) {
	}
}