import NPC from '../../objects/interactable_objects/npc.js';
import ChangeLevelDoor from '../../objects/interactable_objects/change_level_door.js';
import Level from './level.js';
/**
 * Escena principal de juego.
 * @extends Level
 */
const SCALE = 4;

export default class Animation extends Level {

	constructor() {
		super(1);
	}
	preload() {
		super.preload(); // Llama al preload de la clase base
		this.load.json('dialogues', '/PVLI-C2024-2025-Grupo7/Juego/assets/dialogues/dialogues_intro.json');
		this.load.json('dialogues_Flush', '/PVLI-C2024-2025-Grupo7/Juego/assets/dialogues/dialogues_flush.json');
		this.load.image('Flush', '/PVLI-C2024-2025-Grupo7/Juego/assets/character/flush.png');
		//para los dialogos del inicio
		this.load.image('bossGif', '/PVLI-C2024-2025-Grupo7/Juego/assets/enemies/joker/joker_cut_scene.gif');
	}

	/**  
	* Creación de los elementos de la escena principal de juego
	*/
	create(data) {
		super.create(data); // Llama al create de la clase base
		
		//puerta para cambiar de nivel
		const change = this.positionLayer.objects.find(obj => obj.name == 'changeLevel');
		this.DoorLevel2 = new ChangeLevelDoor(this, change.x, change.y, 'El comienzo de todo',change.width, change.height);

		// #region NPC
		const NPCpos = this.positionLayer.objects.find(obj => obj.name == 'FlushPosition');
		const NPCX = NPCpos.x * SCALE;
		const NPCY = NPCpos.y * SCALE;

		this.Flush = new NPC(this, NPCX, NPCY, 'Flush', 'dialogues_Flush', "Caballero generoso");
		this.Flush.setScale(SCALE);
		// #endregion

		//objeto
		this.easterEgg.setAchievement("teclados machacados");
		//

		this.physics.add.collider(this.player, this.Flush);
		if (this.tries == 1) {
			const dialogos = this.cache.json.get('dialogues');
			this.changeToDialogScene({ sceneKey: this.scene.key, backgroundType: 'dark', dialogos: dialogos, image:'boss' });
		}

		// #region sonido
		this.MainSample = this.sound.add('level1Audio');
		this.MainSample.setLoop(true);
		this.MainSample.play();
		// #endregion
		

	}
	changeToNextLevel() {
		this.removeListener();
		this.MainSample.stop();
		this.scene.start('level2', { player: this.player, tries: this.tries });
	}
	update(t, dt) {
	}
}
