import Player from '../../objects/player/player.js';
import Joker from '../../objects/enemies/joker.js'

import HealthBar from '../../UI/health_bar.js';
import ExpBar from '../../UI/exp_bar.js';
import Coin from '../../objects/enemies/coin.js';
import Bullet from '../../objects/abilities/shooting/bullet.js';
import Orb from '../../objects/abilities/shooting/orb.js';

import Pool from '../../objects/our_pool.js';
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
        this.load.image('boss', 'assets/enemies/bob.png');
        this.load.image('projectile', 'assets/bullet/bullet_1.png');


        this.load.tilemapTiledJSON('mapaBoss', 'assets/map/map_boss/map_boss.json');
        this.load.image('tileset4', 'assets/map/tileset/grass.png');

    }

    create() {
        // #region Map

        this.mapBoss = this.make.tilemap({ key: 'mapaBoss'});
        this.tileset = this.mapBoss.addTilesetImage('Grass', 'tileset4');
        this.sueloLayer = this.mapBoss.createLayer('suelo', this.tileset);


        if (!this.sueloLayer) {
            console.error("La capa 'suelo' no se ha creado correctamente.");
        }
       
        this.sueloLayer.setScale(SCALE);

        // #endregion

        // #region Player
        // #region Player Position

        const objectLayer = this.mapBoss.getObjectLayer('position');
        if (!objectLayer) console.log('object no encontrado.');

        //const playerPos = objectLayer.objects.find(obj => obj.name == 'playerPosition');
        //const jokerPos = objectLayer.objects.find(obj => obj.name == 'jokerPosition');
        // Verificar si el objeto fue encontrado
      //  if (!jokerPos) console.log('Position joker no encontrado.');
        //if (!playerPos) console.log('Position player no encontrado.');

        //const jokerX = playerPos.x * SCALE;
//        const jokerY = playerPos.y * SCALE;

  //      const playerX = playerPos.x * SCALE;
    //    const playerY = playerPos.y * SCALE;

        // #endregion


        // #region Player

        this.player = new Player(this, 134 , 139);
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
        this.jokerBullets = new Pool(this, MAX, 'Bullet');
        for (let i = 0; i < MAX; i++) {
            let toAdd = new Bullet(this, 0, 0, 'Bala');
            toAdds.push(toAdd);
        }
        this.jokerBullets.addMultipleEntity(toAdds);

        const MAXOrbs = 6;
        toAdds = [];

        this.jokerOrbs = new Pool(this, MAXOrbs, 'Orbs');
        for (let i = 0; i < MAXOrbs; i++) {
            // scene, index, color, damage, scale, target
            const orb = new Orb(this, i, i % 3, 0, SCALE, this.player); // Usa un color basado en el índice
            toAdds.push(orb);
        }
        this.jokerOrbs.addMultipleEntity(toAdds);

        // #endregion

        // #endregion



        // #region Joker

        this.joker = new Joker(this, 140, 140, this.player);
        this.joker.setPool(this.jokerBullets);
        this.joker.setPool2(this.jokerOrbs);
        this.joker.setScale(SCALE);

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
        this.physics.add.collider(this.jokerBullets.getPhaserGroup(), this.paredLayer, (bullet, wall) => {
            bullet.destroyBullet(this.jokerBullets);
        });

        // player - Orb
        this.physics.add.collider(this.player, this.jokerOrbs.getPhaserGroup(), (player, orb) => {
            player.knockback(200, orb);
            player.onGotHit(orb.getDamage());

            // mandaria a la pool de las orbs del joker otra vez
            orb.destroyBullet(this.jokerOrbs);
        })

        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(this.sueloLayer);

    }

    update(time, delta) {

    }

    onPlayerHit(player, boss) {
        console.log('Player hit by boss');
        // Handle player damage or game over
    }
}
