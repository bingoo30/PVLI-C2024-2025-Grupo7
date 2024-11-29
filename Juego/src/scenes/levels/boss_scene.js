import Player from '../../objects/player/player.js';
import Joker from '../../objects/enemies/joker.js'


class BossScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BossScene' });
    }

    preload() {
        // Load assets (e.g., boss sprite, animations, and sounds)
        this.load.spritesheet('boss', 'assets/boss.png', { frameWidth: 64, frameHeight: 64 });
        this.load.image('projectile', 'assets/projectile.png');
    }

    create() {

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


        // #region Player
        // #region Player Position

        const objectLayer = this.map.getObjectLayer('position');

        const playerPos = objectLayer.objects.find(obj => obj.name == 'playerPosition');

        // Verificar si el objeto fue encontrado
        if (!playerPos) console.log('Position player no encontrado.');
        const playerX = playerPos.x * SCALE;
        const playerY = playerPos.y * SCALE;

        // #endregion


        // #region Player

        this.player = new Player(this, playerX, playerY);
        this.player.setScale(SCALE);
    
        // #endregion

        // #endregion

        // #region Joker

        const jokerPos = objectLayer.objects.find(obj => obj.name == 'jokerPosition');

        this.joker = new Joker(this, jokerPos.x * SCALE, jokerPos.y * SCALE, this.player, this.exp);
        this.joker.setPool(this.enemyBullets);

        this.physics.add.collider(this.player, this.boss, this.onPlayerHit, null, this);

        // #endregion

        //#region UI

        this.expBar = new ExpBar(this, 20, 30);

        this.healthBar = new HealthBar(this, 20, 10);

        const dialogos = this.cache.json.get('dialogues');

        //#region Dialog

        this.dialog = new DialogText(this, {
            borderThickness: 2,
            borderColor: 0xcb3234,
            borderAlpha: 1,
            windowAlpha: 0.8,
            windowColor: 0x000000,
            windowHeight: 180,
            padding: 32,
            closeBtnColor: 'white',
            dialogSpeed: 4,
            fontSize: 25,
            fontFamily: "PixelArt"
        });
        this.dialogManager = new DialogueManager(this);
        this.dialogManager.initialize(this.dialog, dialogos);
        this.dialogManager.showDialogue();

        // #endregion

        // #endregion



        //colision balas-paredes
        this.physics.add.collider(this.playerBullets.getPhaserGroup(), this.paredLayer, (bullet, wall) => {
            bullet.destroyBullet(this.playerBullets);
        });
        this.physics.add.collider(this.enemyBullets.getPhaserGroup(), this.paredLayer, (bullet, wall) => {
            bullet.destroyBullet(this.enemyBullets);
        });
    }

    update(time, delta) {

    }

    onPlayerHit(player, boss) {
        console.log('Player hit by boss');
        // Handle player damage or game over
    }
}
