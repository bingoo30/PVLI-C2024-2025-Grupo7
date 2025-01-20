import NPC from '../../objects/interactable_objects/npc.js';
import ChangeLevelDoor from '../../objects/interactable_objects/change_level_door.js';
import Level from './level.js';


//constante
const SCALE = 4;
/**
 * Escena principal de juego.
 * @extends Level
 */
export default class Animation extends Level {

	constructor() {
		super(2);
	}
	preload() {
		super.preload();
		// dialogos level2
		this.load.json('dialogues_Weiyoung', '/PVLI-C2024-2025-Grupo7/Juego/assets/dialogues/dialogues_weiyoung.json');
		this.load.image('Weiyoung', '/PVLI-C2024-2025-Grupo7/Juego/assets/character/weiyoung.png');
	}

	/**  
	* Creaci�n de los elementos de la escena principal de juego
	*/
	create(data) {
		super.create(data);

		const change = objectLayer.objects.find(obj => obj.name == 'changeLevel');
		this.DoorLevel3 = new ChangeLevelDoor(this, change.x, change.y, 'Si, hay mas...',change.width, change.height);

		// #region NPC
		const NPCpos = objectLayer.objects.find(obj => obj.name == 'weiyoungPosition');
		const NPCX = NPCpos.x * SCALE;
		const NPCY = NPCpos.y * SCALE;

		this.Weiyoung = new NPC(this, NPCX, NPCY, 'Weiyoung', 'dialogues_Weiyoung', "Choque cultural", true);
		this.Weiyoung.setScale(SCALE);
		// #endregion


		this.physics.add.collider(this.player, this.Weiyoung);

		// #region sonido
		this.MainSample = this.sound.add('level2Audio');
		this.MainSample.play();
		this.MainSample.setLoop(true);
		// #endregion
	}
	changeToNextLevel() {
		this.removeListener();
		this.MainSample.stop();
		this.scene.start('level3', { player: this.player, tries: this.tries});
	}
	update(t, dt) {
	}
}