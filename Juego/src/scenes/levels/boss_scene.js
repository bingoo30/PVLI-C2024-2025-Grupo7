import Player from '../../objects/player/player.js';
import Joker from '../../objects/enemies/joker.js'

import Crac from '../../objects/enemies/crac.js'
import HealthBar from '../../UI/health_bar.js';
import ExpBar from '../../UI/exp_bar.js';
import Coin from '../../objects/enemies/coin.js';
import Bullet from '../../objects/abilities/shooting/bullet.js';

import Pool from '../../objects/our_pool.js'
import Bob from '../../objects/enemies/bob.js';
import Letus from '../../objects/enemies/letus.js';
import Mutum from '../../objects/enemies/mutum.js'
import Estaka from '../../objects/enemies/estaka.js';
import Turret from '../../objects/habilities/turret.js';

import DialogueManager from '../../UI/dialog_manager.js';
import DialogText from '../../UI/dialog_plugin.js';
import NPC from '../../objects/interactable_objects/npc.js';
import Door from '../../objects/interactable_objects/door.js';
import DamageArea from '../../objects/abilities/area_damage/damage_area.js';
import PickableObjects from '../../objects/interactable_objects/pickable_objects.js';

const SCALE = 4;
export default class BossScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BossScene' });
    }

    preload() {
        // Load assets (e.g., boss sprite, animations, and sounds)
        this.load.image('boss', 'assets/enemies/joker.png');
        this.load.image('projectile', 'assets/bullet/bullet_1.png');


        this.load.tilemapTiledJSON('mapa4', 'assets/map/map_boss/boss.json');
        this.load.image('tileset4', 'assets/map/tileset/grass.png');

    }

    create() {
        // #region Map

        this.map = this.make.tilemap({ key: 'mapa1'});
        this.tileset = this.map.addTilesetImage('mapTiles', 'tileset1');
        this.sueloLayer = this.map.createLayer('suelo', this.tileset);


        if (!this.sueloLayer) {
            console.error("La capa 'suelo' no se ha creado correctamente.");
        }
       
        this.sueloLayer.setScale(SCALE);

        // #endregion

        // #region Player
        // #region Player Position

        const objectLayer = this.map.getObjectLayer('position');

        const playerPos = objectLayer.objects.find(obj => obj.name == 'playerPosition');
        const jokerPos = objectLayer.objects.find(obj => obj.name == 'playerPosition');
        // Verificar si el objeto fue encontrado
        if (!jokerPos) console.log('Position joker no encontrado.');
        if (!playerPos) console.log('Position player no encontrado.');

        const jokerX = playerPos.x * SCALE;
        const jokerY = playerPos.y * SCALE;

        const playerX = playerPos.x * SCALE;
        const playerY = playerPos.y * SCALE;

        // #endregion


        // #region Player

        this.player = new Player(this, playerX, playerY);
        this.player.setScale(SCALE);
        // Guarda la referencia en el registry
        this.registry.set('player', this.player);

        // #endregion

        // #endregion


        // #region Pools

        const MAX = 300;

        // #region Player Bullets

        let toAdds = [];

        this.playerBullets = new Pool(this, MAX, 'Bullet');
        for (let i = 0; i < MAX; i++) {
            let toAdd = new Bullet(this, 0, 0, 'Bala2');
            toAdds.push(toAdd);
        }
        this.playerBullets.addMultipleEntity(toAdds);
        this.player.setPool(this.playerBullets);

        // #endregion

        // #region Enemy Bullets

        toAdds = [];
        this.enemyBullets = new Pool(this, MAX, 'Bullet');
        for (let i = 0; i < MAX; i++) {
            let toAdd = new Bullet(this, 0, 0, 'Bala');
            toAdds.push(toAdd);
        }
        this.enemyBullets.addMultipleEntity(toAdds);

        // #endregion

        // #endregion



        // #region Joker

       

        this.joker = new Joker(this, jokerX, jokerY, this.player, this.exp);
        this.joker.setPool(this.enemyBullets);

        this.physics.add.collider(this.player, this.boss, this.onPlayerHit, null, this);

        // #endregion

        //#region UI

        this.expBar = new ExpBar(this, 20, 30);

        this.healthBar = new HealthBar(this, 20, 10);

        // #endregion



        //colision balas-paredes
        this.physics.add.collider(this.playerBullets.getPhaserGroup(), this.paredLayer, (bullet, wall) => {
            bullet.destroyBullet(this.playerBullets);
        });
        this.physics.add.collider(this.enemyBullets.getPhaserGroup(), this.paredLayer, (bullet, wall) => {
            bullet.destroyBullet(this.enemyBullets);
        });


        this.cameras.main.startFollow(this.player);

    }

    update(time, delta) {

    }

    onPlayerHit(player, boss) {
        console.log('Player hit by boss');
        // Handle player damage or game over
    }
}
