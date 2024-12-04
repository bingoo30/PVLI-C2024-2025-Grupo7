import { showPopup } from "./showPopUp.js";


const MAX_STATUS = 5; // maximo que puedes mejorar un status
const radius = 100; // Distancia del this a cada bola
//Icono de los stautus (botones)
export default class StatusIcon extends Phaser.GameObjects.Sprite {
    /**
 * @extends Phaser.GameObjects.Sprite;
 *   //Atributos
     * @param {Scene} scene - escena en la que aparece
     * @param {number} x - coordenada x
     * @param {number} y - coordenada y
     * @param {string} title - titulo
     * @param {number} count - contador que te dice cuanto has mejorado de este status
     * @param {object} player -referencia del player
 */
    constructor(scene, x, y, title, count,player) {
        super(scene, x, y, 'statusBackground');
        // #region atributos
        this.scene = scene;
        this.scale = 0.25;
        this.sprite = sprite;
        this.title = title;
        this.player = player;
        this.count = count;

        // Añadir a la escena y hacerle interactivo
        this.scene.add.existing(this);
        this.setInteractive();
        // #endregion

        // Texto del título.
        this.tooltip = this.scene.add.text(x, y, title, {
            fontFamily: "PixelArt",
            fontSize: 28,
            color: "#000000",
            align: "center",
        }).setOrigin(0.5);
        this.tooltip.visible = true;

        //array que te muestras cuantas veces has mejorado este status
        this.counts = [];

        for (let i = 0; i < MAX_STATUS; i++) {
            //calcular la posicion de cada bola
            const angle = (i / MAX_STATUS) * Math.PI * 2; // Ángulo en radianes
            const ballX = this.x + Math.cos(angle) * radius;
            const ballY = this.y + Math.sin(angle) * radius;
            const iconBall = this.scene.add.image(ballX, ballY, 'statusBall').setScale(0.05);
            iconBall.setVisible(false);
            this.counts.push(iconBall);
        }

        this.on('pointerdown', () => {
            if (this.count < MAX_STATUS) {
                let avaliablePoints = this.player.getStatusPoints();
                this.upgrateStatus(avaliablePoints);
            }
        });
    }
    /**
     * metodo para mejorar un status
     * @param {number} p
     */
    upgrateStatus(p) {
        if (p <= 0) {
            showPopup(this.scene, "No se puede mejorar el status porque no tienes puntos suficientes");
        }
        else {
            //lanzo el evento con la habilidad a desloquear y los puntos restantes
            this.player.upgrateStatus(this.title);


            const statusData = this.scene.cache.json.get('statusData');

            // Buscar el árbol o nodo correspondiente usando el título
            const statusObj = statusData.find(item => item.title === this.title);

            // Aumentar count y guardar en el json para cuando abra la escena
            statusObj.count++;

            // Guardar los datos actualizados en localStorage
            localStorage.setItem('statusData', JSON.stringify(statusData));

            this.counts[this.count].setVisible(true);
            //actualizo el count (para seguir subiendo status en la escena)
            this.count++;
        }
    }
}
