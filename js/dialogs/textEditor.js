(dialogs['textEditor'] = {
    init() {
        this.isOpen = false;
        this.dialog = EbyId('dialog_textEditor');
        this.textTitle = EbyName('textTitle', this.dialog);
        this.textText = EbyName('textText', this.dialog);
        this.textTitle.oninput = textareaAutoSize.bind(null, this.textTitle);
        EbyName('closeBtn', this.dialog).onclick = this.closeNoSave.bind(this);
        EbyName('fullscreenBtn', this.dialog).onclick = this.fullscreen.bind(this);
    },
    open() {
        this.isOpen = true;
        this.dialog.classList.toggle('hidden', false);
        this.textTitle.value = pb.boards[dialogBoardID].name;
        this.textText.value = pb.boards[dialogBoardID].content;
        textareaAutoSize(this.textTitle);
        if (this.textTitle.value == "") {
            this.textTitle.select();
        }
        else {
            this.textText.select();
            this.textText.setSelectionRange(0, 0);
        }
    },
    close(save = false) {
        if (save === null)
            save = true;
        if (this.isOpen && save) {
            pb.boards[dialogBoardID].name = this.textTitle.value;
            pb.boards[dialogBoardID].content = this.textText.value;
            boardsUpdated([dialogBoardID]);
        }
        this.dialog.classList.toggle('hidden', true);
        this.fullscreen(false);
        this.isOpen = false;
        closeDialog(false, false);
    },
    closeNoSave(force = false) {
        let go = confirm("Exit without saving?");
        if (go == false)
            return;
        this.close(false);
    },
    fullscreen(force = null) {
        if (force === false || this.dialog.style.maxWidth != "") {
            this.dialog.style.maxWidth = "";
            this.dialog.style.maxHeight = "";
        }
        else {
            this.dialog.style.maxWidth = "100%";
            this.dialog.style.maxHeight = "100%";
        }
    },
}).init();
