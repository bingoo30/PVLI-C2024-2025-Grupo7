/**
 * Clase para manejar el dialog_plugin cuando hay varios dialogos
 * 
 */

export default class DialogueManager {
    constructor(scene, dialogues) {
        this.scene = scene; 
        this.dialogues = dialogues; //dialogos
        this.currentDialogueIndex = 0; //dialogo actual
        this.dialogPlugin = null;
    }

    initialize(dialogPlugin) {
        this.dialogPlugin = dialogPlugin;

        this.scene.input.on('pointerdown', () => {
            if (this.dialogPlugin.visible) {
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
        const currentDialogue = this.dialogues[this.currentDialogueIndex];
        if (currentDialogue) {
            this.dialogPlugin.setText(
                currentDialogue.text,
                true,                 
                currentDialogue.speaker, 
                currentDialogue.isPlayer  // es player o no
            );
        }
    }
    
    advanceDialogue() {
        if (this.currentDialogueIndex < this.dialogues.length) {
            this.currentDialogueIndex++;
            this.showDialogue();
        }
        else this.dialogPlugin.toggleWindow();

    }
    skipDialogue() {
        this.currentDialogueIndex = this.dialogues.length; // Salta al final
        this.dialogPlugin.toggleWindow();
    }
}
