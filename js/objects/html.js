let html = {
    textBrdTemplate: null,
    boardBrdTemplate: null,
    listTemplate: null,
    boardAlbum: null,
    listAlbum: null,
    mainList: null,
    loadingIndicator: null,
    savingIndicator: null,
    header: null,
    extrasDialog: null,
    extrasTitle: null,
    extrasContent: null,
    extrasBack: null,
    boardTitle: null,
    boardDescription: null,
    find() {
        this.textBrdTemplate = templateFChild('text-template');
        this.boardBrdTemplate = templateFChild('board-template');
        this.listTemplate = templateFChild('list-template');
        this.boardAlbum = EbyId('multi-list-board');
        this.listAlbum = EbyId('single-list-board');
        this.mainList = EbyId('main-list');
        this.loadingIndicator = EbyId('loadingIndicator');
        this.savingIndicator = EbyId('savingIndicator');
        this.header = EbyId('header');
        this.extrasDialog = EbyId('extrasDialog');
        this.extrasTitle = EbyId('extrasTitle');
        this.extrasContent = EbyId('extrasContent');
        this.extrasBack = EbyId('extrasBack');
        this.boardTitle = EbyId('boardTitle');
        this.boardDescription = EbyId('boardDescription');
    }
};
