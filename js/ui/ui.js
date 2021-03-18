let autoUI = -1;
let dialogBoardID = null;
let dialogBoardView = null;
let dialogs = {};
function openDialog(boardId, boardView, dialog) {
    closeDialog();
    html.dialogBack.classList.toggle('hidden', false);
    dialogBoardID = boardId;
    dialogBoardView = boardView;
    dialogs[dialog].open();
}
function closeDialog(backClicked = false, all = true) {
    if (all)
        for (let k in dialogs)
            dialogs[k].close(backClicked ? null : false);
    html.dialogBack.classList.toggle('hidden', true);
    dialogBoardID = null;
    dialogBoardView = null;
}
function htmlLoaded() {
    if (autoUI == -1)
        autoUI = setInterval(autoUI_function, 100);
    html.headerTitle.oninput = headerTitle_oninput;
    html.headerDescription.oninput = headerDescription_oninput;
    EbyId('headerExpand').onclick = headerExpand_onclick;
    EbyId('homeBtn').onclick = goHome;
    EbyId('upBtn').onclick = goUp;
    EbyId('saveBtn').onclick = () => { sync.saveAll(null, true); };
    EbyId('loadBtn').onclick = () => { sync.loadAll(); };
    EbyId('saveDownloadBtn').onclick = () => {
        function saveBlobFile(name, type, data) {
            if (data !== null && navigator.msSaveBlob)
                return navigator.msSaveBlob(new Blob([data], { type: type }), name);
            let a = $("<a style='display: none;'/>");
            let url = window.URL.createObjectURL(new Blob([data], { type: type }));
            a.attr("href", url);
            a.attr("download", name);
            $("body").append(a);
            a[0].click();
            window.URL.revokeObjectURL(url);
            a.remove();
        }
        let text = buildPBoard();
        let dateTag = (new Date()).toISOString().replace('T', ' ').substring(2, 16);
        let filename = "PBoard " + dateTag + ".txt";
        saveBlobFile(filename, "data:attachment/text", text);
    };
    html.dialogBack.addEventListener('click', function (event) {
        if (event.target == this)
            closeDialog(true);
    }, false);
}
function pageOpened() {
    log("pageOpened()");
    extensions.invoke('pre_newPage');
    html.main.innerHTML = "";
    setMainView(generateView(board, html.main));
    mainView.render();
    extensions.invoke('newPage');
    extensions.execute();
}
function boardsUpdated(boards, save = 1) {
    pageOpened();
    if (save == 1)
        sync.saveAll();
    else if (save == 2)
        sync.save.dirty = true;
}
function loadBackground(brdEl, id) {
    brdEl.style.backgroundImage = "url('" + brdAttr(id, 'background') + "')";
    brdEl.style.repeatMode = "no-repeat";
    brdEl.style.backgroundSize = "cover";
}
function loadList() { }
function loadBoardBackgroundImage() {
    let brdEl = html.main;
    brdEl.style.backgroundImage = "url('" + brdAttr(board, 'background') + "')";
    brdEl.style.backgroundRepeat = "no-repeat";
    brdEl.style.backgroundSize = "cover";
}
function loadAllBoardsByDataId() { }
