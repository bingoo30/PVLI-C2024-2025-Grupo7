import Player from '../../objects/player/player.js';
import Joker from '../../objects/enemies/joker.js'

import HealthBar from '../../UI/health_bar.js';
import ExpBar from '../../UI/exp_bar.js';
import Bullet from '../../objects/abilities/shooting/bullet.js';
import Orb from '../../objects/abilities/shooting/orb.js';

import Pool from '../../objects/our_pool.js';
import DamageArea from '../../objects/abilities/area_damage/damage_area.js';
import PickableObjects from '../../objects/interactable_objects/pickable_objects.js';
import Estaka from '../../objects/enemies/estaka.js';


const SCALE = 4;
export default class BossScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BossScene' });
    }

    /**
    * Preload: Carga todos los recursos necesarios antes de iniciar el juego.
    */
    preload() {
        // Load assets (e.g., boss sprite, animations, and sounds)
        this.load.image('boss', 'assets/enemies/joker/joker.png');
        this.load.image('boss', 'assets/enemies/joker/joker_cut_scene.gif');
        this.load.image('projectile', 'assets/bullet/bullet_1.png');


        this.load.tilemapTiledJSON('mapaBoss', 'assets/map/map_boss/map_boss2.json');
        this.load.image('tileset4', 'assets/map/tileset/grass.png');

    }

    /**
    * Creación de los elementos de la escena principal de juego
    */
    create(data) {
        this.sound.stopAll(); // Detiene todos los sonidos en reproducción

        // #region Map Setup

        this._tries = data.tries;
        console.log("tries: " + this._tries);

        this.mapBoss = this.make.tilemap({ key: 'mapaBoss' });
        this.tileset = this.mapBoss.addTilesetImage('Grass', 'tileset4');
        this.sueloLayer = this.mapBoss.createLayer('suelo', this.tileset);
        if (!this.sueloLayer) console.error("La capa 'suelo' no se ha creado correctamente.");

        this.paredLayer = this.mapBoss.createLayer('pared', this.tileset);
        if (!this.paredLayer) console.error("La capa 'pared' no se ha creado correctamente.");

        this.sueloLayer.setScale(SCALE);
        this.paredLayer.setScale(SCALE);
        // #endregion

        // #region Player Setup
        // #region Player Position
        const objectLayer = this.mapBoss.getObjectLayer('position');
        if (!objectLayer) console.log('object no encontrado.');

        const playerPos = objectLayer.objects.find(obj => obj.name === 'playerPosition');
        const jokerPos = objectLayer.objects.find(obj => obj.name === 'jokerPosition');

        if (!jokerPos) console.log('Position joker no encontrado.');
        if (!playerPos) console.log('Position player no encontrado.');

        const jokerX = jokerPos.x * SCALE;
        const jokerY = jokerPos.y * SCALE;

        const playerX = playerPos.x * SCALE;
        const playerY = playerPos.y * SCALE;
        // #endregion

        this.player = new Player(this, playerX, playerY);
        this.player.setScale(SCALE);
        this.registry.set('player', this.player);
        // #endregion


        // #region Pools Setup
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

        //pool balas explosivas (francotirador explosivo)
        this.areaFE = new Pool(this, MAX, 'Area');
        for (let i = 0; i < MAX; i++) {
            let toAdd = new DamageArea(this, 0, 0, 100, 0, '30_expl_anim');
            toAdds.push(toAdd);
        }
        this.areaFE.addMultipleEntity(toAdds);

        toAdds = [];
        this.playerExplosiveBullets = new Pool(this, MAX, 'Bullet');
        for (let i = 0; i < MAX; i++) {
            let toAdd = new ExplosiveBullet(this, 0, 0, 'Bala2', 75, this.areaFE);
            toAdds.push(toAdd);
        }
        this.playerExplosiveBullets.addMultipleEntity(toAdds);


        this.joker = new Joker(this, jokerX, jokerY, this.player);
        console.log('joker:', this.joker.x, this.joker.y);


        // #region Enemy Bullets
        toAdds = [];
        this.jokerBullets = new Pool(this, MAX, 'Card');
        for (let i = 0; i < MAX; i++) {
            // scene, damage, speed, bala, scale
            let toAdd = new Bullet(this, 0, 0, 'Card', 0.25);
            toAdds.push(toAdd);
        }
        this.jokerBullets.addMultipleEntity(toAdds);

        const MAXOrbs = 60;
        toAdds = [];
        this.jokerOrbs = new Pool(this, MAXOrbs, 'Orbs');
        for (let i = 0; i < MAXOrbs; i++) {
            const orb = new Orb(this, this.joker, i, i % 3, 0, SCALE, this.player);
            toAdds.push(orb);
        }
        this.jokerOrbs.addMultipleEntity(toAdds);


        toAdds = [];
        this.area = new Pool(this, MAX, '03_expl_anim');
        for (let i = 0; i < MAX; i++) {
            let toAdd = new DamageArea(this, 0, 0, 100, 0, '03_expl_anim');
            toAdds.push(toAdd);
        }
        this.area.addMultipleEntity(toAdds);
        console.log(this.area);

        this.actOrbs = [];
        this.activeOrbsCount = 0;


        // #region Joker Setup
        this.joker.setScale(0.4);
        this.joker.setPool(this.jokerBullets);
        this.joker.setPool2(this.jokerOrbs);
        this.joker.setDamageArea(this.area);
        // #endregion

        // #endregion

        // #endregion

        

        // #region Collisions and Interactions
        this.physics.add.collider(this.player, this.joker, this.onPlayerHit, null, this);

        this.paredLayer.setCollisionByProperty({ collides: true });

        this.physics.add.collider(this.joker, this.paredLayer);
        this.physics.add.collider(this.player, this.paredLayer);

        this.physics.add.collider(this.playerBullets.getPhaserGroup(), this.paredLayer, (bullet, wall) => {
            bullet.destroyBullet(this.playerBullets);
        });

        this.physics.add.collider(this.jokerBullets.getPhaserGroup(), this.paredLayer, (bullet, wall) => {
            bullet.destroyBullet(this.jokerBullets);
        });

        this.physics.add.overlap(this.player, this.joker, (player, enemy) => {
            if (enemy.visible) {
                player.knockback(500, enemy);
                player.onGotHit(enemy.getDamage());
            }
        });

        this.physics.add.collider(this.jokerOrbs.getPhaserGroup(), this.paredLayer, (bullet, wall) => {
            bullet.destroyBullet(this.jokerOrbs);
        });

        this.physics.add.collider(this.jokerBullets.getPhaserGroup(), this.player, (bullet, player) => {
            player.knockback(200, bullet);
            player.onGotHit(bullet.getDamage());
            bullet.destroyBullet(this.jokerBullets);
        });

        this.physics.add.overlap(this.playerBullets.getPhaserGroup(), this.joker, (playerBullet, joker) => {
            joker.onGotHit(playerBullet.getDamage());
            playerBullet.destroyBullet(this.playerBullets);
        });

        this.physics.add.overlap(this.player, this.jokerOrbs.getPhaserGroup(), (player, orb) => {
            player.knockback(200, orb);
            player.onGotHit(orb.getDamage());
            orb.destroyBullet(this.jokerOrbs);
        });
        // #endregion

        // #region UI
        this.expBar = new ExpBar(this, 20, 30);
        this.healthBar = new HealthBar(this, 20, 10, this.player);

        this.bossHealthBar = new HealthBar(this, 200, 10, this.joker);

        // #endregion

        // #region Camera Setup
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(this.sueloLayer);
        // #endregion

        // #region sonido
        this.MainSample = this.sound.add('jokerAudio');
        this.MainSample.setLoop(true);
        this.MainSample.play();
		// #endregion

    }

    checkActiveOrbs(orb) {
        // Incrementa el contador de orbes activas cada vez que una orbe est?lista
        this.activeOrbsCount++;

        this.actOrbs.push(orb);

        console.log('activeOrbsCount', this.activeOrbsCount)
        if (this.activeOrbsCount >= 3) {
            this.activeOrbsCount = 0;
            // Cuando haya 3 orbes empieza a moverlas
            this.startOrbsMovement();
        }
    }

    startOrbsMovement() {
        // Hace que todas las orbes activas se muevan hacia el jugador
        this.actOrbs.forEach(orb => {
            if (orb.isActive) {
                orb.follow = true;  // Indica que las orbes deben empezar a seguir al jugador
                orb.start = false;
            }
        });

        this.actOrbs = [];
    }

    changeToGameover() {
        this.scene.start("gameover", { tries: this._tries });
    }
    pauseGame() {
        this.scene.launch("Pause", { previousScene: this.scene.key }); // Lanzar la escena de pausa
        this.scene.pause(); // Pausar la escena actual
    }
    resumeGame() {
        this.scene.resume(); // Reanudar la escena actual
        this.scene.stop("Pause"); // Detener la escena de pausa
    }
    update(time, delta) {

    }

    onPlayerHit(player, boss) {
        console.log('Player hit by boss');
        // Handle player damage or game over
    }
}
