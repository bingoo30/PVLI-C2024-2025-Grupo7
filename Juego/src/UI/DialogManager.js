/**
 * Clase para manejar el dialog_plugin cuando hay varios dialogos
 * 
 * 
 */

export default class DialogueManager {
    constructor(scene) {
        this.scene = scene;
        this.dialogPlugin = null;
        this.isDialogueActive = false;
        this.isWaitingForInput = false; 
    }
    initialize(dialogPlugin, dialogues) {

        this.currentDialogueIndex = 0;
        this.dialogPlugin = dialogPlugin;
        this.dialogues = dialogues;

        if (!this.dialogPlugin.visible) this.dialogPlugin.toggleWindow();

        this.scene.input.on('pointerdown', () => {
            if (this.dialogPlugin.visible && this.isWaitingForInput) {
                this.advanceDialogue();
            }
        });

        this.dialogPlugin.closeBtn.on('pointerdown', () => {
            this.skipDialogue();
        });
    }

    showDialogue() {
        if (!this.dialogPlugin) {
            console.error("DialogueManager: dialogPlugin no inicializado.");
            return;
        }
        this.isDialogueActive = true;
        this.isWaitingForInput = false;
        this.scene.isGamePaused = true;
        const currentDialogue = this.dialogues[this.currentDialogueIndex];
        if (currentDialogue) {
            this.dialogPlugin.setText(
                currentDialogue.text,
                true,                 
                currentDialogue.speaker, 
                currentDialogue.isPlayer  // es player o no
            );
        }

        this.scene.time.delayedCall(500, () => {  // Retraso para el input
            this.isWaitingForInput = true;
        });
    }
    
    advanceDialogue() {
        if (this.currentDialogueIndex < this.dialogues.length) {
            this.currentDialogueIndex++;
            this.showDialogue();
        }
        else {
            this.dialogPlugin.toggleWindow();
            this.isDialogueActive = false;
            this.scene.isGamePaused = false;
        }

    }
    skipDialogue() {
        this.currentDialogueIndex = this.dialogues.length; // Salta al final
        this.dialogPlugin.toggleWindow();
        this.isDialogueActive = false;
        this.scene.isGamePaused = false;
    }
}
